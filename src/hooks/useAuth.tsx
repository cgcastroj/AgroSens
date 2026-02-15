import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = { id: string; name: string } | null;

type AuthContextType = {
  user: User;
  signIn: (name: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const signIn = (name: string) => setUser({ id: '1', name });
  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}  {/* así se pasa correctamente */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
