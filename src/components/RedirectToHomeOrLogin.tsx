import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RedirectToHomeOrLogin() {
  const { usuario } = useAuth();

  if (usuario) {
    return <Navigate to="/" replace />;
  }

  return <Navigate to="/login" replace />;
}
