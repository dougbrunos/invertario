import React, { useEffect, useState } from 'react';
import { carregarProdutos, carregarTransacoes } from '../utils/storage';
import type { Produto, Transacao } from '../types/entities';

export default function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroData, setFiltroData] = useState('');

  useEffect(() => {
    setTransacoes(carregarTransacoes());
    setProdutos(carregarProdutos());
  }, []);

  const transacoesFiltradas = transacoes.filter(t => {
    const tipoOk = !filtroTipo || t.tipo === filtroTipo;
    const dataOk = !filtroData || t.data.startsWith(filtroData);
    return tipoOk && dataOk;
  });

  function nomeProduto(id: string) {
    return produtos.find(p => p.id === id)?.nome || 'Desconhecido';
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">Transações</h1>

      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="flex items-center gap-2">
          <label className="font-medium">Tipo:</label>
          <select
            value={filtroTipo}
            onChange={e => setFiltroTipo(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm"
          >
            <option value="">Todos</option>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium">Data:</label>
          <input
            type="date"
            value={filtroData}
            onChange={e => setFiltroData(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm"
          />
        </div>
      </div>

      {transacoesFiltradas.length === 0 ? (
        <div className="text-gray-500">Nenhuma transação encontrada.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Data</th>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">Produto</th>
                <th className="px-4 py-2 text-left">Quantidade</th>
                <th className="px-4 py-2 text-left">Pedido (opcional)</th>
              </tr>
            </thead>
            <tbody>
              {transacoesFiltradas.map(t => (
                <tr key={t.id} className="border-t">
                  <td className="px-4 py-2">{new Date(t.data).toLocaleDateString()}</td>
                  <td className="px-4 py-2 capitalize">{t.tipo}</td>
                  <td className="px-4 py-2">{nomeProduto(t.produtoId)}</td>
                  <td className="px-4 py-2">{t.quantidade}</td>
                  <td className="px-4 py-2">{t.pedidoId || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}