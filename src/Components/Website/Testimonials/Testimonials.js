export default function Testimonials() {
  return (
    <div className="testimonials fade-in">
      <h2 className="text-center mb-4">What Our Customers Say</h2>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        <div className="card p-4 card-hover" style={{ maxWidth: 340 }}>
          <div className="d-flex align-items-center mb-3">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="user"
              className="rounded-circle me-3"
              width="48"
              height="48"
            />
            <div>
              <strong>John D.</strong>
              <div className="text-muted small">Verified Buyer</div>
            </div>
          </div>
          <div>“Amazing quality and super fast shipping. Will buy again!”</div>
        </div>
        <div className="card p-4 card-hover" style={{ maxWidth: 340 }}>
          <div className="d-flex align-items-center mb-3">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="user"
              className="rounded-circle me-3"
              width="48"
              height="48"
            />
            <div>
              <strong>Sarah K.</strong>
              <div className="text-muted small">Loyal Customer</div>
            </div>
          </div>
          <div>
            “The best online shopping experience I've had. Highly recommend!”
          </div>
        </div>
        <div className="card p-4 card-hover" style={{ maxWidth: 340 }}>
          <div className="d-flex align-items-center mb-3">
            <img
              src="https://randomuser.me/api/portraits/men/65.jpg"
              alt="user"
              className="rounded-circle me-3"
              width="48"
              height="48"
            />
            <div>
              <strong>Mike B.</strong>
              <div className="text-muted small">Frequent Shopper</div>
            </div>
          </div>
          <div>“Great deals and awesome support. Five stars!”</div>
        </div>
      </div>
    </div>
  );
}
