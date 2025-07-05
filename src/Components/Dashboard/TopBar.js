import {
  faBars,
  faSignOutAlt,
  faHome,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { LOGOUT, USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { Navigate, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const cookie = Cookie();
  const [name, setName] = useState("");
  const Navigate = useNavigate();
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setName(data.data.name))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);

  async function handleLogOut() {
    try {
      setLogoutLoading(true);
      const res = await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    } finally {
      setLogoutLoading(false);
    }
  }

  return (
    <div className="top-bar rounded mb-3 py-2 shadow-sm">
      <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center gap-2">
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            cursor={"pointer"}
            icon={faBars}
          />
          <h5 className="m-0 d-flex align-items-center gap-2">
            {name}
            <FontAwesomeIcon
              icon={logoutLoading ? faSpinner : faSignOutAlt}
              spin={logoutLoading}
              className="ms-2 text-danger"
              style={{ cursor: logoutLoading ? "not-allowed" : "pointer" }}
              title="Logout"
              onClick={logoutLoading ? undefined : handleLogOut}
            />
          </h5>
        </div>
        <div
          className="btn my-primary-btn d-flex align-items-center gap-2 px-3 py-1"
          style={{
            fontSize: "0.95rem",
            cursor: "pointer",
            borderRadius: "6px",
            boxShadow: "0 3px 8px rgba(0, 123, 255, 0.25)",
            transition: "background-color 0.3s, transform 0.2s",
            lineHeight: "1.4",
          }}
          title="Go to Home"
          onClick={() => Navigate("/")}>
          <FontAwesomeIcon icon={faHome} style={{ fontSize: "1.1rem" }} />
          <span style={{ fontWeight: 500 }}>Home</span>
        </div>
      </div>
    </div>
  );
}
