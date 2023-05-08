import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from "../Image/doubt-q.png";
import face3 from "../Image/face3.jpg"


const Navbar = () => {

  function toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  // function toggleRightSidebar() {
  //   document.querySelector('.right-sidebar').classList.toggle('open');
  // }

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex align-items-center">
        <Link className="navbar-brand brand-logo" to="/">
          <img src={Logo} alt="logo" className="logo-dark text-center" style={{ height: "auto", maxWidth: "100%" }} />
        </Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center flex-grow-1">
        <h5 className="mb-0 font-weight-medium d-none d-lg-flex">
          Welcome DoubtQ Dashboard!
        </h5>
        <ul className="navbar-nav navbar-nav-right ml-auto">
          <li className="nav-item dropdown d-none d-xl-inline-flex user-dropdown">
            <Link
              className="nav-link dropdown-toggle"
              id="UserDropdown"
              href="#"
              data-toggle="dropdown"
              aria-expanded="false">
              <img
                className="img-xs rounded-circle ml-2"
                src={face3}
                alt=""
              />
              <span className="font-weight-normal">Vaidik Admin</span>
            </Link>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="UserDropdown">
              <Link className="dropdown-item">
                <i className="dropdown-item-icon icon-question text-primary" />
                FAQ
              </Link>
              <Link to="/logout" className="dropdown-item">
                <i className="dropdown-item-icon icon-power text-primary" />
                Sign Out
              </Link>
            </div>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas" onClick={toggleOffcanvas}>
          <span className="icon-menu" />
        </button>
      </div>
    </nav>
  );
}
// }

export default Navbar;
