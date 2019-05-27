import React from "react";

import Navbar from "./navbar/bootstrap";

const Layout = props => (
  <div>
    <Navbar />
    <br />
    <main role="main" className="container">
      {props.children}
    </main>
  </div>
);

export default Layout;
