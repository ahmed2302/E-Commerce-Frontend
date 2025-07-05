import { useEffect, useState } from "react";
import TopRated from "./TopRated";
import { Axios } from "../../../../Api/axios";
import { imgBaseURL, TopRatedApi } from "../../../../Api/Api";
import SkeletonShow from "../../Skeleton/SkeletonShow";
import { Container } from "react-bootstrap";

export default function ShowTopRated() {
  const [products, setProduts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${TopRatedApi}`)
      .then((res) => setProduts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const productsShow = products.map((product, key) => (
    <TopRated
      key={key}
      title={product.title}
      description={product.description}
      img={product.images[0]?.image}
      sale
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
    />
  ));
  return (
    <Container>
      <h1 className="mt-5">Top Rated</h1>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 gap-2 mb-5">
        {loading ? (
          <>
            <SkeletonShow
              height="300px"
              length="4"
              classess="col-lg-3 col-md-6 col-12"
            />
          </>
        ) : (
          productsShow
        )}
      </div>
    </Container>
  );
}
