import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LogOut } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { getCurrentBuyer, logout } from '@/lib/buyerAuth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Prices = () => {
  const navigate = useNavigate();
  const buyer = getCurrentBuyer();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // Simple deterministic price per SKU for demo purposes.
  const priceFor = (sku: string) => {
    const hash = [...sku].reduce((a, c) => a + c.charCodeAt(0), 0);
    return (50 + (hash % 250)) + (hash % 10) / 10;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-8 pt-24 md:pt-28">
        <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Wholesale Prices</h1>
            <p className="text-sm text-muted-foreground">
              {buyer ? `Logged in as ${buyer.companyName} (${buyer.username})` : ''}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price (MAD)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PRODUCTS.map((p) => (
                <TableRow key={p.sku}>
                  <TableCell className="font-mono text-xs">{p.sku}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell className="text-muted-foreground">{p.category}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {priceFor(p.sku).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Prices;
