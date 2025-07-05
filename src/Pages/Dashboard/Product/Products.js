import { useEffect, useState } from "react";
import { PRO, Pro } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
export default function Products() {
  // States
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  // console.log(products);

  // Get ALl Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRO}?page=${page}&limit=${limit}`)
      .then((data) => {
        setProducts(data.data.data);
        // console.log(data);
        setTotal(data.data.total);
        setError("");
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "An error occurred while fetching products."
        );
      })
      .finally(() => setLoading(false));
  }, [page, limit]);
  const header = [
    { key: "images", name: "Images" },
    { key: "title", name: "Title" },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },
    {
      key: "created_at",
      name: "Created",
    },
    {
      key: "updated_at",
      name: "Updated",
    },
  ];

  // Handle Delete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${Pro}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
      setError("");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "An error occurred while deleting product."
      );
    }
  }

  return (
    <div
      className="w-100 px-4 py-3 rounded"
      style={{
        background: "linearGradient(135deg, #1a1a2e, #16213e, #0f3460)",
        boxShadow:
          "0 0 12px rgba(0, 0, 0, 0.6),0 20px 50px rgba(15, 52, 96, 0.5)",
      }}>
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="text-white">
          <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
          Products
        </h2>
        <Link className="btn my-primary-btn" to="/dashboard/product/add">
          Add Product
        </Link>
      </div>

      {error && <div className="error text-center my-3">{error}</div>}

      <TableShow
        header={header}
        data={products}
        delete={handleDelete}
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        loading={loading}
        total={total}
        search="title"
        searchLink={Pro}
      />
    </div>
  );
}
