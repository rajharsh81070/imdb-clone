import React from 'react';
import { NavLink } from "react-router-dom";

function Header() {
  const activeStyle = { color: "orange" };
  return (
    <div style={{ paddingTop: '15px', paddingBottom: '27px', fontSize: '21px' }}>
      <nav>
        <NavLink to="/" exact activeStyle={activeStyle}>Home</NavLink> | <NavLink to="/movies" activeStyle={activeStyle}>Movies</NavLink> | <NavLink to="/actors" activeStyle={activeStyle}>Actors</NavLink> | <NavLink to="/producers" activeStyle={activeStyle}>Producers</NavLink>
      </nav>
    </div>
  )
}

export default Header;