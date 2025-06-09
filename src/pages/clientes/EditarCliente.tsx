import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { carregarClientes, atualizarCliente } from '../../utils/storage';
import type { Cliente } from '../../types/entities';

export default function EditarCliente() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    const lista = carregarClientes();
    const encontrado = lista.find(c => c.id === id);
    if (encontrado) setCliente(encontrado);
  }, [id]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cliente) {
      atualizarCliente(cliente);
      navigate('/clientes');
    }
  }

  if (!cliente) {
    return (
      <div className="text-center mt-10 text-gray-600">Carregando...</div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Editar Cliente</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md border">
        <div>
          <label className="block font-medium mb-1">Nome</label>
          <input
            type="text"
            value={cliente.nome}
            onChange={e => setCliente({ ...cliente, nome: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">CPF/CNPJ</label>
          <input
            type="text"
            value={cliente.cpf_cnpj}
            onChange={e => setCliente({ ...cliente, cpf_cnpj: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Contato</label>
          <input
            type="text"
            value={cliente.contato}
            onChange={e => setCliente({ ...cliente, contato: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Endereço</label>
          <input
            type="text"
            value={cliente.endereco || ''}
            onChange={e => setCliente({ ...cliente, endereco: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}