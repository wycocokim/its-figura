import React, { useState } from "react";
import { MenuList } from "./MenuList";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const menuList = MenuList.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink to={url} activeClassName="active">
          {title}
        </NavLink>
      </li>
    );
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">Figura</div>
        <div className="menu-icon" onClick={handleClick}>
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={clicked ? "menu-list" : "menu-list close"}>
          {menuList}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
