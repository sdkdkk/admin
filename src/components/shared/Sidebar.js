import React from "react";
import { Link } from "react-router-dom";
// import { BsWindowDock } from "react-icons/bs";

const Sidebar = () => {
  return (
    <>
      <nav
        className="sidebar sidebar-offcanvas"
        style={{ marginLeft: "-12px" }}
        id="sidebar">
        <ul className="nav">
          {/* Dashboard */}
          <li className="nav-item nav-category">
            <span className="nav-link">Dashboard</span>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/">
              <span className="menu-title">Dashboard</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/* Tutors */}
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#ui-basic"
              aria-expanded="false"
              aria-controls="ui-basic">
              <span className="menu-title">Tutors</span>
              <i className="icon-layers menu-icon"></i>
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/tutorlist">
                    Tutors List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tutorspayment">
                    Tutors Payment
                  </Link>
                </li>    
                <li className="nav-item">
                  <Link className="nav-link" to="/professionaldetails">
                    Professional Details
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* Student */}
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#ui-basic"
              aria-expanded="false"
              aria-controls="ui-basic">
              <span className="menu-title">Student</span>
              <i className="icon-layers menu-icon"></i>
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/studentlist">
                    Student List
                  </Link>
                </li>
             
                <li className="nav-item">
                  <Link className="nav-link" to="/tutordetails">
                    Student details
                  </Link>
                </li>
                
              </ul>
            </div>
          </li>

          {/*wallet*/}
          <li className="nav-item">
            <Link className="nav-link" to="/wallet">
              <span className="menu-title">Wallet</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Searchengine*/}
          <li className="nav-item">
            <Link className="nav-link" to="/searchengine">
              <span className="menu-title">Searchengine</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Offers*/}
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <span className="menu-title">Offers</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Tutor exam*/}
          <li className="nav-item">
            <Link className="nav-link" to="/tutorexam">
              <span className="menu-title">Tutor Exam</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>


           {/*Test Exam*/}
           <li className="nav-item">
                  <Link className="nav-link" to="/testexam">
                     <span className="menu-title">Testexam</span>
                     <i className="icon-screen-desktop menu-icon"></i>
                  </Link>
               </li>

          {/*pages*/}
          <li className="nav-item nav-category">
            <span className="nav-link">Pages</span>
          </li>

          {/*testimonial*/}
          <li className="nav-item">
            <Link className="nav-link" to="/testimonial">
              <span className="menu-title">Testimonial</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Pages*/}
          <li className="nav-item">
            <Link className="nav-link" to="/pages">
              <span className="menu-title">Pages</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Features*/}
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <span className="menu-title">Features</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Services*/}
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <span className="menu-title">Services</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/* My Account*/}
          <li className="nav-item nav-category">
            <span className="nav-link"> My Account</span>
          </li>
          {/*Profile*/}
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <span className="menu-title">Profile</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Settings*/}
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#ui-basic"
              aria-expanded="false"
              aria-controls="ui-basic">
              <span className="menu-title">Settings</span>
              <i className="icon-layers menu-icon"></i>
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/socialmediasetting">
                    Social Media Setting
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Email Setting
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/*Sign out*/}
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              <span className="menu-title">Sign out</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
