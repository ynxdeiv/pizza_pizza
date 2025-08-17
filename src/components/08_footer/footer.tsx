import './footer.css'
import Image from 'next/image';
import Group from "./image/Group.png"

export default function Footer() {
    return (<>
        <div className="footer-main">
            <div className="footer-copyright">
                <Image src={Group} alt='logo' />

                <div className="footer-text">

                    <p>Copyright - PIZZAPIZZA</p>
                </div>

            </div>

        </div>
    </>);
}