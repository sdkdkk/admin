import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Tutors/Tutorlist.css";
// import { FcApproval } from "react-icons/fc";
// import { AiOutlineClose } from "react-icons/ai";
// import { tutordetail } from "../../Redux/Loginpages/tutordetailSlice";
// import { Posts, Transaction } from "../Tutors/TutorData";
// import { tutordetail } from "../../Redux/Loginpages/tutordetailSlice";
// import { Button } from "react-bootstrap";
// import { Transaction } from "./TutorData";
// import { Posts } from "./TutorData";
import { CgProfile } from "react-icons/cg";
import { Pagination } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import Moment from "react-moment";

const Studentdetails = () => {
  //   const tutordetails = useSelector((state) => state.tutordetail);
  //   console.log(tutordetails);
  const { _id } = useParams();
  const [studentdetail, setStudentdetail] = useState([]);
  const [studentque, setStudentque] = useState([]);
  const [studenttransation, setStudenttransation] = useState([]);
  console.log(studentque);
  const token = localStorage.getItem("token");
  const [Loader, setLoader] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://vaidik-backend.onrender.com/admin/studentquestionanswer/${_id}`,
          {
            token: token,
          }
        );
        const response1 = await axios.post(
          `https://vaidik-backend.onrender.com/admin/studenttransactiondetails/${_id}`,
          {
            token: token,
          }
        );
        const response2 = await axios.post(
          `https://vaidik-backend.onrender.com/admin/studentdetails/${_id}`,
          {
            token: token,
          }
        );
        setStudentque(response.data.message);
        setStudenttransation(response1.data.transaction);
        setStudentdetail(response2.data.document);
        setLoader(false);
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      }
    };

    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;

  const displayque = studentque.slice(indexOfFirstPage, indexOfLastPage);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const [currentPage1, setCurrentPage1] = useState(1);
  const [postsPerPage1] = useState(6);
  const indexOfLastPage1 = currentPage1 * postsPerPage1;
  const indexOfFirstPage1 = indexOfLastPage1 - postsPerPage1;

  const displaytransation = studenttransation.slice(
    indexOfFirstPage1,
    indexOfLastPage1
  );
  const handleChange1 = (event, value) => {
    setCurrentPage1(value);
  };

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />

        <div>
          {Loader ? (
            <div className="loader-end text-end" style={{marginLeft:"500px",marginTop:"250px"}}>
              {Loader ? (
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["black"]}
                />
              ) : null}
            </div>
          ) : (
            <div className="second-section text-center mt-4 mx-4">
              {studentdetail.map((data) => {
                return (
                  <div className="row" style={{ backgroundColor: "#c0d7ff" }}>
                    <div className="col-md-3">
                      <div className="aside text-start mt-3">
                        <div className="col d-flex align-items-start">
                          <div className="icon-square text-dark flex-shrink-0 me-3">
                            <CgProfile style={{ fontSize: "40px" }} />
                          </div>
                          <div>
                            <h6>{data.name}</h6>
                            <h6>{data.email}</h6>
                            <h6>+91 98989 74747</h6>
                            <address>
                              1355 Market St, Suite 900 San Francisco, CA 94103
                              P: (123) 456-7890
                            </address>
                            <br />
                            <h5>Professional Details</h5>
                            <h6>HDFC Bank</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div
                        className="details mt-3"
                        style={{
                          display: "inline-block",
                          textAlign: "justify",
                        }}>
                        <h6>Bank Details</h6>
                        <h6 className="bank-text">HDFC bank</h6>
                        <h6 className="AC-text">A/C No.4747474747</h6>
                        <h6 className="IFSC-text">IFSC Code: 414141414</h6>
                        <h6 className="Branch-text">Branch: Surat</h6>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm mt-4">
                          Pay Now
                        </button>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div
                        className="Subject mt-3"
                        style={{
                          display: "inline-block",
                          textAlign: "justify",
                        }}>
                        <h6>Subject</h6>
                        <div className="gap-2 d-md-flex justify-content-md-end">
                          <span className="badge rounded-pill bg-warning"></span>
                          <span className="badge rounded-pill bg-primary">
                            {" "}
                          </span>
                          <span className="badge rounded-pill bg-dark">
                            Maths
                          </span>
                        </div>
                        <h5 className="bottom mt-4 text-secondary">
                          Total Raferral
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div
                        className="Earnings mt-3"
                        style={{
                          display: "inline-block",
                          textAlign: "justify",
                        }}>
                        <h6 className="text-secondary">Earnings</h6>
                        <h6 className="text-dark">
                          <b>Rs.500</b>
                        </h6>
                        <h6 className="text-secondary">Paid</h6>
                        <h6 className="text-danger">
                          <b>Rs.200</b>
                        </h6>
                        <h6 className="text-secondary">Balance</h6>
                        <h4 className="text-success">
                          <b>Rs.{data.balance}</b>
                        </h4>
                      </div>
                    </div>
                    {/* <hr
                        className="line"
                        style={{ height: "2px", marginTop: "30px" }}
                      /> */}
                    {/* <div   
                        style={{ backgroundColor: "#c0d7ff" }}>
                        <div className="  ">
                          <button className="btn btn-success mx-2" type="button">
                            <FcApproval/>
                            Approve
                          </button>
                          <button className="btn btn-danger " type="button">
                            <AiOutlineClose/>
                          Reject
                          </button>
                        </div>
                      </div> */}
                  </div>
                );
              })}
              <div className="heading-main mt-5 text-start">
                <h4>Transaction History</h4>
              </div>
              <div>
                <div className="table-responsive">
                  <div className="rable">
                    <table className="table">
                      <thead>
                        <tr>
                          <th colSpan="2">Date</th>
                          <th colSpan="2">Paid</th>
                          <th colSpan="2">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displaytransation.map((Data, id) => {
                          return (
                            <tr key={id}>
                              <td colSpan="2">
                                {" "}
                                <Moment format="D MMM YYYY" withTitle>
                                  {Data.date}
                                </Moment>
                              </td>
                              <td colSpan="2">Rs.{Data.amount}</td>
                              <td colSpan="2">Rs.{Data.balance}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="table-pagination">
                      <Pagination
                        count={1000}
                        page={currentPage1}
                        onChange={handleChange1}
                        shape="rounded"
                        variant="outlined"
                        showFirstButton
                        showLastButton
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" text-start heading-main mt-5">
                <h4>Answer Given</h4>
              </div>
              <div className=" table-responsive">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Answer</th>
                      <th scope="col">Student</th>
                      <th scope="col">Earnings</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayque.map((Data, id) => {
                      return (
                        <tr key={id}>
                          <td>{Data.date}</td>
                          <td>
                            <b>{Data.allQuestions.question}</b>
                            {/* <p>{Data.Answer}</p> */}
                          </td>
                          <td>
                            {Data.student === "Sohan.." ? (
                              <span className="badge rounded-pill bg-info text-dark">
                                {Data.allQuestions.questionPrice}
                              </span>
                            ) : (
                              <span className="badge rounded-pill bg-danger text-dark">
                                {Data.allQuestions.questionPrice}
                              </span>
                            )}
                          </td>
                          <td>
                            {Data.earings === "10" ? (
                              <span className="badge bg-warning text-dark">
                                {Data.earings}
                              </span>
                            ) : (
                              <span className="badge bg-danger text-dark">
                                {Data.earings}
                              </span>
                            )}
                          </td>
                          <td
                            className="cursor-pointer"
                            style={{ cursor: "pointer" }}>
                            <BsThreeDotsVertical />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="table-pagination">
                  <Pagination
                    count={1000}
                    page={currentPage}
                    onChange={handleChange}
                    shape="rounded"
                    variant="outlined"
                    showFirstButton
                    showLastButton
                  />
                </div>
                {/* Last Button */}
                <div
                  className="gap-2 d-md-flex"
                  style={{ justifyContent: "end" }}>
                  <button className="btn btn-outline-danger" type="button">
                    Delete User
                  </button>
                  <button className="btn btn-outline-primary" type="button">
                    Edit User
                  </button>
                  <Link to={`/studentlist`}>
                    <button className="btn btn-primary" type="button">
                      Back to List
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Studentdetails;
