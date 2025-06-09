import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: 'Admin' | 'Usuario';
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const usuariosMock: Usuario[] = [
  {
    id: '1',
    nome: 'Admin Teste',
    email: 'admin@exemplo.com',
    perfil: 'Admin',
  },
  {
    id: '2',
    nome: 'Usuário Comum',
    email: 'user@exemplo.com',
    perfil: 'Usuario',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const userSalvo = localStorage.getItem('usuario');
    return userSalvo ? JSON.parse(userSalvo) : null;
  });

  function login(email: string, senha: string) {
    const user = usuariosMock.find(u => u.email === email);
    if (user) {
      setUsuario(user);
      localStorage.setItem('usuario', JSON.stringify(user)); // salvar no localStorage
      return true;
    }
    return false;
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem('usuario'); // limpar localStorage
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
