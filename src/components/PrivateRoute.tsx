import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  perfilPermitido: string[];
  children: React.ReactNode;
}

export default function PrivateRoute({ perfilPermitido, children }: PrivateRouteProps) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (!perfilPermitido.includes(usuario.perfil)) {
    return <Navigate to="/login" replace />;
    
  }

  return <>{children}</>;
}
