import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/customSupabase';
import { useAuth } from '@/contexts/AuthContext';
import { X } from 'lucide-react';

type OrderItem = {
  id: string;
  quantity: number;
  date_needed: string | null;
  unit_price: number;
  products: { name: string; sku: string } | null;
};

type Order = {
  id: string;
  status: string;
  total: number;
  created_at: string;
  updated_at: string;
  shipping_address: string | null;
  phone: string | null;
  notes: string | null;
  order_items: OrderItem[];
};

const ARCHIVED_STATUSES = new Set(['approved', 'cancelled', 'canceled', 'archived', 'completed', 'rejected']);

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  const load = () => {
    if (!user) return;
    supabase
      .from('orders')
      .select('*, order_items(*, products(name, sku))')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setOrders((data as any) ?? []));
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  const activeOrders = useMemo(() => orders.filter((o) => !ARCHIVED_STATUSES.has(o.status.toLowerCase())), [orders]);
  const archivedOrders = useMemo(() => orders.filter((o) => ARCHIVED_STATUSES.has(o.status.toLowerCase())), [orders]);

  const handleCancel = async (id: string) => {
    if (!confirm('Cancel this order?')) return;
    const { error } = await supabase.from('orders').update({ status: 'cancelled' }).eq('id', id);
    if (error) return toast({ title: 'Error', description: error.message, variant: 'destructive' });
    toast({ title: 'Order cancelled' });
    load();
  };

  const renderOrders = (list: Order[], allowCancel: boolean) => {
    if (list.length === 0) {
      return <Card className="p-8 text-center text-muted-foreground">No orders.</Card>;
    }
    return list.map((o) => {
      const canCancel = allowCancel && o.status.toLowerCase() === 'pending';
      return (
        <Card key={o.id} className="p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="font-mono text-xs text-muted-foreground">#{o.id.slice(0, 8)}</div>
              <div className="text-sm">Created: {new Date(o.created_at).toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Updated: {new Date(o.updated_at).toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">{o.status}</Badge>
              {canCancel && (
                <Button variant="outline" size="sm" onClick={() => handleCancel(o.id)}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
              )}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Needed by</TableHead>
                <TableHead className="text-right">Unit price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {o.order_items.map((it) => (
                <TableRow key={it.id}>
                  <TableCell>{it.products?.name ?? '—'}</TableCell>
                  <TableCell>{it.quantity}</TableCell>
                  <TableCell>{it.date_needed ? new Date(it.date_needed).toLocaleDateString() : '—'}</TableCell>
                  <TableCell className="text-right">{Number(it.unit_price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between text-sm">
            <div className="text-muted-foreground">
              {o.phone && <div>Phone: {o.phone}</div>}
              {o.shipping_address && <div>Ship to: {o.shipping_address}</div>}
            </div>
            <div className="font-bold text-lg">Total: {Number(o.total).toFixed(2)} MAD</div>
          </div>
        </Card>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-8 pt-24 md:pt-28">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">My Orders</h1>
            <Link to="/prices"><Button variant="outline">Back to prices</Button></Link>
          </div>

          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active ({activeOrders.length})</TabsTrigger>
              <TabsTrigger value="archive">Archive ({archivedOrders.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-4">
              {renderOrders(activeOrders, true)}
            </TabsContent>
            <TabsContent value="archive" className="space-y-4">
              {renderOrders(archivedOrders, false)}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
