import express from 'express';
import cors from 'cors';
import { PrismaClient } from '../backend/generated/prisma';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// =======================
// Produtos
// =======================
app.post('/produtos', async (req, res) => {
  const { nome, preco, quantidade, imagemUrl } = req.body;

  try {
    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        preco,
        estoque: quantidade,
        imagemUrl,
      },
    });

    res.status(201).json(novoProduto);
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ error: 'Erro ao cadastrar produto' });
  }
});

app.get('/produtos', async (req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});

// =======================
// Clientes
// =======================
app.post('/clientes', async (req, res) => {
  const { nome, email } = req.body;

  try {
    const novoCliente = await prisma.cliente.create({
      data: { nome, email },
    });

    res.status(201).json(novoCliente);
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    res.status(500).json({ error: 'Erro ao cadastrar cliente' });
  }
});

app.get('/clientes', async (req, res) => {
  const clientes = await prisma.cliente.findMany();
  res.json(clientes);
});

// =======================
// Pedidos
// =======================
app.post('/pedidos', async (req, res) => {
  const { clienteId, data, status, total } = req.body;

  try {
    const novoPedido = await prisma.pedido.create({
      data: {
        clienteId,
        data: new Date(data),
        status,
        total,
      },
    });

    res.status(201).json(novoPedido);
  } catch (error) {
    console.error('Erro ao cadastrar pedido:', error);
    res.status(500).json({ error: 'Erro ao cadastrar pedido' });
  }
});

app.get('/pedidos', async (req, res) => {
  const pedidos = await prisma.pedido.findMany({
    include: { cliente: true, itens: true },
  });
  res.json(pedidos);
});

// =======================
// Itens do Pedido
// =======================
app.post('/itens', async (req, res) => {
  const { pedidoId, produtoId, quantidade, precoUnitario } = req.body;

  try {
    const novoItem = await prisma.itemPedido.create({
      data: {
        pedidoId,
        produtoId,
        quantidade,
        precoUnitario,
      },
    });

    res.status(201).json(novoItem);
  } catch (error) {
    console.error('Erro ao cadastrar item do pedido:', error);
    res.status(500).json({ error: 'Erro ao cadastrar item do pedido' });
  }
});

app.get('/itens', async (req, res) => {
  const itens = await prisma.itemPedido.findMany({
    include: { pedido: true, produto: true },
  });
  res.json(itens);
});

// =======================
// Iniciar o servidor
// =======================
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
