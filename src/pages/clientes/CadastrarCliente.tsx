import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { carregarClientes, salvarClientes } from '../../utils/storage';
import { gerarId } from '../../utils/id';
import type { Cliente } from '../../types/entities';

export default function CadastrarCliente() {
  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [contato, setContato] = useState('');
  const [endereco, setEndereco] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const novo: Cliente = {
      id: gerarId(),
      nome,
      cpf_cnpj: cpfCnpj,
      contato,
      endereco,
      ativo: true,
    };

    const lista = carregarClientes();
    salvarClientes([...lista, novo]);
    navigate('/clientes');
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Cadastrar Cliente</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md border">
        <div>
          <label className="block font-medium mb-1">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Nome completo"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">CPF/CNPJ</label>
          <input
            type="text"
            value={cpfCnpj}
            onChange={e => setCpfCnpj(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="CPF ou CNPJ"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Contato</label>
          <input
            type="text"
            value={contato}
            onChange={e => setContato(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Telefone, email, etc."
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Endereço</label>
          <input
            type="text"
            value={endereco}
            onChange={e => setEndereco(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Rua, número, bairro..."
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