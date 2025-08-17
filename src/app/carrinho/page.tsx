import React from 'react';
import Header from '@/components/00_checkout/01_header/header';
import Checkout from '@/components/00_checkout/checkout';
import Social from '@/components/07_social/social';
import Footer from '@/components/08_footer/footer';
import { ToastContainer} from 'react-toastify';
export default function Home() {
    return (
        <>
        <ToastContainer />
        <Header/>
        <Checkout />
        <Social/>
        <Footer />
        </>

    );
}