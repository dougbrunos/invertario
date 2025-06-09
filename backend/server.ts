import express from 'express';
import cors from 'cors';
import { PrismaClient } from '../backend/generated/prisma';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota para cadastrar produto
app.post('/produtos', async (req, res) => {
  const { nome, preco, quantidade, imagemUrl, fornecedorId } = req.body;

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

// Inicia o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
