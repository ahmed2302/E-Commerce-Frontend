import { useEffect, useState } from "react";
import { Container, Spinner, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-bg py-5">
      <Container
        className="d-flex flex-column align-items-center justify-content-center fade-in"
        style={{ minHeight: "80vh" }}>
        {loading ? (
          <>
            <Spinner animation="border" variant="primary" />
            <div className="mt-3">Processing your order...</div>
          </>
        ) : success ? (
          <Alert
            variant="success"
            className="text-center"
            style={{
              width: "80%",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}>
            <h4 className="fw-bold mb-2">Thank you for your purchase!</h4>
            <div>Your order has been placed successfully.</div>
            <Button className="mt-4 px-4" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </Alert>
        ) : null}
      </Container>
    </div>
  );
}
