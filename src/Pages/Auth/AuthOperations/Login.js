import { useEffect, useRef, useState } from "react";
import Cookie from "cookie-universal";
import axios from "axios";
import { LOGIN, baseURL } from "../../../Api/Api";
import "./Auth.css";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const focus = useRef("");
  const [loading, setLoading] = useState(false);
  const cookie = Cookie();
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    focus.current.focus();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, form);
      setLoading(false);
      const token = res.data.token;
      const role = res.data.user.role;
      cookie.set("e-commerce", token);

      if (role === "1995") {
        window.location.pathname = "/dashboard/users/";
      } else if (role === "1999") {
        window.location.pathname = "/dashboard/categories/";
      } else {
        window.location.pathname = "/";
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response?.status === 401) {
        setErr("Invalid email or password.");
      } else {
        setErr("Internal server error.");
      }
    }
  }

  return (
    <>
      <div className="auth-page position-relative overflow-hidden">
        {/* Decorative background objects */}
        <div
          className="auth-bg-circle bg-warning position-absolute"
          style={{
            top: "-60px",
            left: "-60px",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            opacity: 0.18,
            zIndex: 1,
          }}></div>
        <div
          className="auth-bg-circle bg-primary position-absolute"
          style={{
            bottom: "-80px",
            right: "-80px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            opacity: 0.13,
            zIndex: 1,
          }}></div>
        <div
          className="auth-bg-square bg-info position-absolute"
          style={{
            top: "40%",
            left: "-50px",
            width: "80px",
            height: "80px",
            borderRadius: "18px",
            opacity: 0.1,
            zIndex: 1,
            transform: "rotate(15deg)",
          }}></div>
        <div
          className="auth-bg-square bg-danger position-absolute"
          style={{
            bottom: "15%",
            right: "-40px",
            width: "60px",
            height: "60px",
            borderRadius: "18px",
            opacity: 0.1,
            zIndex: 1,
            transform: "rotate(-10deg)",
          }}></div>
        <div className="row h-100 d-flex align-items-center justify-content-center">
          <div
            className="col-12 col-md-11 col-lg-9"
            style={{ position: "relative", zIndex: 2 }}>
            <Form onSubmit={handleSubmit} className="auth-form shadow-lg p-4">
              <div className="form-title text-center mb-4">
                <h2>Login</h2>
                <p className="text-muted">
                  Please enter your credentials to continue.
                </p>
              </div>

              <Form.Group className="form-custom">
                <Form.Control
                  ref={focus}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                  placeholder="Enter your email"
                  required
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>

              <Form.Group className="form-custom position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={form.password}
                  placeholder="Enter your password"
                  required
                  minLength="6"
                />
                <Form.Label>Password</Form.Label>

                {/* Toggle Icon */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#666",
                    fontSize: "16px",
                  }}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </Form.Group>

              <button
                className="btn my-primary-btn w-100 mt-3"
                disabled={loading}>
                {loading && (
                  <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                )}
                Login
              </button>

              <div className="google-btn mt-4 mx-auto">
                <a
                  href="http://127.0.0.1:8000/login-google"
                  className="d-flex align-items-center justify-content-center gap-3">
                  <FontAwesomeIcon color="white" icon={faGoogle} size="lg" />
                  <span className="btn-text-custom">
                    <b>Sign in with Google</b>
                  </span>
                </a>
              </div>

              {err !== "" && <div className="error text-center">{err}</div>}

              <div className="text-center mt-3">
                <span className="text-muted">Don't have an account? </span>
                <Link to="/register" className="fw-bold">
                  Register
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
