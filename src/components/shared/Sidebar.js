import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const navMenusState = useSelector((state) => state.auth?.user?.actions) || [];
  const navMenusStateLocal = localStorage.getItem("menusItem");
  const navMenusStateLocalParsedObject = JSON.parse(navMenusStateLocal);
  const navMenusStateList = !!navMenusState && navMenusState.length
    ? navMenusState.map((a) => a.name)
    : navMenusStateLocalParsedObject.map((a) => a.name);
  
  useEffect(() => {
    if(navMenusState.length){
      localStorage.setItem("menusItem", JSON.stringify(navMenusState));
    }
  }, [navMenusState]);

  const [activeLink, setActiveLink] = useState("");

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

          {navMenusStateList.includes("Dashboard") && (
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === "/" ? "active" : ""}`}
                to="/"
              >
                <span className="menu-title">Dashboard</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/* Tutors */}
          {navMenusStateList.includes("Tutors") && (
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
                  <li
                    className={`nav-item ${
                      activeLink === "/tutorlist" ? "active" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/tutorlist">
                      Tutors List
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      activeLink === "/tutorspayment" ? "active" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/tutorspayment">
                      Tutors Payment
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          )}

          {/* Student */}
<<<<<<< Updated upstream
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
                      {/*StudentRegitserBonus */}
             <li className={`nav-item ${activeLink === '/studentregitserbonus' ? 'active' : ''}`}>
            <Link className="nav-link" to="/studentregitserbonus">
              <span className="menu-title">Student Regitser Bonus</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li>

              </ul>
            </div>
          </li>
