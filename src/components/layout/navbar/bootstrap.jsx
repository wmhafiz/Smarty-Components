import React from "react";
import { A } from "hookrouter";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <A className="navbar-brand" href="/">
      SmartViz
    </A>

    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <A className="nav-link" href="/">
          Explore
        </A>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/widgets">
          Widgets
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/play">
          Playground
        </a>
      </li>
    </ul>
  </nav>
);

export default Navbar;
