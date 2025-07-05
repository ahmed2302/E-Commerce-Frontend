import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";

import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect, useRef, useState } from "react";
import { WindowSize } from "../../Context/WindowContext";
import { USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { links } from "./NavLink";

export default function SideBar() {
  const menu = useContext(Menu);
  const WindowContext = useContext(WindowSize);
  const windowSize = WindowContext.windowSize;
  const isOpen = menu.isOpen;
  const setIsOpen = menu.setIsOpen;

  // Ref for sidebar
  const sidebarRef = useRef(null);

  // User
  const [user, setUser] = useState("");
  const Navigate = useNavigate();
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);

  // Click outside to close on small screens
  useEffect(() => {
    if (!(windowSize < 1060 && isOpen)) return;
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, windowSize, setIsOpen]);

  return (
    <>
      <div
        ref={sidebarRef}
        className="side-bar pt-3 rounded"
        style={{
          left: windowSize < 1060 ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "240px" : "70px",
          position: windowSize < 1060 ? "fixed" : "sticky",
          transition: "0.2s",
        }}>
        {isOpen ? (
          <h3 style={{ color: "#efefef" }} className="text-center">
            𝗗𝗮𝘀𝗵𝗯𝗼𝗮𝗿𝗱
          </h3>
        ) : (
          <>
            <h1 style={{ color: "#f0c93d" }} className="text-center mb-2">
              𝕯
            </h1>
          </>
        )}

        {links.map(
          (link, key) =>
            link.role.includes(user.role) && (
              <NavLink
                key={key}
                to={link.path}
                className={`d-flex align-items-center ${
                  !isOpen && "justify-content-center"
                } gap-2 side-bar-link mb-2 py-1`}>
                <FontAwesomeIcon
                  style={{
                    padding: isOpen ? "10px 8px 10px 15px" : "10px 13px",
                  }}
                  icon={link.icon}
                />
                <p
                  className="m-0"
                  style={{
                    display: isOpen ? "block" : "none",
                  }}>
                  {link.name}
                </p>
              </NavLink>
            )
        )}
      </div>
    </>
  );
}
