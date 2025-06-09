import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  carregarFornecedores,
  atualizarFornecedor,
} from '../../utils/storage';
import type { Fornecedor } from '../../types/entities';

function validarCNPJ(cnpj: string) {
  const cnpjLimpo = cnpj.replace(/[^\d]+/g, '');
  if (cnpjLimpo.length !== 14) return false;
  return true;
}

export default function EditarFornecedor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
  const [erros, setErros] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const lista = carregarFornecedores();
    const encontrado = lista.find(f => f.id === id);
    if (encontrado) setFornecedor(encontrado);
  }, [id]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fornecedor) return;

    const novosErros: { [key: string]: string } = {};

    if (!fornecedor.nome.trim()) novosErros.nome = 'Nome é obrigatório.';
    if (!fornecedor.cnpj.trim()) novosErros.cnpj = 'CNPJ é obrigatório.';
    else if (!validarCNPJ(fornecedor.cnpj)) novosErros.cnpj = 'CNPJ inválido.';
    if (!fornecedor.contato.trim()) novosErros.contato = 'Contato é obrigatório.';

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) return;

    atualizarFornecedor(fornecedor);
    navigate('/fornecedores');
  }

  if (!fornecedor) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-indigo-600 mb-6">Editar Fornecedor</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow border">
        <div>
          <label className="block mb-1 font-medium">Nome</label>
          <input
            type="text"
            placeholder="Nome"
            value={fornecedor.nome}
            onChange={e => setFornecedor({ ...fornecedor, nome: e.target.value })}
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
            value={fornecedor.cnpj}
            onChange={e => setFornecedor({ ...fornecedor, cnpj: e.target.value })}
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
            value={fornecedor.contato}
            onChange={e => setFornecedor({ ...fornecedor, contato: e.target.value })}
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
            value={fornecedor.endereco || ''}
            onChange={e => setFornecedor({ ...fornecedor, endereco: e.target.value })}
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