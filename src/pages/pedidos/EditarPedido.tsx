import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  carregarPedidos,
  salvarPedidos,
  carregarClientes,
  carregarProdutos
} from '../../utils/storage';
import type { Pedido, ItemPedido, Cliente, Produto } from '../../types/entities';

export default function EditarPedido() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const pedidos = carregarPedidos();
    const encontrado = pedidos.find(p => p.id === id);
    if (encontrado) setPedido(encontrado);

    setClientes(carregarClientes());
    setProdutos(carregarProdutos());
  }, [id]);

  function atualizarItem<K extends keyof ItemPedido>(index: number, campo: K, valor: string) {
    if (!pedido) return;
    const novos = [...pedido.itens];
    const convertido =
      campo === 'quantidade' || campo === 'precoUnitario' ? Number(valor) : valor;
    novos[index] = { ...novos[index], [campo]: convertido } as ItemPedido;
    setPedido({ ...pedido, itens: novos });
  }

  function removerItem(index: number) {
    if (!pedido) return;
    const novos = [...pedido.itens];
    novos.splice(index, 1);
    setPedido({ ...pedido, itens: novos });
  }

  function adicionarItem() {
    if (!pedido) return;
    setPedido({
      ...pedido,
      itens: [...pedido.itens, { produtoId: '', quantidade: 1, precoUnitario: 0 }]
    });
  }

  function calcularTotal(): number {
    if (!pedido) return 0;
    return pedido.itens.reduce((soma, item) => soma + item.quantidade * item.precoUnitario, 0);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pedido) return;

    // Validações básicas
    if (!pedido.clienteId) {
      alert('Selecione um cliente.');
      return;
    }
    if (pedido.itens.length === 0) {
      alert('Adicione pelo menos um item ao pedido.');
      return;
    }
    for (const item of pedido.itens) {
      if (!item.produtoId || item.quantidade <= 0 || item.precoUnitario <= 0) {
        alert('Preencha corretamente todos os itens.');
        return;
      }
    }

    const pedidos = carregarPedidos();
    const atualizados = pedidos.map(p =>
      p.id === pedido.id ? { ...pedido, total: calcularTotal() } : p
    );
    salvarPedidos(atualizados);
    navigate('/pedidos');
  }

  if (!pedido) return <div className="p-6 text-center text-gray-500">Carregando pedido...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-indigo-600">Editar Pedido</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow border">
        <div>
          <label className="block mb-1 font-medium">Cliente</label>
          <select
            value={pedido.clienteId}
            onChange={e => setPedido({ ...pedido, clienteId: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Selecione o Cliente</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Itens</h3>
          {pedido.itens.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_1fr_2fr_auto] gap-3 items-center mb-3"
            >
              <select
                value={item.produtoId}
                onChange={e => atualizarItem(index, 'produtoId', e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Produto</option>
                {produtos.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min={1}
                placeholder="Qtd"
                value={item.quantidade}
                onChange={e => atualizarItem(index, 'quantidade', e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <input
                type="number"
                min={0}
                step={0.01}
                placeholder="Preço Unit."
                value={item.precoUnitario}
                onChange={e => atualizarItem(index, 'precoUnitario', e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <button
                type="button"
                onClick={() => removerItem(index)}
                className="text-red-600 hover:text-red-800 font-semibold"
                aria-label="Remover item"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={adicionarItem}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Adicionar Item
          </button>
        </div>

        <div>
          <label className="block mb-1 font-medium">Status:</label>
          <select
            value={pedido.status}
            onChange={e => setPedido({ ...pedido, status: e.target.value as Pedido['status'] })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="pendente">Pendente</option>
            <option value="finalizado">Finalizado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <div className="text-xl font-semibold">
          Total: R$ {calcularTotal().toFixed(2)}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
