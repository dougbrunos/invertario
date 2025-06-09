import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { carregarPedidos, carregarClientes } from '../utils/storage';
import type { Pedido, Cliente } from '../types/entities';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [clientesMap, setClientesMap] = useState<Record<string, string>>({});
  const [filtroStatus, setFiltroStatus] = useState('');
  const [ordenarPor, setOrdenarPor] = useState<'data' | 'valor'>('data');

  useEffect(() => {
    const lista = carregarPedidos();
    setPedidos(lista);

    const clientes = carregarClientes();
    const map = Object.fromEntries(clientes.map(c => [c.id, c.nome]));
    setClientesMap(map);
  }, []);

  const pedidosFiltrados = pedidos
    .filter(p => (filtroStatus ? p.status === filtroStatus : true))
    .sort((a, b) => {
      if (ordenarPor === 'data') return new Date(b.data).getTime() - new Date(a.data).getTime();
      return b.total - a.total;
    });

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-violet-600 mb-6">Pedidos</h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="font-medium">Status:</label>
          <select
            value={filtroStatus}
            onChange={e => setFiltroStatus(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm"
          >
            <option value="">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="finalizado">Finalizado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium">Ordenar por:</label>
          <select
            value={ordenarPor}
            onChange={e => setOrdenarPor(e.target.value as 'data' | 'valor')}
            className="px-3 py-2 border rounded-md shadow-sm"
          >
            <option value="data">Data</option>
            <option value="valor">Valor Total</option>
          </select>
        </div>

        <Link to="/pedidos/novo">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
            Novo Pedido
          </button>
        </Link>
      </div>

      {pedidosFiltrados.length === 0 ? (
        <div className="text-gray-500 mt-4">Nenhum pedido encontrado.</div>
      ) : (
        <div className="grid gap-4">
          {pedidosFiltrados.map(p => (
            <div
              key={p.id}
              className="border border-gray-300 p-4 rounded-md shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="mb-1"><strong>Cliente:</strong> {clientesMap[p.clienteId] || 'Desconhecido'}</div>
              <div className="mb-1"><strong>Data:</strong> {new Date(p.data).toLocaleDateString()}</div>
              <div className="mb-1"><strong>Status:</strong> {p.status}</div>
              <div className="mb-2"><strong>Total:</strong> R$ {p.total.toFixed(2)}</div>
              <Link
                to={`/pedidos/editar/${p.id}`}
                className="text-blue-600 hover:underline"
              >
                Editar
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}