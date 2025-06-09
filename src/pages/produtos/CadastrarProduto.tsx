import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Produto, Fornecedor } from '../../types/entities';
import {
  carregarProdutos,
  salvarProdutos,
  carregarFornecedores
} from '../../utils/storage';

export default function CadastrarProduto() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [fornecedorId, setFornecedorId] = useState('');
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setFornecedores(carregarFornecedores());
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const precoNum = parseFloat(preco);
    const quantidadeNum = parseInt(quantidade);

    if (!nome || precoNum <= 0 || quantidadeNum <= 0 || !imagemUrl || !fornecedorId) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const novoProduto: Produto = {
      id: crypto.randomUUID(),
      nome,
      preco: precoNum,
      quantidade: quantidadeNum,
      imagemUrl,
      fornecedorId,
    };

    const produtosAtuais = carregarProdutos();
    salvarProdutos([...produtosAtuais, novoProduto]);

    navigate('/produtos');
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Cadastrar Produto</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md border">
        <div>
          <label className="block font-medium mb-1">Nome</label>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Preço</label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Preço"
            value={preco}
            onChange={e => setPreco(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Quantidade</label>
          <input
            type="number"
            min="0"
            placeholder="Quantidade"
            value={quantidade}
            onChange={e => setQuantidade(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Imagem URL</label>
          <input
            type="text"
            placeholder="Imagem URL"
            value={imagemUrl}
            onChange={e => setImagemUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Fornecedor</label>
          <select
            value={fornecedorId}
            onChange={e => setFornecedorId(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Selecione o Fornecedor</option>
            {fornecedores.map(f => (
              <option key={f.id} value={f.id}>{f.nome}</option>
            ))}
          </select>
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