import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Pencil } from "lucide-react";
import { User, UserRole } from "@/types";
import { toast } from "@/hooks/use-toast";

const ManageUsersPage = () => {
  const { user, users, updateUser } = useAuth();
  const [filterRole, setFilterRole] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Add user form
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("customer");
  const [newHourlyRate, setNewHourlyRate] = useState("");

  // Edit user form
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editHourlyRate, setEditHourlyRate] = useState("");

  if (!user || user.role !== "admin") return null;

  const filtered = filterRole === "all" ? users : users.filter((u) => u.role === filterRole);

  const handleAdd = () => {
    if (!newName || !newEmail) return;
    const newUser: User = {
      id: `${newRole}-${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      password: "password123",
      ...(newRole === "translator" && newHourlyRate ? { hourlyRate: Number(newHourlyRate) } : {}),
    };
    updateUser(newUser);
    setNewName("");
    setNewEmail("");
    setNewHourlyRate("");
    setDialogOpen(false);
    toast({ title: "User added", description: `${newName} has been added as ${newRole}` });
  };

  const openEdit = (u: User) => {
    setEditingUser(u);
    setEditName(u.name);
    setEditEmail(u.email);
    setEditHourlyRate(u.hourlyRate?.toString() || "");
    setEditDialogOpen(true);
  };

  const handleEdit = () => {
    if (!editingUser || !editName || !editEmail) return;
    const updated: User = {
      ...editingUser,
      name: editName,
      email: editEmail,
      ...(editingUser.role === "translator" ? { hourlyRate: editHourlyRate ? Number(editHourlyRate) : undefined } : {}),
    };
    updateUser(updated);
    setEditDialogOpen(false);
    toast({ title: "User updated", description: `${editName} has been updated` });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Manage Users</h1>
          <p className="page-subtitle">{users.length} total users</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><UserPlus className="h-4 w-4" />Add User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Name</Label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Full name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="email@example.com" />
              </div>
              <div>
                <Label>Role</Label>
                <Select value={newRole} onValueChange={(v) => setNewRole(v as UserRole)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="translator">Translator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newRole === "translator" && (
                <div>
                  <Label>Hourly Rate (€)</Label>
                  <Input type="number" value={newHourlyRate} onChange={(e) => setNewHourlyRate(e.target.value)} placeholder="e.g. 50" />
                </div>
              )}
              <Button onClick={handleAdd} className="w-full">Add User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2 no-print">
        {["all", "admin", "translator", "customer"].map((r) => (
          <Button
            key={r}
            variant={filterRole === r ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterRole(r)}
            className="capitalize"
          >
            {r === "all" ? "All" : `${r}s`}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((u) => (
          <Card key={u.id} className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {u.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{u.name}</p>
                <p className="text-sm text-muted-foreground truncate">{u.email}</p>
                {u.role === "translator" && u.hourlyRate && (
                  <p className="text-xs text-primary font-medium">€{u.hourlyRate}/hr</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="secondary" className="capitalize">{u.role}</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(u)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            {u.languages && (
              <div className="mt-2 flex flex-wrap gap-1">
                {u.languages.map((l) => (
                  <Badge key={l} variant="outline" className="text-xs">{l}</Badge>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Name</Label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
            </div>
            {editingUser?.role === "translator" && (
              <div>
                <Label>Hourly Rate (€)</Label>
                <Input type="number" value={editHourlyRate} onChange={(e) => setEditHourlyRate(e.target.value)} placeholder="e.g. 50" />
              </div>
            )}
            <Button onClick={handleEdit} className="w-full">Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUsersPage;
