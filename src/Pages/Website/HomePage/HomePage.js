import "./Home.css";

import Landing from "../../../Components/Website/Landing/Landing";

import { Container } from "react-bootstrap";

import BeforeTopRated from "../../../Components/Website/BeforTopRated/BeforeTopRated";
import ShowTopRated from "../../../Components/Website/Product/TopRated/ShowTopRated";
import ShowLatestSaleProducts from "../../../Components/Website/Product/SaleProducts/ShowLatestSaleProducts";
import { ShowLatestProducts } from "../../../Components/Website/Product/LatestProducts/ShowLatestProducts";
import PromoBanner from "../../../Components/Website/PromoBanner/PromoBanner";
import Testimonials from "../../../Components/Website/Testimonials/Testimonials";
import NewsletterSignup from "../../../Components/Website/NewsletterSignup/NewsletterSignup";
import Footer from "../../../Components/Website/Footer/Footer";

export default function HomePage() {
  return (
    <div className="bg-dark-subtle">
      <Landing />
      <PromoBanner />
      <div className="section">
        <ShowLatestSaleProducts />
      </div>
      <div className="section">
        <ShowTopRated />
      </div>
      <div className="section">
        <ShowLatestProducts />
      </div>
      <Testimonials />
      <NewsletterSignup />
      <Footer />
    </div>
  );
}
