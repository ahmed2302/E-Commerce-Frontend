import { useEffect, useState } from "react";
import { PRO, imgBaseURL } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import SaleProducts from "../../Components/Website/Product/SaleProducts/SaleProducts";
import SkeletonShow from "../../Components/Website/Skeleton/SkeletonShow";
import { Container } from "react-bootstrap";
import "./Shop.css";

/**
 * Shop Page - Displays all products in a responsive grid.
 * Fetches products from the API and uses SaleProducts for each item.
 */
export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRO}`)
      .then((res) => {
        setProducts(res.data.data || res.data); // handle both paginated and flat responses
        setError("");
        console.log(res.data);
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "An error occurred while fetching products."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  // Render all products using SaleProducts component
  const productsShow = products.map((product, key) => (
    <SaleProducts
      key={product.id || key}
      title={product.title}
      description={product.description}
      img={product.images?.[0]?.image}
      sale={!!product.discount}
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
      col="2"
    />
  ));

  return (
    <div className="bg-dark-subtle">
      <Container className="">
        <h1 className="py-3">All Products</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="d-flex align-items-stretch justify-content-center flex-wrap gap-2 mb-5">
          {loading ? (
            <SkeletonShow
              height="350px"
              length="8"
              classess="col-lg-3 col-md-6 col-12"
            />
          ) : (
            productsShow
          )}
        </div>
      </Container>
    </div>
  );
}
