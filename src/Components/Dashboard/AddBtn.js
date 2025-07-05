import { Link } from "react-router-dom";

export default function AddBtn() {
  return (
    <Link className="btn my-primary-btn" to="/dashboard/user/add">
      Add User
    </Link>
  );
}
