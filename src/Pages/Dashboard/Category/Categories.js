import { useEffect, useState } from "react";
import { CAT, Cat } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Categories() {
  // States
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get ALl Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
        setError("");
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "An error occurred while fetching categories."
        );
      })
      .finally(() => setLoading(false));
  }, [limit, page]);
  const header = [
    { key: "title", name: "Title" },
    {
      key: "image",
      name: "Image",
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
       await Axios.delete(`${Cat}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
      setError("");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "An error occurred while deleting category."
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
          <FontAwesomeIcon icon={faTags} className="me-2" />
          Categories
        </h2>
        <Link className="btn my-primary-btn" to="/dashboard/category/add">
          Add Category
        </Link>
      </div>

      {error && <div className="error text-center my-3">{error}</div>}

      <TableShow
        limit={limit}
        setLimit={setLimit}
        page={page}
        header={header}
        data={categories}
        delete={handleDelete}
        setPage={setPage}
        loading={loading}
        total={total}
        search="title"
        searchLink={Cat}
      />
    </div>
  );
}
