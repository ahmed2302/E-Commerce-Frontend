import { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { Cat } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function User() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigate();

  //   Id
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    Axios.get(`${Cat}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setLoading(false);
      })
      .catch(() => nav("/dashboard/categories/page/404", { replace: true }));
  }, [id,nav]);
  //   Handle SubmitP
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);

    try {
      await Axios.post(`${Cat}/edit/${id}`, form);
      nav("/dashboard/categories");
      setError("");
    } catch (err) {
      setLoading(false);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "An error occurred while editing category."
      );
    }
  }

  return (
    <>
      {/* {loading && <Loading />} */}
      <Form
        className="w-100 px-4 py-3 rounded shadow-sm"
        onSubmit={HandleSubmit}
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
          color: "aliceblue",
          boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.2)",
        }}>
        {error && <div className="error text-center my-3">{error}</div>}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="title..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <FormControl
            onChange={(e) => setImage(e.target.files.item(0))}
            type="file"></FormControl>
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
