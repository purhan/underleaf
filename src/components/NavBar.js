import React from "react";
import Logo from "./Logo";

function NavBar() {
  return (
    <nav className="navbar">
      <h3 className="title">
        <Logo />
        &nbsp;UNDERLEAF
      </h3>
    </nav>
  );
}

export default NavBar;
