import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { carregarClientes, salvarClientes } from '../utils/storage';
import type { Cliente } from '../types/entities';

export default function ListaClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCpfCnpj, setFiltroCpfCnpj] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setClientes(carregarClientes());
  }, []);

  function excluirCliente(id: string) {
    if (!window.confirm('Deseja realmente excluir este cliente?')) return;
    const novaLista = clientes.filter(c => c.id !== id);
    salvarClientes(novaLista);
    setClientes(novaLista);
  }

  const clientesFiltrados = useMemo(() => {
    return clientes.filter(c =>
      c.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
      c.cpf_cnpj.includes(filtroCpfCnpj)
    );
  }, [clientes, filtroNome, filtroCpfCnpj]);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-violet-600 mb-6">Clientes</h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          placeholder="Filtrar por nome"
          value={filtroNome}
          onChange={e => setFiltroNome(e.target.value)}
          className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
        <input
          placeholder="Filtrar por CPF/CNPJ"
          value={filtroCpfCnpj}
          onChange={e => setFiltroCpfCnpj(e.target.value)}
          className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
        <button
          onClick={() => navigate('/clientes/cadastrar')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Novo Cliente
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 shadow-md rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Nome</th>
              <th className="px-4 py-2 border text-left">CPF/CNPJ</th>
              <th className="px-4 py-2 border text-left">Contato</th>
              <th className="px-4 py-2 border text-left">Endereço</th>
              <th className="px-4 py-2 border text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map(cliente => (
              <tr key={cliente.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{cliente.nome}</td>
                <td className="px-4 py-2 border">{cliente.cpf_cnpj}</td>
                <td className="px-4 py-2 border">{cliente.contato}</td>
                <td className="px-4 py-2 border">{cliente.endereco}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => navigate(`/clientes/editar/${cliente.id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirCliente(cliente.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {clientesFiltrados.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}