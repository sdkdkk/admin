import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Tutors/Tutorlist.css";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import Moment from "react-moment";
import face3 from "../Image/face3.jpg";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const Studentdetails = () => {
  const { _id } = useParams();
  const [studentdetail, setStudentdetail] = useState([]);
  const [studentque, setStudentque] = useState([]);
  const [studenttransation, setStudenttransation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [Loader, setLoader] = useState(true);
  let navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `https://vaidik-backend.onrender.com/api/v1/admin/studentquestionanswer/${_id}`,
        {
          token: token,
        }
      );
      const response1 = await axios.post(
        `https://vaidik-backend.onrender.com/api/v1/admin/studenttransactiondetails/${_id}`,
        {
          token: token,
        }
      );
      const response2 = await axios.post(
        `https://vaidik-backend.onrender.com/api/v1/admin/studentdetails/${_id}`,
        {
          token: token,
        }
      );
      setStudentque(response.data.message);
      setStudenttransation(response1.data.transaction);
      setStudentdetail(response2.data.document);
      setLoader(false);
    } catch (error) {
      logoutIfInvalidToken(error.response)
      if (error.response) {
       
      } else if (error.request) {
        
      } else {
        
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;

  const displayque = studentque.slice(indexOfFirstPage, indexOfLastPage);
  const totalPages = Math.ceil(studentque.length / postsPerPage);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const [clicked, setClicked] = useState(false);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [postsPerPage1] = useState(6);
  const indexOfLastPage1 = currentPage1 * postsPerPage1;
  const indexOfFirstPage1 = indexOfLastPage1 - postsPerPage1;

  const displaytransation = studenttransation.slice(
    indexOfFirstPage1,
    indexOfLastPage1
  );
  const totalPage = Math.ceil(studenttransation.length / postsPerPage);
  const handleChange1 = (event, value) => {
    setCurrentPage1(value);
  };

  const toComponentB = (data) => {
    navigate("/studentquestiondetails", { state: { data } });
  };

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-details" style={{ width: "inherit" }}>
          {Loader ? (
            <div
              className="loader-end text-center"
              style={{ marginTop: "250px" }}>
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
            <div className="second-section text-start mt-4 mx-4">
              {studentdetail.map((data) => {
                return (
                  <>
                    <div className="row" style={{ backgroundColor: "#c0d7ff" }}>
                      <div className="col">
                        <div className="profile">
                          <div className="profile-img mt-2">
                            <img src={face3} alt="" />
                          </div>
                          <div className="profile-info">
                            <h5 className="mt-2">{data.name || ""}</h5>
                            <h6> +91 98989 74747 </h6>
                            <p>{data.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="col Subject text-center">
                        <div className="mt-3">
                          <h5>Total Referral </h5>
                          <div className="badge rounded-pill bg-dark">
                            {data.refferal || ""}
                          </div>
                        </div>
                      </div>
                      <div className="col Earnings text-center">
                        <div className="mt-2">
                          <strong>Earnings</strong>
                        </div>
                        <b>{data.deposit || "_"}</b>
                        <div>
                          <strong>Paid</strong>
                        </div>
                        <h4 className="text-danger">
                          <b> {data.paid || "-"}</b>
                        </h4>
                        <div>
                          <strong>Balance</strong>
                        </div>
                        <h4 className="text-success">
                          <b> $ {data.balance || "-"} </b>
                        </h4>
                      </div>
                    </div>
                  </>
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
                                <td colSpan="2">$ {Data.amount} </td>
                                <td colSpan="2">$ {Data.balance}</td>
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
                <h4>Question Asked</h4>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      {isLoading ? (
                        <div>
                          <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={["black"]}
                          />
                        </div>
                      ) : (
                        <>
                          <table className="table v-top">
                            <thead>
                              <tr>
                                <th scope="col">Question</th>
                                <th scope="col">Question Type</th>
                                <th scope="col">Question Subject</th>
                                <th scope="col">tutor Price</th>
                                <th scope="col">status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {displayque.map((data) => (
                                <tr>
                                  <td
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      toComponentB(data);
                                    }}>
                                    {data.allQuestions.question
                                      .split(" ")
                                      .slice(0, 3)
                                      .join(" ")}
                                    ...
                                  </td>
                                  <td>{data.allQuestions.questionType}</td>
                                  <td>{data.allQuestions.questionSubject}</td>
                                  <td>{data.allQuestions.tutorPrice}</td>
                                  <td>{data.allQuestions.status}</td>
                                </tr>
                              ))}{" "}
                            </tbody>
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
                        </>
                      )}
                    </div>
                  </div>
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
