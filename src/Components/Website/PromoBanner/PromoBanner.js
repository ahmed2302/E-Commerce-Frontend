import { Link } from "react-router-dom";

export default function PromoBanner() {
  return (
    <div className="promo-banner fade-in">
      <span>🚚 Free Shipping on Orders Over $50!</span>
      <Link to="/shop" className="btn btn-light ms-4 fw-bold px-4 py-2">
        Shop Now
      </Link>
    </div>
  );
} 