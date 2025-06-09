import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Produto, Fornecedor } from '../../types/entities';
import { carregarProdutos, salvarProdutos, carregarFornecedores } from '../../utils/storage';

export default function EditarProduto() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [produto, setProduto] = useState<Produto | null>(null);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [fornecedorId, setFornecedorId] = useState('');
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  useEffect(() => {
    setFornecedores(carregarFornecedores());

    const produtos = carregarProdutos();
    const prod = produtos.find(p => p.id === id);
    if (!prod) {
      alert('Produto não encontrado');
      navigate('/produtos');
      return;
    }
    setProduto(prod);
    setNome(prod.nome);
    setPreco(prod.preco.toString());
    setQuantidade(prod.quantidade.toString());
    setImagemUrl(prod.imagemUrl);
    setFornecedorId(prod.fornecedorId);
  }, [id, navigate]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const precoNum = parseFloat(preco);
    const quantidadeNum = parseInt(quantidade);

    if (!produto) return;

    if (!nome || precoNum <= 0 || quantidadeNum <= 0 || !imagemUrl || !fornecedorId) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const produtos = carregarProdutos();
    const index = produtos.findIndex(p => p.id === produto.id);
    if (index === -1) {
      alert('Produto não encontrado');
      navigate('/produtos');
      return;
    }

    produtos[index] = {
      ...produtos[index],
      nome,
      preco: precoNum,
      quantidade: quantidadeNum,
      imagemUrl,
      fornecedorId,
    };

    salvarProdutos(produtos);
    navigate('/produtos');
  }

  if (!produto) return <div>Carregando...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Editar Produto</h1>

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
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}