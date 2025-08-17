'use client';
import './carrinho.css';
import Image from 'next/image';
import Cart from './img/cart.png';
import { useRouter } from 'next/navigation';

export default function Carrinho() {
    const router = useRouter();
    const goToCarrinho = () => {
        router.push('/carrinho'); 
    };
    return (
        <>
            <div className="carrinho-container">
                <button className="carrinho" type="button" onClick={goToCarrinho}>
                    <Image src={Cart} alt="Carrinho de compras" />
                </button>
            </div>

        </>
    );
}
