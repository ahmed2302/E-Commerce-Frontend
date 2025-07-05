import { useEffect, useRef, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { Cat } from "../../../Api/Api";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigate();

  // Ref
  const focus = useRef("");

  // Handle Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  //   Handle SubmitP
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      await Axios.post(`${Cat}/add`, form);
      nav("/dashboard/categories");
      setError("");
    } catch (err) {
      setLoading(false);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "An error occurred while adding category."
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
        <div className="mb-4">
          <h2 className="text-white">
            <FontAwesomeIcon icon={faTag} className="me-2" />
            Add Category
          </h2>
        </div>
        {error && <div className="error text-center my-3">{error}</div>}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            ref={focus}
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <FormControl
            onChange={(e) => setImage(e.target.files.item(0))}
            type="file"></FormControl>
        </Form.Group>
        <button
          disabled={loading || title.length <= 1}
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
