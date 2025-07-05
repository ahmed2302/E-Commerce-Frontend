import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigate();

  //   Id
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
        setLoading(false);
      })
      .catch(() => nav("/dashboard/users/page/404", { replace: true }));
  }, [id, nav]);
  //   Handle SubmitP
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });
      // window.location.pathname = "/dashboard/users";
      nav("/dashboard/users");
    } catch (err) {
      setLoading(false);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "An error occurred while editing user."
      );
    }
  }

  return (
    <>
      {/* {loading && <Loading />} */}
      {error && <div className="error text-center my-3">{error}</div>}
      <Form
        className="w-100 px-4 py-3 rounded shadow-sm"
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
          color: "aliceblue",
          boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.2)",
        }}
        onSubmit={HandleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name..."
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlControlInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlControlInput3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option
              style={{
                backgroundColor: "#0f3460",
                color: "whitesmoke",
              }}
              disabled
              value="">
              Select Role
            </option>
            <option
              style={{
                backgroundColor: "#0f3460",
                color: "whitesmoke",
              }}
              value="1995">
              Admin
            </option>
            <option
              style={{
                backgroundColor: "#0f3460",
                color: "whitesmoke",
              }}
              value="2001">
              User
            </option>
            <option
              style={{
                backgroundColor: "#0f3460",
                color: "whitesmoke",
              }}
              value="1996">
              Writer
            </option>
          </Form.Select>
        </Form.Group>
        <button
          disabled={loading}
          className="btn my-primary-btn d-flex align-items-center justify-content-center gap-2">
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"></span>
          )}
          Save
        </button>
      </Form>
    </>
  );
}
