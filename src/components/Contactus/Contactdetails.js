import React from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const url = process.env.REACT_APP_API_BASE_URL;

const Contactdetails = () => {
  const location = useLocation();
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
                  <h5>Mobile No</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    {getcontactdetails.mobileNo}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Email</h5>
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
              {location.state.data.issolved === 0 ? (
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
            <div className="text-end">
              <Link to={`/contactus`}>
                <Button
                  className="btn-primary btn-sm "
                  style={{ width: "70px", height: "40px" }}
                  type="button">
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactdetails;
