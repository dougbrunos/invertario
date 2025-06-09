import type { Produto, Fornecedor, Cliente, Pedido, Transacao } from '../types/entities';

/* Produtos */
const PRODUTOS_KEY = 'produtos';

export function salvarProdutos(produtos: Produto[]) {
  localStorage.setItem(PRODUTOS_KEY, JSON.stringify(produtos));
}

export function carregarProdutos(): Produto[] {
  const data = localStorage.getItem(PRODUTOS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as Produto[];
  } catch {
    return [];
  }
}

/* Fornecedores */
const CHAVE_FORNECEDORES = 'fornecedores';

export function carregarFornecedores(): Fornecedor[] {
  const dados = localStorage.getItem(CHAVE_FORNECEDORES);
  if (!dados) return [];
  return JSON.parse(dados);
}

export function salvarFornecedores(fornecedores: Fornecedor[]) {
  localStorage.setItem(CHAVE_FORNECEDORES, JSON.stringify(fornecedores));
}

export function atualizarFornecedor(atualizado: Fornecedor) {
  const fornecedores = carregarFornecedores();
  const novaLista = fornecedores.map(f =>
    f.id === atualizado.id ? atualizado : f
  );
  salvarFornecedores(novaLista);
}

export function excluirFornecedor(id: string) {
  const fornecedores = carregarFornecedores();
  const novaLista = fornecedores.filter(f => f.id !== id);
  salvarFornecedores(novaLista);
}

/* Clientes */
const CHAVE_CLIENTES = 'clientes';

export function carregarClientes(): Cliente[] {
  const dados = localStorage.getItem(CHAVE_CLIENTES);
  if (!dados) return [];
  try {
    return JSON.parse(dados) as Cliente[];
  } catch {
    return [];
  }
}

export function salvarClientes(lista: Cliente[]) {
  localStorage.setItem(CHAVE_CLIENTES, JSON.stringify(lista));
}

export function atualizarCliente(clienteAtualizado: Cliente) {
  const clientes = carregarClientes();
  const novos = clientes.map(c => (c.id === clienteAtualizado.id ? clienteAtualizado : c));
  salvarClientes(novos);
}

export function excluirCliente(id: string) {
  const clientes = carregarClientes().filter(c => c.id !== id);
  salvarClientes(clientes);
}

/* Pedidos */
const CHAVE_PEDIDOS = 'pedidos';

export function carregarPedidos(): Pedido[] {
  const dados = localStorage.getItem(CHAVE_PEDIDOS);
  if (!dados) return [];
  return JSON.parse(dados);
}

export function salvarPedidos(pedidos: Pedido[]) {
  localStorage.setItem(CHAVE_PEDIDOS, JSON.stringify(pedidos));
}

export function atualizarPedido(pedido: Pedido) {
  const pedidos = carregarPedidos();
  const atualizados = pedidos.map(p => (p.id === pedido.id ? pedido : p));
  salvarPedidos(atualizados);
}

export function excluirPedido(id: string) {
  const pedidos = carregarPedidos().filter(p => p.id !== id);
  salvarPedidos(pedidos);
}

/* Transações */
export function carregarTransacoes(): Transacao[] {
  return JSON.parse(localStorage.getItem('transacoes') || '[]');
}

export function salvarTransacoes(lista: Transacao[]) {
  localStorage.setItem('transacoes', JSON.stringify(lista));
}