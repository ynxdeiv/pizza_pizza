import { createClient } from "@/prismicio";
import './contact.css'
import Form from "@/components/06_contact/form";
import Image from "next/image";
import WhatsappLogo from "./image/WhatsApp.png";
import ClockLogo from "./image/Clock (1).png";
import LocationPin from "./image/Location pin.png";
export default async function Contact() {
    const client = createClient();
    const page = await client.getSingle("bannerprincipal");

    return (

        <>
            <div className="contact-container">
                <div className="contact-wrapper">
                    <div className="horarioFuncionamento">
                        <Image src={ClockLogo} width={64} height={64} alt="foto do relogio" />
                        <div className="horarios">
                            <p>{page.data.horariosemana} </p>
                            <p>{page.data.horariofinalsemana}</p>
                        </div>

                    </div>

                    <div className="enderecoRestaurante">
                        <div className="endereco">
                            <Image src={LocationPin} width={24} height={24} alt="foto do pin de localização" />
                            <p>{page.data.enderecoloja}</p>

                        </div>
                        <div className="numero-loja">
                            <Image src={WhatsappLogo} width={24} height={24} alt="foto do whatsapp" />
                            <p>{page.data.numerowhatsapp}</p>
                        </div>

                    </div>
                </div>

                <div className="formularioContato">
                    <h2>Fale Conosco</h2>
                    <Form/>
                </div>
            </div>
        </>

    )
}