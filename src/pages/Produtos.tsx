import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Produto } from '../types/entities';
import { carregarProdutos, salvarProdutos } from '../utils/storage';

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroFornecedor, setFiltroFornecedor] = useState('');
  const [ordenarPrecoAsc, setOrdenarPrecoAsc] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const produtosCarregados = carregarProdutos();
    setProdutos(produtosCarregados);
  }, []);

  function excluirProduto(id: string) {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      const novosProdutos = produtos.filter(p => p.id !== id);
      salvarProdutos(novosProdutos);
      setProdutos(novosProdutos);
    }
  }

  const produtosFiltrados = useMemo(() => {
    let resultados = produtos;

    if (filtroNome.trim()) {
      resultados = resultados.filter(p =>
        p.nome.toLowerCase().includes(filtroNome.toLowerCase())
      );
    }

    if (filtroFornecedor.trim()) {
      resultados = resultados.filter(p => p.fornecedorId === filtroFornecedor);
    }

    resultados = resultados.sort((a, b) =>
      ordenarPrecoAsc ? a.preco - b.preco : b.preco - a.preco
    );

    return resultados;
  }, [produtos, filtroNome, filtroFornecedor, ordenarPrecoAsc]);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-violet-600 mb-6">Produtos</h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filtroNome}
          onChange={e => setFiltroNome(e.target.value)}
          className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

        <input
          type="text"
          placeholder="Filtrar por fornecedor (ID)"
          value={filtroFornecedor}
          onChange={e => setFiltroFornecedor(e.target.value)}
          className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

        <button
          onClick={() => setOrdenarPrecoAsc(!ordenarPrecoAsc)}
          className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition"
        >
          Ordenar preço {ordenarPrecoAsc ? '↑' : '↓'}
        </button>
      </div>

      <button
        onClick={() => navigate('/produtos/cadastrar')}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Cadastrar Produto
      </button>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 shadow-md rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border">Imagem</th>
              <th className="px-4 py-2 text-left border">Nome</th>
              <th className="px-4 py-2 text-left border">Preço</th>
              <th className="px-4 py-2 text-left border">Quantidade</th>
              <th className="px-4 py-2 text-left border">Fornecedor ID</th>
              <th className="px-4 py-2 text-left border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map(prod => (
              <tr key={prod.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  <img src={prod.imagemUrl} alt={prod.nome} className="w-12 h-12 object-cover rounded-md" />
                </td>
                <td className="px-4 py-2 border">{prod.nome}</td>
                <td className="px-4 py-2 border">R$ {prod.preco.toFixed(2)}</td>
                <td className="px-4 py-2 border">{prod.quantidade}</td>
                <td className="px-4 py-2 border">{prod.fornecedorId}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => navigate(`/produtos/editar/${prod.id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirProduto(prod.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}

            {produtosFiltrados.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
