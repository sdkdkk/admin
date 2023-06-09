import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Sidebar.css'

const Sidebar = () => {


  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, [setActiveLink]);


  return (
    <>
      <nav
        className="sidebar sidebar-offcanvas"
        style={{ marginLeft: "-12px" }}
        id="sidebar"
      >
        <ul className="nav">
          {/* Dashboard */}
          <li className="nav-item nav-category">
            <span className="nav-link">Dashboard</span>
          </li>

          <li className="nav-item">
            <Link className={`nav-link ${activeLink === '/' ? 'active' : ''}`} to="/">
              <span className="menu-title">Dashboard</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/* Tutors */}
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#tutor-menu"
              aria-expanded="false"
              aria-controls="tutor-menu"
            >
              <span className="menu-title">Tutors</span>
              <i className="icon-layers menu-icon"></i>
            </a>
            <div className="collapse" id="tutor-menu">
              <ul className="nav flex-column sub-menu">
                <li className={`nav-item ${activeLink === '/tutorlist' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/tutorlist">
                    Tutors List
                  </Link>
                </li>
                <li className={`nav-item ${activeLink === '/tutorspayment' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/tutorspayment">
                    Tutors Payment
                  </Link>
                </li>

                <li className={`nav-item ${activeLink === '/tutorpayments' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/tutorpayments">
                    Tutors Payments
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
              href="#student-menu"
              aria-expanded="false"
              aria-controls="student-menu"
            >
              <span className="menu-title">Student</span>
              <i className="icon-layers menu-icon"></i>
            </a>
            <div className="collapse" id="student-menu">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className={`nav-link ${activeLink === '/studentlist' ? 'active' : ''}`} to="/studentlist">
                    Student List
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/*wallet*/}
          <li className={`nav-item ${activeLink === '/wallet' ? 'active' : ''}`}>
            <Link className="nav-link" to="/wallet">
              <span className="menu-title">Wallet</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Tutor Subject*/}
          <li className={`nav-item ${activeLink === '/tutorsubject' ? 'active' : ''}`}>
            <Link className="nav-link" to="/tutorsubject">
              <span className="menu-title">Question Subject</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Student Class */}
          <li className={`nav-item ${activeLink === 'studentclass' ? 'active' : ''}`}>
            <Link className="nav-link" to="/studentclass">
              <span className="menu-title">Student Class</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Adminquetype*/}
          <li className={`nav-item ${activeLink === '/questiontype' ? 'active' : ''}`}>
            <Link className="nav-link" to="/questiontype">
              <span className="menu-title">Question Type</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*curruncy */}
          <li className={`nav-item ${activeLink === '/curruncy' ? 'active' : ''}`}>
            <Link className="nav-link" to="/curruncy">
              <span className="menu-title">Curruncy </span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Question Answer*/}
          <li className="nav-item nav-category">
            <span className="nav-link">Question Answer</span>
          </li>

          {/*Searchengine*/}
          <li className={`nav-item ${activeLink === '/searchengine' ? 'active' : ''}`}>
            <Link className="nav-link" to="/searchengine">
              <span className="menu-title">Searchengine</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>
          {/* Student */}
          <li className={`nav-item ${activeLink === '/issuequestion' ? 'active' : ''}`}>
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#student-menu"
              aria-expanded="false"
              aria-controls="student-menu"
            >
              <span className="menu-title">Issue Question</span>
              <i className="icon-layers menu-icon"></i>
            </a>
            <div className="collapse" id="student-menu">
              <ul className="nav flex-column sub-menu">
                <li className={`nav-item ${activeLink === '/issuequestion' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/issuequestion">
                    Issue Question
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/*Questions*/}
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#question-menu"
              aria-expanded="false"
              aria-controls="question-menu"
            >
              <span className="menu-title">Questions</span>
              <i className="icon-layers menu-icon"></i>
            </a>
            <div className="collapse" id="question-menu">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className={`nav-link ${activeLink === '/tutorque' ? 'active' : ''}`} to="/tutorque">
                    Tutor
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${activeLink === '/adminque' ? 'active' : ''}`} to="/adminque">
                    Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${activeLink === '/reanswerque' ? 'active' : ''}`} to="/reanswerque">
                    Reanswer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${activeLink === '/unsolvedque' ? 'active' : ''}`} to="/unsolvedque">
                    UnSloved
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/questions">
              <span className="menu-title">Questions</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Question Setting*/}
          <li className="nav-item nav-category">
            <span className="nav-link">Question Setting</span>
          </li>

          {/*Question timing*/}
          <li className="nav-item">
            <Link className="nav-link" to="/questiontiming">
              <span className="menu-title">Question timing</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Question Pricing*/}
          <li className="nav-item">
            <Link className="nav-link" to="/questionpricing">
              <span className="menu-title">Question Pricing</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Question Reanswer Choice*/}
          <li className="nav-item">
            <Link className="nav-link" to="/questionreanswer">
              <span className="menu-title">Question Reanswer</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Tutor Exam*/}
          <li className="nav-item nav-category">
            <span className="nav-link">Tutor Exam</span>
          </li>

          {/*Tutor exam*/}
          <li className="nav-item">
            <Link className="nav-link" to="/tutorexam">
              <span className="menu-title">Tutor Exam Questions</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Test Exam*/}
          <li className="nav-item">
            <Link className="nav-link" to="/testexam">
              <span className="menu-title">Tutor Exam Checking</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Tutorexamconfig*/}
          <li className="nav-item">
            <Link className="nav-link" to="/tutorexamconfig">
              <span className="menu-title">Tutor Exam Configuration</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Bonus Section*/}
          <li className="nav-item nav-category">
            <span className="nav-link">Bonus Section</span>
          </li>


          {/*Bonus Section*/}
          <li className="nav-item">
            <Link className="nav-link" to="/studentreferral">
              <span className="menu-title">Student Referral</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Bonus Section*/}
          <li className="nav-item">
            <Link className="nav-link" to="/studentpostingstreak">
              <span className="menu-title">Student Posting Streak</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Bonus Section*/}
          <li className="nav-item">
            <Link className="nav-link" to="/tutorreferral">
              <span className="menu-title">Tutor Referral</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Tutorexamconfig*/}
          <li className="nav-item">
            <Link className="nav-link" to="/tutorpostingstreak">
              <span className="menu-title">Tutor Posting Streak</span>
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

          {/*Offer*/}
          <li className="nav-item nav-category">
            <span className="nav-link">Offer</span>
          </li>

          {/*coupon*/}
          <li className="nav-item">
            <Link className="nav-link" to="/coupon">
              <span className="menu-title">Coupon</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*permission*/}
          <li className="nav-item nav-category">
            <span className="nav-link">Permission</span>
          </li>

          {/*User*/}
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              <span className="menu-title">Users</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>
          {/*Role*/}
          <li className="nav-item">
            <Link className="nav-link" to="/roles">
              <span className="menu-title">Roles</span>
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
              href="#settings-menu"
              aria-expanded="false"
              aria-controls="settings-menu"
            >
              <span className="menu-title">Settings</span>
              <i className="icon-layers menu-icon"></i>
            </a>
            <div className="collapse" id="settings-menu">
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

          {/*mobileNo*/}
          <li className="nav-item">
            <Link className="nav-link" to="/addmobile">
              <span className="menu-title"> Add Mobile No</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*contact us*/}
          <li className="nav-item">
            <Link className="nav-link" to="/contactus">
              <span className="menu-title">Contact us</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

          {/*Sign out*/}
          <li className="nav-item">
            <Link className="nav-link" to="/logout">
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
