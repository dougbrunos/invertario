import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { salvarFornecedores, carregarFornecedores } from '../../utils/storage';
import { gerarId } from '../../utils/id';
import type { Fornecedor } from '../../types/entities';

function validarCNPJ(cnpj: string) {
  const cnpjLimpo = cnpj.replace(/[^\d]+/g, '');
  if (cnpjLimpo.length !== 14) return false;
  return true;
}

export default function CadastrarFornecedor() {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [contato, setContato] = useState('');
  const [endereco, setEndereco] = useState('');
  const [erros, setErros] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const novosErros: { [key: string]: string } = {};

    if (!nome.trim()) novosErros.nome = 'Nome é obrigatório.';
    if (!cnpj.trim()) novosErros.cnpj = 'CNPJ é obrigatório.';
    else if (!validarCNPJ(cnpj)) novosErros.cnpj = 'CNPJ inválido.';
    if (!contato.trim()) novosErros.contato = 'Contato é obrigatório.';

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) return;

    const novo: Fornecedor = {
      id: gerarId(),
      nome,
      cnpj,
      contato,
      endereco,
    };

    const fornecedoresExistentes = carregarFornecedores();
    const novaLista = [...fornecedoresExistentes, novo];

    salvarFornecedores(novaLista);
    navigate('/fornecedores');
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-indigo-600 mb-6">Cadastrar Fornecedor</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow border">
        <div>
          <label className="block mb-1 font-medium">Nome</label>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
              erros.nome ? 'border-red-500 ring-red-400' : 'border-gray-300 ring-indigo-400'
            }`}
          />
          {erros.nome && <p className="text-red-600 mt-1 text-sm">{erros.nome}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">CNPJ</label>
          <input
            type="text"
            placeholder="CNPJ"
            value={cnpj}
            onChange={e => setCnpj(e.target.value)}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
              erros.cnpj ? 'border-red-500 ring-red-400' : 'border-gray-300 ring-indigo-400'
            }`}
          />
          {erros.cnpj && <p className="text-red-600 mt-1 text-sm">{erros.cnpj}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Contato</label>
          <input
            type="text"
            placeholder="Contato"
            value={contato}
            onChange={e => setContato(e.target.value)}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
              erros.contato ? 'border-red-500 ring-red-400' : 'border-gray-300 ring-indigo-400'
            }`}
          />
          {erros.contato && <p className="text-red-600 mt-1 text-sm">{erros.contato}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Endereço</label>
          <input
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={e => setEndereco(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}