import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setLoading(true);

    // Simula async para login, adapte conforme seu backend
    try {
      const sucesso = await Promise.resolve(login(email, senha));
      if (sucesso) {
        navigate('/');
      } else {
        setErro('Email ou senha inválidos');
      }
    } catch {
      setErro('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-500 to-purple-600 px-4">
      <Card className="w-full max-w-md p-8 shadow-lg border border-indigo-300 bg-white/90 backdrop-blur-md rounded-lg">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700 drop-shadow-sm">
          Acesse sua conta
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <Label htmlFor="email" className="font-semibold text-indigo-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (erro) setErro('');
              }}
              required
              autoFocus
              disabled={loading}
              className="mt-1"
              autoComplete="email"
              aria-describedby="email-desc"
            />
          </div>

          <div>
            <Label htmlFor="senha" className="font-semibold text-indigo-700">
              Senha
            </Label>
            <Input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={e => {
                setSenha(e.target.value);
                if (erro) setErro('');
              }}
              required
              disabled={loading}
              className="mt-1"
              autoComplete="current-password"
            />
          </div>

          {erro && (
            <Alert variant="destructive" className="mt-2">
              {erro}
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full flex justify-center items-center gap-3"
            disabled={loading}
            aria-live="polite"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : null}
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
}