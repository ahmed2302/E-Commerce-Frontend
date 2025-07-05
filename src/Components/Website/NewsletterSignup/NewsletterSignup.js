export default function NewsletterSignup() {
  return (
    <div className="newsletter fade-in">
      <h2 className="mb-3">Get 10% Off Your First Order!</h2>
      <p className="mb-4">
        Subscribe to our newsletter for exclusive deals and updates.
      </p>
      <form className="d-flex justify-content-center flex-wrap gap-2">
        <input
          type="email"
          className="form-control w-auto"
          placeholder="Enter your email"
          style={{ minWidth: 220, maxWidth: 320, borderRadius: 8 }}
        />
        <button type="submit" className="btn btn-light fw-bold px-4 py-2">
          Subscribe
        </button>
      </form>
    </div>
  );
}
