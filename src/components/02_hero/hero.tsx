import './hero.css';
import Image from 'next/image';
import React from 'react';
import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';

export default async function Hero() {
    const client = createClient();
    const page = await client.getSingle("bannerprincipal");

    return (
        <div className='hero-container'>
            <div className="hero-text">
                <div className="title">
                    <PrismicRichText field={page.data.tituloprincipal} />
                </div>
                <div className="paragraph">
                    <PrismicRichText field={page.data.descricaoprincipal} />
                </div>
                <button id="button" type="button">
                    {page.data.textobotao || ""}
                </button>
            </div>
            <div className="hero-image">
                <Image
                    src={page.data.imagemprincipal.url || ''}
                    alt="Pizza deliciosa"
                    width={500}
                    height={400}
                />
            </div>
        </div>

    )
}