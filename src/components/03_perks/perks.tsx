import './perks.css';
import { createClient } from '@/prismicio';
import Image from 'next/image';

export default async function Perks() {
    const client = createClient();
    const page = await client.getSingle("bannerprincipal");
    return (
        <div className='container'>
            <div className="perks-container">

                {page.data.qualidadespizzapizza?.map((item, index) => (
                    <div className="perks" key={index}>
                        {item.imagemqualidades?.url && (
                            <Image
                                src={item.imagemqualidades.url}
                                alt={item.imagemqualidades.alt || "Imagem da qualidade"}
                                width={96}
                                height={96}
                            />
                        )}

                        <div className="perks-title">
                            {item.tituloqualidade}
                        </div>

                        <div className="perks-descricao">
                            {item.descricaoqualidade}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
