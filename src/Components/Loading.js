import "./loading.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return (
    <div className="dashboard-loading">
      <div className="loader-box">
        <div className="cart-icon-moving">
          <FontAwesomeIcon icon={faShoppingCart} />
        </div>
        <p className="loader-label">Loading dashboard data...</p>
      </div>
    </div>
  );
}
