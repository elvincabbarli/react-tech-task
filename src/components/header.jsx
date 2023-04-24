import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>Kredit App</h1>
      </Link>
      <Link className="muster-login" to="musteri-login">
        Qeydiyyat(müştəri)
      </Link>
    </header>
  );
};

export default Header;
