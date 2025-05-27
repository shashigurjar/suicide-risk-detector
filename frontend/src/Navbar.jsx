import React from "react";
import './Navbar.css';
function Navbar(props) {
  function handleTryNow() {
    props.change(true);
  }
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <p>Suicide Detection</p>
      </div>
      <div className="nav-btn">
        <p>About</p>
        <button className="try-now-btn" onClick={handleTryNow}>Try Now ↗</button>
      </div>
    </nav>
  );
};

export default Navbar;
