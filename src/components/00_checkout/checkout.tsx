"use client";
import { useState, useEffect } from 'react';
import './checkout.css';
import { toast } from 'react-toastify';

export default function Checkout() {
    type PizzaCardapio = {
        id: number;
        nome: string;
        descricao: string;
        preco: number;
        imagem: string;
        quantidade: number;
    };

    const [carrinho, setCarrinho] = useState<PizzaCardapio[]>([]);

    const buscarCarrinhoDoServidor = async () => {
        try {
            const response = await fetch('http://localhost:3001/carrinho');
            if (!response.ok) {
                throw new Error('Falha ao buscar carrinho');
            }
            const data = await response.json();
            setCarrinho(data);
        } catch (error) {
            console.error('Erro ao carregar carrinho:', error);
            toast.error('Não foi possível carregar o carrinho.', { position: "bottom-center" });
        }
    };

    useEffect(() => {
        buscarCarrinhoDoServidor();
    }, []);

    const removerItem = async (id: number) => {
        try {
            await fetch(`http://localhost:3001/carrinho/${id}`, {
                method: 'DELETE',
            });
            await buscarCarrinhoDoServidor();
            toast.success('Item removido do carrinho!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Erro ao remover item:', error);
            toast.error('Erro ao remover item do carrinho.', { position: "bottom-center" });
        }
    };

    const alterarQuantidade = async (id: number, delta: number) => {
        try {
            const itemAtual = carrinho.find(item => item.id === id);

            if (!itemAtual) return;

            const novaQuantidade = itemAtual.quantidade + delta;

            if (novaQuantidade <= 0) {
                await removerItem(id);
                return;
            }

            const itemAtualizado = { ...itemAtual, quantidade: novaQuantidade };

            await fetch(`http://localhost:3001/carrinho/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemAtualizado),
            });
            await buscarCarrinhoDoServidor();
            toast.success(`Quantidade de ${itemAtual.nome} alterada!`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Erro ao alterar quantidade:', error);
            toast.error('Erro ao alterar quantidade do item.', { position: "bottom-center" });
        }
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ffebbe',
                    padding: 50,
                    minHeight: '100vh',
                }}
            >
                <div
                    style={{
                        border: '2px solid #550312',
                        borderRadius: 20,
                        fontFamily: 'Nunito',
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'auto',
                        backgroundColor: 'white',
                        width: '100%',
                        maxWidth: 571,
                        justifyContent: 'center',
                        gap: 10,
                        padding: 20,
                        boxSizing: 'border-box',
                    }}
                >
                    <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Seu Carrinho</h1>
                    {carrinho.length === 0 && <p style={{ textAlign: 'center' }}>Carrinho vazio 🛒</p>}

                    {carrinho.map(item => (
                        <div
                            key={item.id}
                            className="cart-item-animation"
                            style={{
                                padding: 16,
                                backgroundColor: 'white',
                                maxHeight: 'fit-content',
                                display: 'flex',
                                gap: 10,
                                alignItems: 'center',
                                marginBottom: 10,
                                border: '1px solid black',
                                borderRadius: 10,
                                flexWrap: 'wrap',
                            }}
                        >
                            <img
                                src={item.imagem}
                                alt={item.nome}
                                width={60}
                                style={{
                                    minWidth: 60,
                                    height: 60,
                                    objectFit: 'cover',
                                    borderRadius: 8,
                                }}
                            />
                            <div style={{ flex: 1, minWidth: 120 }}>
                                <strong style={{ fontSize: '1rem' }}>{item.nome}</strong>
                                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                                    R$ {typeof item.preco === 'number' ? item.preco.toFixed(2) : item.preco} x {item.quantidade}
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: 6 }}>
                                <button
                                    className="cart-button"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        backgroundColor: '#550312',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                    }}
                                    onClick={() => alterarQuantidade(item.id, 1)}
                                >+</button>
                                <button
                                    className="cart-button"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        backgroundColor: '#550312',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                    }}
                                    onClick={() => alterarQuantidade(item.id, -1)}
                                >-</button>
                                <button
                                    className="cart-button"
                                    style={{
                                        width: 'auto',
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        height: 30,
                                        borderRadius: 15,
                                        backgroundColor: '#550312',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '0.95rem',
                                    }}
                                    onClick={() => removerItem(item.id)}
                                >Remover</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>
                {`
                @media (max-width: 700px) {
                    .cart-item-animation {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 8px !important;
                    }
                    div[style*="max-width: 571px"] {
                        width: 100% !important;
                        min-width: 0 !important;
                        max-width: 98vw !important;
                        padding: 10px !important;
                    }
                    div[style*="padding: 50px"] {
                        padding: 10px !important;
                    }
                    h1 {
                        font-size: 1.3rem !important;
                    }
                }
                `}
            </style>
        </>
    );
}