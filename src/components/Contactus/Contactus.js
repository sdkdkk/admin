import React from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import contact from "../Image/contact.jpg"
import { Link } from "react-router-dom";
import "./Contactus.css";


const Curruncy = () => {



  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Contact Us</h3>
              </div>
              <div class="row mt-3">
                  <div class="col-12 grid-margin stretch-card">
                    <div class="card new-table">
                      <div class="card-body">
                        <div class="converter-container">
                          <div class="input-container">
                          <main className="rbt-main-wrapper">
                                <div className="rbt-conatct-area bg-gradient-11 rbt-section-gap">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="section-title text-center mb--60">
                                                    <span className="subtitle bg-secondary-opacity">Contact Us</span>
                                                    <h2 className="title">Have Some Questions? </h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-5">
                                            <div
                                                className="col-lg-4 col-md-6 col-sm-6 col-12 sal-animate"
                                                data-sal="slide-up"
                                                data-sal-delay={150}
                                                data-sal-duration={800}
                                            >
                                                <div className="rbt-address">
                                                    <div className="icon">
                                                        <i className="feather-headphones" />
                                                    </div>
                                                    <div className="inner">
                                                        <h4 className="title">Contact Phone Number</h4>
                                                        <p>
                                                            <Link to="tel:+444555666777" className='text-decoration-none'>+444 555 666 777</Link>
                                                        </p>
                                                        <p>
                                                            <Link to="tel:+222222222333" className='text-decoration-none'>+222 222 222 333</Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="col-lg-4 col-md-6 col-sm-6 col-12 sal-animate"
                                                data-sal="slide-up"
                                                data-sal-delay={200}
                                                data-sal-duration={800}
                                            >
                                                <div className="rbt-address">
                                                    <div className="icon">
                                                        <i className="feather-mail" />
                                                    </div>
                                                    <div className="inner">
                                                        <h4 className="title">Our Email Address</h4>
                                                        <p>
                                                            <Link to="mailto:admin@gmail.com" className='text-decoration-none'>admin@gmail.com</Link>
                                                        </p>
                                                        <p>
                                                            <Link to="mailto:example@gmail.com" className='text-decoration-none'>example@gmail.com</Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="col-lg-4 col-md-6 col-sm-6 col-12 sal-animate"
                                                data-sal="slide-up"
                                                data-sal-delay={250}
                                                data-sal-duration={800}
                                            >
                                                <div className="rbt-address">
                                                    <div className="icon">
                                                        <i className="feather-map-pin" />
                                                    </div>
                                                    <div className="inner">
                                                        <h4 className="title">Our Location</h4>
                                                        <p>
                                                            5678 Bangla Main Road, cities 580 <br /> GBnagla, example 54786
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rbt-contact-address mb--80">
                                    <div className="container">
                                        <div className="row g-5">
                                            <div className="col-lg-6">
                                                <div className="thumbnail">
                                                    <img
                                                        className="w-100 radius-6"
                                                        src={contact}
                                                        alt="Contact Images"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="rbt-contact-form contact-form-style-1 max-width-auto">
                                                    <div className="section-title text-start">
                                                        <span className="subtitle bg-primary-opacity">inquiry now</span>
                                                    </div>
                                                    <h4 className="title">You Can Contact With Me</h4>
                                                    <form
                                                        action="#"
                                                        className="rbt-profile-row rbt-default-form row row--15"
                                                    >
                                                        <div className="col-lg-12 col-12">
                                                            <div className="rbt-form-group">
                                                                <label htmlFor="firstname">Full Name</label>
                                                                <input
                                                                    id="firstname"
                                                                    type="text"
                                                                    defaultValue=""
                                                                    placeholder="Jone Dio"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-12">
                                                            <div className="rbt-form-group">
                                                                <label htmlFor="lastname">Email</label>
                                                                <input
                                                                    id="lastname"
                                                                    type="email"
                                                                    defaultValue=""
                                                                    placeholder="jonedio@gmail.com"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-12">
                                                            <div className="rbt-form-group">
                                                                <label htmlFor="username">Mobile</label>
                                                                <input
                                                                    id="username"
                                                                    type="tel"
                                                                    defaultValue=""
                                                                    placeholder="91 12345 67890"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="rbt-form-group">
                                                                <label htmlFor="bio">Message</label>
                                                                <textarea
                                                                    placeholder="Something Say"
                                                                    id="bio"
                                                                    cols={20}
                                                                    rows={5}
                                                                    defaultValue={""}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 mt--20">
                                                            <div className="rbt-form-group">
                                                                <Link className="btn-sm rbt-btn btn-gradient" to="#">
                                                                    Send Message
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
export default Curruncy;