import './social.css'
import Image from 'next/image';
import FacebookLogo from "./image/Facebook.png"
import InstagramLogo from "./image/Instagram.png"
export default function Social() {

    return (<>
        <div className="main-container">
            <div className="social-container">
                <div className="PizzaLogo">
                    <p>
                        PIZZA<span>PIZZA</span>
                    </p>
                </div>
                <div className="social-icons">
                    <Image src={InstagramLogo} alt='logo instagram' />
                    <Image src={FacebookLogo} alt='logo facebook' />

                </div>


            </div>
        </div>
    </>);
}