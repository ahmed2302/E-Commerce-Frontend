import { useContext, useEffect, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";

import ImageGallery from "react-image-gallery";
import { useNavigate, useParams } from "react-router-dom";
import { CART, imgBaseURL, Pro } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkeletonShow from "../../../Components/Website/Skeleton/SkeletonShow";
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "../../../Components/Website/Btns/PlusMinusBtn";

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);
  const [productImages, setProductImages] = useState([]);
  const [error, setError] = useState("");
  const [loadingCart, setLoadingCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setIsChange } = useContext(Cart);
  const { id } = useParams();
  const nav = useNavigate();

  const roundStars = Math.round(product.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} color="gold" icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));

  useEffect(() => {
    Axios.get(`${Pro}/${id}`)
      .then((res) => {
        setProductImages(
          res.data[0].images.map((img) => {
            return {
              original: imgBaseURL + img.image,
              thumbnail: imgBaseURL + img.image,
            };
          })
        );
        setProduct(res.data[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  const checkStock = async () => {
    try {
      setLoadingCart(true);
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getItems.filter((item) => item.id === id)?.[0]
        ?.count;

      // console.log(productCount);
      await Axios.post(`${CART}/check`, {
        product_id: product.id,
        count: count + (productCount ? productCount : 0),
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setLoadingCart(false);
    }
  };

  const handleSave = async () => {
    const check = await checkStock();
    if (check) {
      const getItems = JSON.parse(localStorage.getItem("product")) || [];

      const productExist = getItems.findIndex((pro) => pro.id === id);

      if (productExist !== -1) {
        if (getItems[productExist].count) {
          getItems[productExist].count += count;
        } else {
          getItems[productExist].count = count;
        }
      } else {
        if (count > 1) {
          product.count = count;
        }
        getItems.push(product);
      }

      localStorage.setItem("product", JSON.stringify(getItems));
      setIsChange((prev) => !prev);
    }
  };

  return (
    <Container className="mt-5">
      <div
        className="row g-4 bg-white p-4 rounded-4 shadow shadow-lg"
        style={{ maxWidth: "100vw" }}>
        {/* Image Section */}
        <div className="col-lg-4 col-md-5 col-9">
          <div
            className="p-3 bg-light rounded-4 shadow-sm"
            style={{ minHeight: "300px" }}>
            <ImageGallery
              items={productImages}
              showPlayButton={false}
              showFullscreenButton={true}
              showNav={true}
              thumbnailPosition="bottom"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-lg-7 col-md-6 col-12 d-flex flex-column justify-content-md-start">
          <div>
            <h1 className="fw-bold text-dark text-break">{product.title}</h1>
            <p className="text-muted fs-6 mb-1 text-break">{product.About}</p>
            <p className="fs-5 fw-light text-break">{product.description}</p>

            {product.stock === 1 && (
              <p className="text-danger fw-semibold">
                ⚠ Only 1 item left in stock
              </p>
            )}

            <div className="d-flex align-items-center gap-2 mt-2">
              {showGoldStars}
              {showEmptyStars}
            </div>

            <div className="mt-3 d-flex align-items-end gap-3 flex-wrap">
              <h4 className="text-success fw-bold m-0">{product.discount}$</h4>
              <h6 className="text-muted text-decoration-line-through m-0">
                {product.price}$
              </h6>
            </div>

            <div className="mt-3">
              <span className="badge bg-success px-3 py-2">
                🚚 Free Shipping Available
              </span>
            </div>
          </div>

          <div className="mt-4">
            {product.stock === 0 ? (
              <p className="text-danger fs-5">
                ❌ This product is currently unavailable
              </p>
            ) : (
              <div className="d-flex flex-wrap gap-3 align-items-center">
                <PlusMinusBtn setCount={(data) => setCount(data)} />

                <Button
                  onClick={handleSave}
                  variant="outline-primary"
                  className="d-flex align-items-center gap-2"
                  disabled={loadingCart}>
                  <img
                    src={require("../../../Assets/Icons/Cart.png")}
                    alt="cart"
                    width="20px"
                  />
                  {loadingCart ? "Adding..." : "Add to Cart"}
                </Button>

                <Button
                  variant="primary"
                  className="px-4 fw-bold"
                  onClick={() => nav("/checkout")}>
                  Buy Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
