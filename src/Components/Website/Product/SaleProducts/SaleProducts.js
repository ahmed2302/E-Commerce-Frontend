import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as solid,
  faHeart,
  faEye,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { imgBaseURL } from "../../../../Api/Api";
import { Cart } from "../../../../Context/CartChangerContext";
import PlusMinusBtn from "../../Btns/PlusMinusBtn";
import { CART } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import cartIcon from "../../../../Assets/Icons/Cart.png";

export default function SaleProducts(props) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [count, setCount] = useState(1);
  const { setIsChange } = useContext(Cart);
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon color="gold" key={index} icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));

  // Calculate discount percentage
  const discountPercent =
    props.price && props.discount
      ? Math.round(((props.price - props.discount) / props.price) * 100)
      : null;

  // Add to cart logic (store full product object)
  const handleAddToCart = async (e) => {
    e.preventDefault();
    setAdding(true);
    setAdded(false);
    try {
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productId = props.id;
      const productExist = getItems.findIndex((pro) => pro.id === productId);
      let productToStore = props.product
        ? { ...props.product }
        : {
            id: props.id,
            title: props.title,
            description: props.description,
            images: props.images || (props.img ? [{ image: props.img }] : []),
            price: props.price,
            discount: props.discount,
            rating: props.rating,
            sale: props.sale,
            col: props.col,
          };
      if (productExist !== -1) {
        // Replace the count with the new count
        getItems[productExist].count = count;
      } else {
        productToStore.count = count;
        getItems.push(productToStore);
      }
      localStorage.setItem("product", JSON.stringify(getItems));
      setIsChange((prev) => !prev);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (err) {
      // Optionally show error
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      className={`product-card col-12 col-sm-6 col-lg-3 mb-4 card-hover fade-in`}>
      <div className="card h-100 border-0 shadow-sm position-relative product-card-inner d-flex flex-column">
        {/* Wishlist Icon */}
        <button
          className="wishlist-btn position-absolute top-0 end-0 m-2 btn btn-light rounded-circle"
          aria-label="Add to wishlist"
          tabIndex={0}>
          <FontAwesomeIcon icon={faHeart} color="#e74c3c" />
        </button>
        {/* Quick View Icon (on hover) */}
        <NavLink
          to={`/product/${props.id}`}
          className="quick-view-btn position-absolute top-0 start-0 m-2 btn btn-light rounded-circle"
          aria-label="Quick view"
          tabIndex={0}>
          <FontAwesomeIcon icon={faEye} color="#4a6ef1" />
        </NavLink>
        {/* Product Image */}
        <NavLink to={`/product/${props.id}`} className="product-image-link">
          <img
            src={imgBaseURL + props.img}
            alt={props.title}
            className="w-100"
            style={{
              height: 200,
              objectFit: "cover",
              borderRadius: "1rem 1rem 0 0",
            }}
          />
        </NavLink>
        {/* Sale/New Badge */}
        {props.sale && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            Sale
          </span>
        )}
        {/* Card Body */}
        <div className="card-body d-flex flex-column justify-content-between flex-grow-1">
          <div>
            <h5 className="card-title text-truncate" title={props.title}>
              {props.title}
            </h5>
            <p
              className="card-text text-muted text-truncate"
              title={props.description}>
              {props.description}
            </p>
            <div className="d-flex align-items-center mb-2">
              {showGoldStars}
              {showEmptyStars}
            </div>
            <div className="d-flex align-items-end gap-2 mb-2">
              <span className="fw-bold text-success fs-5">
                {props.discount}$
              </span>
              {props.discount !== props.price && (
                <span className="text-muted text-decoration-line-through">
                  {props.price}$
                </span>
              )}
              {discountPercent && (
                <span className="badge bg-success ms-2">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
            {/* Quantity Selector */}
            <PlusMinusBtn setCount={setCount} />
          </div>
          {/* Add to Cart Button */}
          <button
            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 mt-3"
            onClick={handleAddToCart}
            disabled={adding || added}
            aria-label="Add to cart"
            tabIndex={0}>
            {adding && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"></span>
            )}
            <FontAwesomeIcon icon={faShoppingCart} />
            {added ? "adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
