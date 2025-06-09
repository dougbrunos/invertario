export interface Produto {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  imagemUrl: string;
  fornecedorId: string;
}

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
  usuarioId: string;
  status: 'Pendente' | 'Concluído';
  dataCriacao: string;
  total: number;
}

export interface ItemPedido {
  id: string;
  pedidoId: string;
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
}

export interface Transacao {
  id: string;
  produtoId: string;
  pedidoId?: string;
  tipo: 'Entrada' | 'Saída';
  valor: number;
  data: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senhaHash: string;
  perfil: 'Admin' | 'Usuario';
}