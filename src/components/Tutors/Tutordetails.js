import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Tutors/Tutorlist.css";
import "../Css/Tutorlist.css";
// import { FcApproval } from "react-icons/fc";
// import { AiOutlineClose } from "react-icons/ai";
// import { Button } from "react-bootstrap";
// import { tutordetail } from "../../Redux/Loginpages/tutordetailSlice";
// import { Transaction } from "./TutorData";
// import { Posts } from "./TutorData";
import { CgProfile } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { tutordetail } from "../../Redux/Loginpages/tutordetailSlice";
import { ColorRing } from "react-loader-spinner";
import { Button } from "react-bootstrap";

const Tutordetails = () => {
  const tutordetails = useSelector((state) => state.tutordetail);
  console.log(tutordetails);
  const dispatch = useDispatch();
  const { _id } = useParams();

  useEffect(() => {
    dispatch(tutordetail(_id));
  }, [dispatch, _id]);

  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const [transation, setTransation] = useState([]);
  const [tutorpaydetails, setTutorpaydetails] = useState([]);
  const [Loader, setLoader] = useState(true);
  console.log(tutorpaydetails);
  const token = localStorage.getItem("token");
  console.log(data);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://vaidik-backend.onrender.com/admin/tutorquestionanswer/${_id}`,
          {
            token: token,
          }
        );
        const response1 = await axios.post(
          `https://vaidik-backend.onrender.com/admin/transactiondetails/${_id}`,
          {
            token: token,
          }
        );
        const response2 = await axios.post(
          `https://vaidik-backend.onrender.com/admin/tutordetails/${_id}`,
          {
            token: token,
          }
        );
        setData(response.data.message);
        setTransation(response1.data.transaction);
        setTutorpaydetails(response2.data.document);
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
  const displayUsers = data.slice(indexOfFirstPage, indexOfLastPage);
  const totalPages = Math.ceil(data.length / postsPerPage);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const [currentPage1, setCurrentPage1] = useState(1);
  const [postsPerPage1] = useState(6);
  const indexOfLastPage1 = currentPage1 * postsPerPage1;
  const indexOfFirstPage1 = indexOfLastPage1 - postsPerPage1;
  const displaytransation = transation.slice(
    indexOfFirstPage1,
    indexOfLastPage1
  );
  const totalPage= Math.ceil(transation.length / postsPerPage);
  const handleChange1 = (event, value) => {
    setCurrentPage1(value);
  };

  // const ReadMore = ({ children }) => {
  //   const text = children;
  //   const [isReadMore, setIsReadMore] = useState(true);
  //   const toggleReadMore = () => {
  //     setIsReadMore(!isReadMore);
  //   };
  //   return (
  //     <p className="text" style={{ fontSize: "14px" }}>
  //       {isReadMore ? text.slice(0, 60) : text}
  //       <span
  //         onClick={toggleReadMore}
  //         className="read-or-hide"
  //         style={{ color: "blue" }}>
  //         {isReadMore ? " ...read more" : " show less"}
  //       </span>
  //     </p>
  //   );
  // };

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }
    setClicked(index);
  };

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div>
          {Loader ? (
            <div className="loader-end text-center" style={{marginLeft:"500px" ,marginTop:"250px"}}>
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
              {tutorpaydetails.map((data) => {
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
                            <h6>{data.mobileNo}</h6>
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
                    <div className="col-md-3 mobiltutordetails">
                      <div
                        className="details mt-3"
                        style={{
                          display: "inline-block",
                          textAlign: "justify",
                        }}>
                        <h6>Bank Details</h6>
                        <h6 className="bank-text">
                          {data.bankdetails.bankName}
                        </h6>
                        <h6 className="AC-text">
                          A/C No.{data.bankdetails.accountNumber}
                        </h6>
                        <h6 className="IFSC-text">
                          IFSC Code:{data.bankdetails.IFSCCode}{" "}
                        </h6>
                        <h6 className="Branch-text">
                          Branch: {data.bankdetails.Tutorbankname}
                        </h6>
                        <h6 className="Branch-text">
                          bank Country: {data.bankdetails.bankcountry}
                        </h6>
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
                          <span className="badge rounded-pill bg-warning">
                            {data.subjects[0]}
                          </span>
                          <span className="badge rounded-pill bg-primary">
                            {data.subjects[1]}{" "}
                          </span>
                          <span className="badge rounded-pill bg-dark">
                            {data.subjects[2]}
                          </span>
                        </div>
                        <h5 className="bottom mt-4 text-secondary">
                          Total Referral
                        </h5>
                        <span></span>
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
                          <b>Rs.{data.earning}</b>
                        </h6>
                        <h6 className="text-secondary">Paid</h6>
                        <h6 className="text-danger">
                          <b>Rs.{data.paid}</b>
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
                        <>
                          {displaytransation.map((Data, id) => {
                            return (
                              <tr key={id}>
                                <td colSpan="2">
                                  <Moment format="D MMM YYYY" withTitle>
                                    {Data.date}
                                  </Moment>
                                </td>
                                <td colSpan="2">Rs.{Data.amount} </td>
                                <td colSpan="2">Rs.{Data.balance}</td>
                              </tr>
                            );
                          })}
                        </>
                      </tbody>
                    </table>
                    <div className="table-pagination">
                      <Pagination
                        count={totalPage}
                        page={currentPage1}
                        onChange={handleChange1}
                        shape="rounded"
                        variant="outlined"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" text-start heading-main mt-5">
                <h4>Answer Given</h4>
              </div>
              <div className=" table-responsive">
                <table className="table  v-top ">
                  <thead>
                    <tr>
                      <th scope="col">Answer </th>
                      <th scope="col">Tutor Name</th>
                      <th scope="col">EARNING</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                      { displayUsers.map((Data, index) => {
                      return (
                        <tbody key={index}>
                          <tr
                            onClick={() => toggle(index)}
                            className={
                              clicked === index ? "toggle-close" : "bg-white"
                              
                            }
                            style={{cursor:"pointer"}}
                          >
                             <td className="text-success"><b>{Data.allQuestions.question}</b></td>
                            <td>
                              {Data.student}
                              {clicked === index ? (
                                <>
                                  <span className="list-group-item mt-2 ">
                                    <b>question</b>:{Data.allQuestions.question}
                                  </span>
                                  <span className="list-group-item mt-2 ">
                                    <b>answer</b>.{Data.allQuestions.answer}
                                  </span>
                                  <span className="list-group-item mt-2 ">
                                    <b>questionSubject</b> : {Data.allQuestions.questionSubject}
                                  </span>
                                  <span className="list-group-item mt-2 ">
                                    <b>questionType</b> :{Data.allQuestions.questionType}
                                  </span>
                                  <span className="list-group-item mt-2 ">
                                    <b>status</b> :{Data.allQuestions.status}
                                  </span>
                                  <span className="list-group-item mt-2 ">
                                    <b>status</b> :{Data.allQuestions.tutorPrice}
                                  </span>
                                </>
                              ) : null}
                            </td>
                           
                            <td className="text-success"><b>{Data.allQuestions.tutorPrice}</b></td>
                            <td>
                             
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                </table>
                <div className="table-pagination">
                  <Pagination
                   count={totalPages}
                    page={currentPage}
                    onChange={handleChange}
                    shape="rounded"
                    variant="outlined"
                  />
                </div>
                {/* Last Button */}
                <div
                  className="gap-2 d-md-flex"
                  style={{ justifyContent: "end" }}>
                  <button className="btn btn-outline-danger" type="button">
                    Delete User
                  </button>
                  <Link to={`/professionaldetails/${_id}`}>
                  <button className="btn btn-outline-primary" type="button">
                    Edit User
                  </button>
                  </Link>
                  <Link to={`/tutorlist`}>
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

export default Tutordetails;