=======
          {navMenusStateList.includes("Student") && (
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
                    <Link
                      className={`nav-link ${
                        activeLink === "/studentlist" ? "active" : ""
                      }`}
                      to="/studentlist"
                    >
                      Student List
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          )}
>>>>>>> Stashed changes

          {/*wallet*/}
          {navMenusStateList.includes("Wallet") && (
            <li
              className={`nav-item ${activeLink === "/wallet" ? "active" : ""}`}
            >
              <Link className="nav-link" to="/wallet">
                <span className="menu-title">Wallet</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Subscription*/}
          {/* <li className="nav-item">
            <Link className="nav-link" to="/subscription">
              <span className="menu-title">Subscription</span>
              <i className="icon-screen-desktop menu-icon"></i>
            </Link>
          </li> */}

          {/*Tutor Subject*/}
          {navMenusStateList.includes("Question Subject") && (
            <li
              className={`nav-item ${
                activeLink === "/tutorsubject" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/tutorsubject">
                <span className="menu-title">Question Subject</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Student Class */}
          {navMenusStateList.includes("Student Class") && (
            <li
              className={`nav-item ${
                activeLink === "studentclass" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/studentclass">
                <span className="menu-title">Student Class</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Adminquetype*/}
          {navMenusStateList.includes("Question Type") && (
            <li
              className={`nav-item ${
                activeLink === "/questiontype" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/questiontype">
                <span className="menu-title">Question Type</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*curruncy */}
          {navMenusStateList.includes("Curruncy") && (
            <li
              className={`nav-item ${
                activeLink === "/curruncy" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/curruncy">
                <span className="menu-title">Curruncy </span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Question Answer*/}
          {navMenusStateList.includes("Curruncy") && (
            <li className="nav-item nav-category">
              <span className="nav-link">Question Answer</span>
            </li>
          )}

          {/*Searchengine*/}
          {navMenusStateList.includes("Searchengine") && (
            <li
              className={`nav-item ${
                activeLink === "/searchengine" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/searchengine">
                <span className="menu-title">Searchengine</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}
          {/* Student */}
          {navMenusStateList.includes("Issue Question") && (
            <li
              className={`nav-item ${
                activeLink === "/issuequestion" ? "active" : ""
              }`}
            >
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
                  <li
                    className={`nav-item ${
                      activeLink === "/issuequestion" ? "active" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/issuequestion">
                      Issue Question
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          )}

          {/*Questions*/}
          {navMenusStateList.includes("Questions") && (
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
                    <Link
                      className={`nav-link ${
                        activeLink === "/tutorque" ? "active" : ""
                      }`}
                      to="/tutorque"
                    >
                      Tutor
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        activeLink === "/adminque" ? "active" : ""
                      }`}
                      to="/adminque"
                    >
                      Admin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        activeLink === "/reanswerque" ? "active" : ""
                      }`}
                      to="/reanswerque"
                    >
                      Reanswer
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        activeLink === "/unsolvedque" ? "active" : ""
                      }`}
                      to="/unsolvedque"
                    >
                      UnSolved
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          )}

          {/*Question Setting*/}
          {navMenusStateList.includes("Question Setting") && (
            <li className="nav-item nav-category">
              <span className="nav-link">Question Setting</span>
            </li>
          )}

          {/*Question timing*/}
          {navMenusStateList.includes("Question timing") && (
            <li
              className={`nav-item ${
                activeLink === "/questiontiming" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/questiontiming">
                <span className="menu-title">Question timing</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Question Pricing*/}
          {navMenusStateList.includes("Question Pricing") && (
            <li
              className={`nav-item ${
                activeLink === "/questionpricing" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/questionpricing">
                <span className="menu-title">Question Pricing</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Question Reanswer Choice*/}
          {navMenusStateList.includes("Question Reanswer") && (
            <li
              className={`nav-item ${
                activeLink === "/questionreanswer" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/questionreanswer">
                <span className="menu-title">Question Reanswer</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Tutor Exam*/}
          {navMenusStateList.includes("Tutor Exam") && (
            <li className="nav-item nav-category">
              <span className="nav-link">Tutor Exam</span>
            </li>
          )}

          {/*Tutor exam*/}
          {navMenusStateList.includes("Tutor Exam Questions") && (
            <li
              className={`nav-item ${
                activeLink === "/tutorexam" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/tutorexam">
                <span className="menu-title">Tutor Exam Questions</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Test Exam*/}
          {navMenusStateList.includes("Tutor Exam Checking") && (
            <li
              className={`nav-item ${
                activeLink === "/testexam" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/testexam">
                <span className="menu-title">Tutor Exam Checking</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Tutorexamconfig*/}
          {navMenusStateList.includes("Tutor Exam Configuration") && (
            <li
              className={`nav-item ${
                activeLink === "/tutorexamconfig" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/tutorexamconfig">
                <span className="menu-title">Tutor Exam Configuration</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Bonus Section*/}
          {navMenusStateList.includes("Bonus Section") && (
            <li className="nav-item nav-category">
              <span className="nav-link">Bonus Section</span>
            </li>
          )}

          {/*Bonus Section*/}
          {navMenusStateList.includes("Student Referral") && (
            <li
              className={`nav-item ${
                activeLink === "/studentreferral" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/studentreferral">
                <span className="menu-title">Student Referral</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Bonus Section*/}
          {navMenusStateList.includes("Student Posting Streak") && (
            <li
              className={`nav-item ${
                activeLink === "/studentpostingstreak" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/studentpostingstreak">
                <span className="menu-title">Student Posting Streak</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Bonus Section*/}
          {navMenusStateList.includes("Tutor Referral") && (
            <li
              className={`nav-item ${
                activeLink === "/tutorreferral" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/tutorreferral">
                <span className="menu-title">Tutor Referral</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Tutorexamconfig*/}
          {navMenusStateList.includes("Tutor Posting Streak") && (
            <li
              className={`nav-item ${
                activeLink === "/tutorpostingstreak" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/tutorpostingstreak">
                <span className="menu-title">Tutor Posting Streak</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*pages*/}
          {navMenusStateList.includes("Pages") && (
            <li className="nav-item nav-category">
              <span className="nav-link">Pages</span>
            </li>
          )}

          {/*testimonial*/}
          {navMenusStateList.includes("Testimonial") && (
            <li
              className={`nav-item ${
                activeLink === "/testimonial" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/testimonial">
                <span className="menu-title">Testimonial</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Pages*/}
          {navMenusStateList.includes("Pages") && (
            <li
              className={`nav-item ${activeLink === "/pages" ? "active" : ""}`}
            >
              <Link className="nav-link" to="/pages">
                <span className="menu-title">Pages</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Features*/}
          {navMenusStateList.includes("Features") && (
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <span className="menu-title">Features</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Services*/}
          {navMenusStateList.includes("Services") && (
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <span className="menu-title">Services</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Offer*/}
          {navMenusStateList.includes("Offer") && (
            <li className="nav-item nav-category">
              <span className="nav-link">Offer</span>
            </li>
          )}

          {/*coupon*/}
          {navMenusStateList.includes("Coupon") && (
            <li
              className={`nav-item ${activeLink === "/coupon" ? "active" : ""}`}
            >
              <Link className="nav-link" to="/coupon">
                <span className="menu-title">Coupon</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*permission*/}
          {navMenusStateList.includes("Permission") && (
            <li className="nav-item nav-category">
              <span className="nav-link">Permission</span>
            </li>
          )}

          {/*User*/}
          {navMenusStateList.includes("Users") && (
            <li
              className={`nav-item ${activeLink === "/users" ? "active" : ""}`}
            >
              <Link className="nav-link" to="/users">
                <span className="menu-title">Users</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}
          {/*Role*/}
          {navMenusStateList.includes("Roles") && (
            <li
              className={`nav-item ${activeLink === "/roles" ? "active" : ""}`}
            >
              <Link className="nav-link" to="/roles">
                <span className="menu-title">Roles</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/* My Account*/}
          {navMenusStateList.includes("My Account") && (
            <li className="nav-item nav-category">
              <span className="nav-link"> My Account</span>
            </li>
          )}
          {/*Profile*/}
          {navMenusStateList.includes("Profile") && (
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <span className="menu-title">Profile</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Settings*/}
          {navMenusStateList.includes("Settings") && (
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
                  <li
                    className={`nav-item ${
                      activeLink === "/socialmediasetting" ? "active" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/socialmediasetting">
                      Social Media Setting
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/AdminPageSetting">
                      Admin Page Set
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
          )}

          {/*mobileNo*/}
          {navMenusStateList.includes("Add Mobile No") && (
            <li
              className={`nav-item ${
                activeLink === "/addmobile" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/addmobile">
                <span className="menu-title"> Add Mobile No</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*contact us*/}
          {navMenusStateList.includes("Contact us") && (
            <li
              className={`nav-item ${
                activeLink === "/contactus" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/contactus">
                <span className="menu-title">Contact us</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Thoughts*/}
          {navMenusStateList.includes("Thoughts") && (
            <li
              className={`nav-item ${
                activeLink === "/thoughts" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/thoughts">
                <span className="menu-title">Thoughts</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Thoughts Popup*/}
          {navMenusStateList.includes("Tutor Exam Popup") && (
            <li
              className={`nav-item ${
                activeLink === "/tutorexampopup" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/tutorexampopup">
                <span className="menu-title">Tutor Exam Popup</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Thoughts*/}
          {navMenusStateList.includes("Posting Guideline") && (
            <li
              className={`nav-item ${
                activeLink === "/postingguideline" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/postingguideline">
                <span className="menu-title">Posting Guideline</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {navMenusStateList.includes("Answer Guideline") && (
            <li
              className={`nav-item ${
                activeLink === "/postingguideline" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/answerguideline">
                <span className="menu-title">Answer Guideline</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}

          {/*Sign out*/}
          {navMenusStateList.includes("Sign out") && (
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                <span className="menu-title">Sign out</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
