import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "./Searchengine.css";
import { useLocation } from "react-router-dom";

const Searchenginequedetail = () => {
  const location = useLocation();
  const getresponse = location.state.data;
  console.log(getresponse);

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="Title">
                <h3 className="text">Question</h3>
              </div>
              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="rbt-dashboard-content bg-color-white rbt-shadow-box rbt-border mb--30 p--20">
                            <div className="content">
                              <div className="row">
                                {location.state.data.questionPhoto.map(
                                  (photoUrl) => (
                                    <img
                                      key={photoUrl}
                                      src={photoUrl}
                                      className="profile-img"
                                      alt=""
                                    />
                                  )
                                )}
                                <div className="col-md-12 col-lg-12 mb--20">
                                  <h5>Question</h5>
                                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                    <div className="row">
                                      {location.state.data.question}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-12 mb--20">
                                  <h5>Question Type</h5>
                                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                    <div className="row">
                                      {location.state.data.questionType}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-12 mb--20">
                                  <h5>Question Subject</h5>
                                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                    {location.state.data.questionSubject}
                                  </div>
                                </div>

                                <div className="col-md-12 col-lg-12 mb--20">
                                  <h5>Question Price</h5>
                                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                    <div className="row">
                                      {location.state.data.questionPrice}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-12 mb--20">
                                  <h5>Tutor Price</h5>
                                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                    <div className="row">
                                      {location.state.data.tutorPrice}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-12 mb--20">
                                  <h5>Status</h5>
                                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                    <div className="row">
                                      {location.state.data.status}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-12 mb--20">
                                  <h5>answer</h5>
                                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: location.state.data.answer,
                                      }}
                                    />
                                    {}
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-12 mb--20">
                                  <h5>Explanation</h5>
                                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: location.state.data.explanation,
                                      }}
                                    />
                                    {}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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

export default Searchenginequedetail;
