export default function Footer() {
  return (
    <footer className="footer fade-in">
      <div className="mb-3">
        <a href="#" className="me-3 text-light text-decoration-none">
          Home
        </a>
        <a href="#" className="me-3 text-light text-decoration-none">
          Shop
        </a>
        <a href="#" className="me-3 text-light text-decoration-none">
          Contact
        </a>
        <a href="#" className="me-3 text-light text-decoration-none">
          About
        </a>
      </div>
      <div className="mb-3">
        <a href="#" className="me-2">
          <i className="fab fa-facebook fa-lg"></i>
        </a>
        <a href="#" className="me-2">
          <i className="fab fa-twitter fa-lg"></i>
        </a>
        <a href="#" className="me-2">
          <i className="fab fa-instagram fa-lg"></i>
        </a>
        <a href="#" className="me-2">
          <i className="fab fa-linkedin fa-lg"></i>
        </a>
      </div>
      <div className="small">
        &copy; {new Date().getFullYear()} Shampoo Nice. All rights reserved.
      </div>
    </footer>
  );
}
