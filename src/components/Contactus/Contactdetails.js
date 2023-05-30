import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const url = process.env.REACT_APP_API_BASE_URL;

const Contactdetails = () => {
  const location = useLocation();
  console.log(location.state.data.issolved);
  console.log(location.state._id);
  const getcontactdetails = location.state.data;
  const token = localStorage.getItem("token");
  const id = location.state.data._id;

  //Suspend Api
  const Solved = async () => {
    try {
      const { data } = await axios.post(`${url}/admin/admincontact/${id}`, {
        token: token,
      });

      if (data.message) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

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
              {location.state.data.issolved === 1 ? (
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={Solved}>
                  Solved
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactdetails;
