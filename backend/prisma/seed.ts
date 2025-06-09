import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

async function main() {
  const cliente = await prisma.cliente.create({
    data: {
      nome: 'João Silva',
      email: 'joao@example.com',
    },
  });

  const produto1 = await prisma.produto.create({
    data: {
      nome: 'Notebook',
      preco: 3500.00,
      estoque: 10,
    },
  });

  const produto2 = await prisma.produto.create({
    data: {
      nome: 'Mouse',
      preco: 150.00,
      estoque: 50,
    },
  });

  const pedido = await prisma.pedido.create({
    data: {
      clienteId: cliente.id,
      data: new Date(),
      status: 'PENDENTE',
      total: 3800.00,
      itens: {
        create: [
          {
            produtoId: produto1.id,
            quantidade: 1,
            precoUnitario: produto1.preco,
          },
          {
            produtoId: produto2.id,
            quantidade: 2,
            precoUnitario: produto2.preco,
          },
        ],
      },
    },
  });

  console.log('Dados inseridos com sucesso');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
