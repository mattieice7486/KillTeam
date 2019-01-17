import React from "react";
import "./Nav.css";

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
    <a className="navbar-brand" href="/">
      Killteam
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/squad">Squad</a>
      </li>
    </ul>
  </div>
  </nav>
);

export default Nav;
