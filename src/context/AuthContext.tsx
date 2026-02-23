import React, { createContext, useContext, useState } from "react";
import { User, UserRole } from "@/types";
import { MOCK_USERS } from "@/data/mockData";

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (role: UserRole, userId?: string) => void;
  loginWithCredentials: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  users: [],
  login: () => {},
  loginWithCredentials: () => false,
  logout: () => {},
  updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  const login = (role: UserRole, userId?: string) => {
    const found = userId
      ? users.find((u) => u.id === userId)
      : users.find((u) => u.role === role);
    if (found) setUser(found);
  };

  const loginWithCredentials = (email: string, password: string): boolean => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const updateUser = (updatedUser: User) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    if (user?.id === updatedUser.id) setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, users, login, loginWithCredentials, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
