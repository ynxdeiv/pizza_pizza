
import Menu from "@/components/05_menu/menu";
import Header from "../components/01_header/header";
import Hero from "../components/02_hero/hero";
import Perks from "../components/03_perks/perks";
import Reviews from "../components/04_reviews/reviews"
import Social from "../components/07_social/social"
import Footer from "../components/08_footer/footer"
import Carrinho from "@/components/00_carrinho/carrinho";
import Contact from "@/components/06_contact/contact";
import { ToastContainer} from 'react-toastify';
export default function Home() {

  return (
    <>
      <ToastContainer/>
      <Header />
      <Carrinho />
      <Hero/>
      <Perks />
      <Reviews />
      <Menu/>
      <Contact />
      <Social />
      <Footer />
    </>
  );
}
