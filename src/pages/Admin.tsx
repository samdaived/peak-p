import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { ADMIN_PASSWORD, addAccount, getAccounts, removeAccount, type BuyerAccount } from '@/lib/buyerAuth';
import { Trash2 } from 'lucide-react';

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [accounts, setAccounts] = useState<BuyerAccount[]>([]);
  const [form, setForm] = useState({
    username: '',
    password: '',
    companyName: '',
    role: 'buyer' as 'buyer' | 'manager',
  });

  useEffect(() => {
    if (authed) setAccounts(getAccounts());
  }, [authed]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) setAuthed(true);
    else toast({ title: 'Wrong password', variant: 'destructive' });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addAccount(form);
      setAccounts(getAccounts());
      setForm({ username: '', password: '', companyName: '', role: 'buyer' });
      toast({ title: 'Account created' });
    } catch (err: any) {
      toast({ title: err.message, variant: 'destructive' });
    }
  };

  const handleRemove = (id: string) => {
    removeAccount(id);
    setAccounts(getAccounts());
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">Admin Access</h1>
          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pw">Admin password</Label>
              <Input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">Unlock</Button>
          </form>
          <Link to="/" className="text-xs text-muted-foreground hover:text-primary block text-center">← Back to site</Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin View</h1>
            <p className="text-sm text-muted-foreground">Manage buyer accounts</p>
          </div>
          <Link to="/"><Button variant="outline">Back to site</Button></Link>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Add new account</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Company name</Label>
              <Input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as 'buyer' | 'manager' })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Create account</Button>
            </div>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Accounts ({accounts.length})</h2>
          {accounts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No accounts yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.username}</TableCell>
                    <TableCell>{a.companyName}</TableCell>
                    <TableCell className="capitalize">{a.role}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handleRemove(a.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Admin;
