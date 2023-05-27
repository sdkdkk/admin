import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";

const Contactdetails = () => {
  const location = useLocation();
  console.log(location.state.data);
  const getcontactdetails = location.state.data;

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="container-fluid">
            <div className="content mt-3">
              <div className="row">
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Full Name</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    {getcontactdetails.fullname}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>mobileNo</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    {getcontactdetails.mobileNo}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>email</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    {getcontactdetails.email}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Message</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    {getcontactdetails.Message}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Contactdetails;
