import React, { useState, useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { Button } from "react-bootstrap";
import { tutorspayment } from "../../Redux/Loginpages/tutorspaymentSlice";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing, RotatingLines } from "react-loader-spinner";
import { FaCopy } from "react-icons/fa";

const Tutorspayment = () => {

  const tutorpayment = useSelector((state) => state.tutorpayment.data.info);
  const isLoading = useSelector((state) => state.tutorpayment.isLoading);
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    dispatch(tutorspayment());
  }, []);

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  const handleCopy = (name) => {
    navigator.clipboard.writeText(name);
  };

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        {isLoading ? (
          <p
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}>
             <div className="loader-container">
                          <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="50"
                            visible={true}
                          />
                        </div>
          </p>
        ) : (
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Tutors Payment</h3>
              </div>
              <div className="row">
                <div className="col-md-12 grid-margin">
                  <div className="card new-table">
                    <div className="card-body">
                      <table className="table v-top">
                        <thead>
                          <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">NAME</th>
                            <th scope="col">BALANCE</th>
                            <th scope="col">ACTION</th>
                          </tr>
                        </thead>
                        {tutorpayment &&
                          tutorpayment.map((value, index) => {
                            return (
                              <tbody key={index}>
                                <tr
                                  onClick={() => toggle(index)}
                                  className={
                                    clicked === index
                                      ? "toggle-close"
                                      : "bg-white"
                                  }>
                                  <td>{index + 1}</td>
                                  <td>
                                    {value.name}
                                    {clicked === index ? (
                                      <>
                                        <span className="list-group-item mt-2 ">
                                          <b>Bank Name</b>:
                                          {value.bankdetails?.bankName || ""}
                                          <Button
                                            style={{ border: "none" }}
                                            variant="outline-primary"
                                            size="sm"
                                            className="ml-2"
                                            onClick={() =>
                                              handleCopy(
                                                value.bankdetails.bankName || ""
                                              )
                                            }>
                                            <FaCopy />
                                          </Button>
                                        </span>
                                        <span className="list-group-item mt-2 ">
                                          <b>A/c No</b>.
                                          {value.bankdetails?.accountNumber ||
                                            ""}
                                          <Button
                                            style={{ border: "none" }}
                                            variant="outline-primary"
                                            size="sm"
                                            className="ml-2"
                                            onClick={() =>
                                              handleCopy(
                                                value.bankdetails
                                                  .accountNumber || ""
                                              )
                                            }>
                                            <FaCopy />
                                          </Button>
                                        </span>
                                        <span className="list-group-item mt-2 ">
                                          <b>IFSC Code</b> :
                                          {value.bankdetails?.IFSCCode || ""}
                                          <Button
                                            style={{ border: "none" }}
                                            variant="outline-primary"
                                            size="sm"
                                            className="ml-2"
                                            onClick={() =>
                                              handleCopy(
                                                value.bankdetails.IFSCCode || ""
                                              )
                                            }>
                                            <FaCopy />
                                          </Button>
                                        </span>
                                        <span className="list-group-item mt-2 ">
                                          <b>Account Type</b> :
                                          {value.bankdetails?.accountType || ""}
                                          <Button
                                            style={{ border: "none" }}
                                            variant="outline-primary"
                                            size="sm"
                                            className="ml-2"
                                            onClick={() =>
                                              handleCopy(
                                                value.bankdetails.accountType ||
                                                ""
                                              )
                                            }>
                                            <FaCopy />
                                          </Button>
                                        </span>
                                        <span className="list-group-item mt-2 ">
                                          <b>Pan Card</b> :
                                          {value.bankdetails?.panCard || ""}
                                          <Button
                                            style={{ border: "none" }}
                                            variant="outline-primary"
                                            size="sm"
                                            className="ml-2"
                                            onClick={() =>
                                              handleCopy(
                                                value.bankdetails.panCard || ""
                                              )
                                            }>
                                            <FaCopy />
                                          </Button>
                                        </span>
                                      </>
                                    ) : null}
                                  </td>
                                  <td className="text-success">
                                    {value.balance || ""}
                                  </td>
                                  <td>
                                    <Button className="bg-white bg-opacity-25 text-primary border border-primary btn-sm">
                                      Pay Now
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutorspayment;
