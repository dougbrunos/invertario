import React, { useState, useMemo } from 'react';
import type { Produto } from '../types/entities';

const produtosMock: Produto[] = [
    {
        id: '1',
        nome: 'Caneta Azul',
        preco: 2.5,
        quantidade: 100,
        imagemUrl: 'https://via.placeholder.com/100',
        fornecedorId: 'f1',
    },
    {
        id: '2',
        nome: 'Caderno',
        preco: 15,
        quantidade: 50,
        imagemUrl: 'https://via.placeholder.com/100',
        fornecedorId: 'f2',
    },
    {
        id: '3',
        nome: 'Lápis',
        preco: 1.2,
        quantidade: 200,
        imagemUrl: 'https://via.placeholder.com/100',
        fornecedorId: 'f1',
    },
];

export default function Produtos() {
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroFornecedor, setFiltroFornecedor] = useState('');
    const [ordenarPrecoAsc, setOrdenarPrecoAsc] = useState(true);

    const produtosFiltrados = useMemo(() => {
        let resultados = produtosMock;

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
    }, [filtroNome, filtroFornecedor, ordenarPrecoAsc]);

    return (
        <div style={{ padding: 20 }}>
            <h1>Produtos</h1>

            <div style={{ marginBottom: 20 }}>
                <input
                    type="text"
                    placeholder="Filtrar por nome"
                    value={filtroNome}
                    onChange={e => setFiltroNome(e.target.value)}
                    style={{ marginRight: 10 }}
                />

                <input
                    type="text"
                    placeholder="Filtrar por fornecedor (ID)"
                    value={filtroFornecedor}
                    onChange={e => setFiltroFornecedor(e.target.value)}
                    style={{ marginRight: 10 }}
                />

                <button onClick={() => setOrdenarPrecoAsc(!ordenarPrecoAsc)}>
                    Ordenar preço {ordenarPrecoAsc ? '↑' : '↓'}
                </button>
            </div>

            <table border={1} cellPadding={8} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Imagem</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Fornecedor ID</th>
                    </tr>
                </thead>
                <tbody>
                    {produtosFiltrados.map(prod => (
                        <tr key={prod.id}>
                            <td>
                                <img src={prod.imagemUrl} alt={prod.nome} width={50} />
                            </td>
                            <td>{prod.nome}</td>
                            <td>R$ {prod.preco.toFixed(2)}</td>
                            <td>{prod.quantidade}</td>
                            <td>{prod.fornecedorId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}