import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { carregarProdutos, carregarPedidos, carregarTransacoes, salvarTransacoes } from '../../utils/storage';
import { gerarId } from '../../utils/id';
import type { Produto, Pedido, Transacao } from '../../types/entities';

export default function CadastrarTransacao() {
  const [tipo, setTipo] = useState<'entrada' | 'saida'>('saida');
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [pedidoId, setPedidoId] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProdutos(carregarProdutos());
    setPedidos(carregarPedidos());
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nova: Transacao = {
      id: gerarId(),
      tipo,
      produtoId,
      quantidade,
      data: new Date().toISOString(),
      pedidoId: pedidoId || undefined,
    };

    const lista = carregarTransacoes();
    salvarTransacoes([...lista, nova]);
    navigate('/transacoes');
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Registrar Transação</h1>
      <form onSubmit={handleSubmit}>
        <select value={tipo} onChange={e => setTipo(e.target.value as 'entrada' | 'saida')}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>

        <select value={produtoId} onChange={e => setProdutoId(e.target.value)} required>
          <option value="">Selecione o Produto</option>
          {produtos.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>

        <input
          type="number"
          min={1}
          value={quantidade}
          onChange={e => setQuantidade(Number(e.target.value))}
          required
        />

        <select value={pedidoId} onChange={e => setPedidoId(e.target.value)}>
          <option value="">Pedido (opcional)</option>
          {pedidos.map(p => (
            <option key={p.id} value={p.id}>{p.id}</option>
          ))}
        </select>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
