import { useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Users() {
  // States
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  // Get Current User
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);

  // Get ALl Users
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USERS}?page=${page}&limit=${limit}`)
      .then((data) => {
        setUsers(data.data.data);
        setTotal(data.data.total);
        setError("");
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "An error occurred while fetching users."
        );
      })
      .finally(() => setLoading(false));
  }, [page, limit]);

  const header = [
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
    {
      key: "created_at",
      name: "Created",
    },
    {
      key: "updated_at",
      name: "Last Login",
    },
  ];

  // Handle Delete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
      setError("");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "An error occurred while deleting user."
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
          <FontAwesomeIcon icon={faUsers} className="me-2" />
          Users
        </h2>
        <Link className="btn my-primary-btn" to="/dashboard/user/add">
          Add User
        </Link>
      </div>

      {error && <div className="error text-center my-3">{error}</div>}

      <TableShow
        header={header}
        data={users}
        currentUser={currentUser}
        delete={handleDelete}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        loading={loading}
        total={total}
        search="name"
        searchLink={USER}
      />
    </div>
  );
}
