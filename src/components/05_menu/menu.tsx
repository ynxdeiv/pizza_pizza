'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './menu.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type PizzaCardapio = {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
    // Removendo 'quantidade' daqui, pois ela será adicionada no item do carrinho se necessário.
};

type PizzaCardapioComQuantidade = PizzaCardapio & { quantidade: number; };

export default function Menu() {
    const [pizzas, setPizzas] = useState<PizzaCardapio[]>([]);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    centerMode: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false,
                    centerMode: true,
                }
            }
        ]
    };

    useEffect(() => {
        fetch('http://localhost:3001/cardapio')
            .then(res => res.json())
            .then(data => setPizzas(data))
            .catch(error => console.error("Erro ao buscar pizzas:", error));
    }, []);

    const adicionarAoCarrinho = async (pizza: PizzaCardapio) => {
        try {
            const responseGet = await fetch('http://localhost:3001/carrinho');
            const carrinhoAtual: PizzaCardapioComQuantidade[] = await responseGet.json();

            const itemExistenteNoCarrinho = carrinhoAtual.find(item => item.id === pizza.id);

            if (itemExistenteNoCarrinho) {
                const novaQuantidade = itemExistenteNoCarrinho.quantidade + 1;
                const itemAtualizado = { ...itemExistenteNoCarrinho, quantidade: novaQuantidade };

                await fetch(`http://localhost:3001/carrinho/${itemAtualizado.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemAtualizado),
                });
                console.log('Pizza atualizada no carrinho:', itemAtualizado);
            } else {
                const novaPizzaNoCarrinho = { ...pizza, quantidade: 1 };
                await fetch('http://localhost:3001/carrinho', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(novaPizzaNoCarrinho),
                });
                console.log('Nova pizza adicionada ao carrinho:', novaPizzaNoCarrinho);
            }

            toast.success(`${pizza.nome} adicionado ao carrinho!`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Erro ao adicionar pizza ao carrinho:', error);
            toast.error(`Erro ao adicionar ${pizza.nome} ao carrinho.`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="container-pizza" id="menu">
            <div className="display">
                <p>Nosso cardápio</p>
                <div className="display-pizza">
                    <Slider {...settings}>
                        {pizzas.map((pizza) => (
                            <div className="pizza-item" key={pizza.id}>
                                <img className="pizza-image" src={pizza.imagem} alt={pizza.nome} />
                                <h3 className="pizza-name">{pizza.nome}</h3>
                                <p className='pizza-desc'>{pizza.descricao}</p>
                                <span className='pizza-price'> R$ {pizza.preco}</span>
                                <button className="button-pizza" onClick={() => adicionarAoCarrinho(pizza)}>Pedir agora</button>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};