import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { carregarFornecedores, salvarFornecedores } from '../utils/storage';
import type { Fornecedor } from '../types/entities';

export default function ListaFornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [filtro, setFiltro] = useState('');
  const [ordenarAsc, setOrdenarAsc] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setFornecedores(carregarFornecedores());
  }, []);

  function excluirFornecedor(id: string) {
    if (!window.confirm('Tem certeza que deseja excluir este fornecedor?')) return;

    const novaLista = fornecedores.filter(f => f.id !== id);
    salvarFornecedores(novaLista);
    setFornecedores(novaLista);
  }

  const fornecedoresFiltrados = useMemo(() => {
    let lista = fornecedores;

    if (filtro.trim()) {
      const f = filtro.toLowerCase();
      lista = lista.filter(fornecedor =>
        fornecedor.nome.toLowerCase().includes(f) ||
        fornecedor.contato.toLowerCase().includes(f)
      );
    }

    lista = lista.sort((a, b) => {
      if (a.nome.toLowerCase() < b.nome.toLowerCase()) return ordenarAsc ? -1 : 1;
      if (a.nome.toLowerCase() > b.nome.toLowerCase()) return ordenarAsc ? 1 : -1;
      return 0;
    });

    return lista;
  }, [fornecedores, filtro, ordenarAsc]);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-violet-600 mb-6">Fornecedores</h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Filtrar por nome ou contato"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

        <button
          onClick={() => setOrdenarAsc(!ordenarAsc)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Ordenar por nome {ordenarAsc ? '↑' : '↓'}
        </button>

        <button
          onClick={() => navigate('/fornecedores/cadastrar')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Novo Fornecedor
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 shadow-md rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Nome</th>
              <th className="px-4 py-2 border text-left">CNPJ</th>
              <th className="px-4 py-2 border text-left">Contato</th>
              <th className="px-4 py-2 border text-left">Endereço</th>
              <th className="px-4 py-2 border text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {fornecedoresFiltrados.map(fornecedor => (
              <tr key={fornecedor.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{fornecedor.nome}</td>
                <td className="px-4 py-2 border">{fornecedor.cnpj}</td>
                <td className="px-4 py-2 border">{fornecedor.contato}</td>
                <td className="px-4 py-2 border">{fornecedor.endereco}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => navigate(`/fornecedores/editar/${fornecedor.id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirFornecedor(fornecedor.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {fornecedoresFiltrados.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                  Nenhum fornecedor encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}