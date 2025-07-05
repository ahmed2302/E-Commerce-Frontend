import { useEffect, useState } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import profileImg from "../../Assets/Icons/Profile.png";
import { Axios } from "../../Api/axios";
import { USER } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();
  const cookie = Cookie();

  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USER}`)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
        setError("");
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load user data."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    try {
      setLogoutLoading(true);
      cookie.remove("e-commerce");
      navigate("/login", { replace: true });
    } catch (err) {
      setError("Logout failed. Please try again.");
    } finally {
      setLogoutLoading(false);
    }
  }

  return (
    <div className="home-bg py-5">
      <Container
        className="d-flex flex-column align-items-center justify-content-center fade-in"
        style={{ minHeight: "80vh" }}>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : user ? (
          <>
            <img
              src={profileImg}
              alt="Profile"
              width={120}
              height={120}
              className="rounded-circle mb-3 shadow"
            />
            <h2 className="fw-bold mb-1">{user.name}</h2>
            <div className="text-muted mb-2">{user.email}</div>
            <div className="mb-4 small">
              Joined: {user.created_at?.slice(0, 10) || "-"}
            </div>
            <div className="mb-4">
              <span className="badge bg-primary fs-6 px-3 py-2">
                Orders: {user.orders_count ?? 0}
              </span>
            </div>
            <div className="d-flex gap-3">
              <Button variant="outline-primary" className="fw-bold px-4">
                Edit Profile
              </Button>
              <Button
                variant="danger"
                className="fw-bold px-4"
                onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </>
        ) : null}
      </Container>
    </div>
  );
}
