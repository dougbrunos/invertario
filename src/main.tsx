import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import RedirectToHomeOrLogin from './components/RedirectToHomeOrLogin';

import './index.css';

import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Produtos from './pages/Produtos';
import CadastrarProduto from './pages/produtos/CadastrarProduto';
import EditarProduto from './pages/produtos/EditarProduto';
import Fornecedores from './pages/Fornecedores';
import CadastrarFornecedor from './pages/fornecedores/CadastrarFornecedor';
import EditarFornecedor from './pages/fornecedores/EditarFornecedor';
import Cliente from './pages/Clientes';
import CadastrarCliente from './pages/clientes/CadastrarCliente';
import EditarCliente from './pages/clientes/EditarCliente';
import Pedido from './pages/Pedidos';
import CadastrarPedido from './pages/pedidos/CadastrarPedido';
import EditarPedido from './pages/pedidos/EditarPedido';
import Transacao from './pages/Transacoes';
import CadastrarTransacao from './pages/transacoes/CadastrarTransacao';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/produtos" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute perfilPermitido={['Admin', 'Usuario']}>
                <Layout>
                  <Home />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/produtos"
            element={
              <PrivateRoute perfilPermitido={['Admin', 'Usuario']}>
                <Layout>
                  <Produtos />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/produtos/cadastrar"
            element={
              <PrivateRoute perfilPermitido={['Admin']}>
                <Layout>
                  <CadastrarProduto />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/produtos/editar/:id"
            element={
              <PrivateRoute perfilPermitido={['Admin', 'Usuario']}>
                <Layout>
                  <EditarProduto />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/fornecedores"
            element={
              <PrivateRoute perfilPermitido={['Admin']}>
                <Layout>
                  <Fornecedores />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/fornecedores/cadastrar"
            element={
              <PrivateRoute perfilPermitido={['Admin']}>
                <Layout>
                  <CadastrarFornecedor />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/fornecedores/editar/:id"
            element={
              <PrivateRoute perfilPermitido={['Admin']}>
                <Layout>
                  <EditarFornecedor />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/clientes"
            element={
              <PrivateRoute perfilPermitido={['Admin']}>
                <Layout>
                  <Cliente />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/clientes/cadastrar"
            element={
              <PrivateRoute perfilPermitido={['Admin']}>
                <Layout>
                  <CadastrarCliente />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/clientes/editar/:id"
            element={
              <PrivateRoute perfilPermitido={['Admin']}>
                <Layout>
                  <EditarCliente />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/pedidos"
            element={
              <PrivateRoute perfilPermitido={['Admin']}>
                <Layout>
                  <Pedido />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/pedidos/novo"
            element={
              <PrivateRoute perfilPermitido={['Admin']}>
                <Layout>
                  <CadastrarPedido />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/pedidos/editar/:id"
            element={
              <PrivateRoute perfilPermitido={['Admin']}>
                <Layout>
                  <EditarPedido />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/transacoes"
            element={
              <PrivateRoute perfilPermitido={['Admin']}>
                <Layout>
                  <Transacao />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/transacoes/novo"
            element={
              <PrivateRoute perfilPermitido={['Admin']}>
                <Layout>
                  <CadastrarTransacao />
                </Layout>
              </PrivateRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
