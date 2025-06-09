import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  carregarClientes,
  carregarProdutos,
  carregarPedidos,
  salvarPedidos,
  carregarTransacoes,
  salvarTransacoes
} from '../../utils/storage';
import { gerarId } from '../../utils/id';
import type { Pedido, ItemPedido, Cliente, Produto, Transacao } from '../../types/entities';

export default function CadastrarPedido() {
  const [clienteId, setClienteId] = useState('');
  const [itens, setItens] = useState<ItemPedido[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [status, setStatus] = useState<'pendente' | 'finalizado' | 'cancelado'>('pendente');
  const navigate = useNavigate();

  useEffect(() => {
    setProdutos(carregarProdutos());
    setClientes(carregarClientes());
  }, []);

  function adicionarItem() {
    setItens([...itens, { produtoId: '', quantidade: 1, precoUnitario: 0 }]);
  }

  function atualizarItem<K extends keyof ItemPedido>(index: number, campo: K, valor: string) {
    const novos = [...itens];
    const valorConvertido =
      campo === 'quantidade' || campo === 'precoUnitario' ? Number(valor) : valor;
    novos[index] = { ...novos[index], [campo]: valorConvertido } as ItemPedido;
    setItens(novos);
  }

  function removerItem(index: number) {
    const novos = [...itens];
    novos.splice(index, 1);
    setItens(novos);
  }

  function calcularTotal(): number {
    return itens.reduce((soma, item) => soma + item.quantidade * item.precoUnitario, 0);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!clienteId) {
      alert('Selecione um cliente.');
      return;
    }

    if (itens.length === 0) {
      alert('Adicione pelo menos um item ao pedido.');
      return;
    }

    for (const item of itens) {
      if (!item.produtoId || item.quantidade <= 0 || item.precoUnitario <= 0) {
        alert('Preencha corretamente todos os itens.');
        return;
      }
    }

    const pedido: Pedido = {
      id: gerarId(),
      clienteId,
      data: new Date().toISOString(),
      status,
      itens,
      total: calcularTotal(),
    };

    const pedidos = carregarPedidos();
    salvarPedidos([...pedidos, pedido]);

    if (pedido.status === 'finalizado') {
      const transacoesAtuais = carregarTransacoes();
      const novasTransacoes: Transacao[] = pedido.itens.map(item => ({
        id: gerarId(),
        tipo: 'saida',
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        data: pedido.data,
        pedidoId: pedido.id,
      }));
      salvarTransacoes([...transacoesAtuais, ...novasTransacoes]);
    }

    navigate('/pedidos');
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-indigo-600">Cadastrar Pedido</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow border">
        <div>
          <label className="block mb-1 font-medium">Cliente</label>
          <select
            value={clienteId}
            onChange={e => setClienteId(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Selecione o Cliente</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Itens</h3>
          {itens.map((item, index) => (
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
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Qtd"
                min={1}
                value={item.quantidade}
                onChange={e => atualizarItem(index, 'quantidade', e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <input
                type="number"
                placeholder="Preço Unit."
                min={0}
                step={0.01}
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
            value={status}
            onChange={e => setStatus(e.target.value as any)}
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
          Salvar Pedido
        </button>
      </form>
    </div>
  );
}