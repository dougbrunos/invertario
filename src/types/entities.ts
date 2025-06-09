export interface Produto {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  imagemUrl: string;
  fornecedorId: string;
}

export interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  contato: string;
  endereco?: string;
}

export interface Cliente {
  id: string;
  nome: string;
  cpf_cnpj: string;
  contato: string;
  endereco?: string;
  ativo: boolean;
}

export interface Pedido {
  id: string;
  clienteId: string;
  data: string;
  status: 'pendente' | 'finalizado' | 'cancelado';
  itens: ItemPedido[];
  total: number;
}

export interface ItemPedido {
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
}

export interface Transacao {
  id: string;
  tipo: 'entrada' | 'saida';
  produtoId: string;
  quantidade: number;
  data: string;
  pedidoId?: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senhaHash: string;
  perfil: 'Admin' | 'Usuario';
}