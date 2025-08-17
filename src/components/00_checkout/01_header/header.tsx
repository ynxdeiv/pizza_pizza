'use client';
import './header.css';

import { useRouter } from 'next/navigation';
export default function Header() {
    const router = useRouter();
    const goToHome = () => {
        router.push('/'); 
    }

    return (
        <>

            <div className="header-container">
                <div className="checkout-header">
                    <button className="header-button" onClick={goToHome}>
                        voltar
                    </button>
                    <h1>PIZZA<span>PIZZA</span></h1>
                </div>




            </div>



        </>
    );
}