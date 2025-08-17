'use client'; 

import { useEffect, useState } from 'react'; 
import Image from 'next/image'; 
import './reviews.css';
import { createClient } from '@/prismicio'; 
import Slider from 'react-slick'; 
import { Content } from '@prismicio/client'; 

export default function Reviews() {
  const [avaliacoes, setAvaliacoes] = useState<Content.BannerprincipalDocumentData['avaliacoesclientes']>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 

    const fetchData = async () => {
      try {
        const client = createClient(); 
        const page = await client.getSingle('bannerprincipal');
        setAvaliacoes(page.data.avaliacoesclientes || []);
      } catch (error) {
        console.error("Falha ao buscar avaliações:", error);
      }
    };

    fetchData(); 
  }, []); 

  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 4000, 
    arrows: false, 
  };

  return (
    <div className="container-review">
      {isClient && avaliacoes.length > 0 ? (
        <Slider {...settings} className="reviews-container">
          {avaliacoes.map((item, index) => (
            <div className="review" key={index}>
              {item.aspas?.url && (
                <div className="quote-image">
                  <Image
                    src={item.aspas.url}
                    alt={item.aspas.alt || 'Aspas de citação'} 
                    width={48} 
                    height={48} 
                  />
                </div>
              )}
              <div className="review-text">
                {item.avaliacoesclientes}
              </div>
              <div className="author">
                {item.nomecliente}</div>
            </div>
          ))}
        </Slider>
      ) : (
        isClient && <p className="loading-message">Carregando avaliações...</p>
      )}
    </div>
  );
}