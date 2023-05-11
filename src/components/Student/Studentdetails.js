import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Tutors/Tutorlist.css";
import { CgProfile } from "react-icons/cg";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import Moment from "react-moment";

const Studentdetails = () => {
  const { _id } = useParams();
  const [studentdetail, setStudentdetail] = useState([]);
  const [studentque, setStudentque] = useState([]);
  const [studenttransation, setStudenttransation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(studentdetail);
  const token = localStorage.getItem("token");
  const [Loader, setLoader] = useState(true);
  let navigate = useNavigate();

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
  console.log(displayque);

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
        {Loader ? (
          <div
            className="loader-end text-end"
            style={{ marginLeft: "500px", marginTop: "250px" }}>
            {" "}
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
            ) : null}{" "}
          </div>
        ) : (
          <div className="second-section text-center mt-4 mx-4">
            {" "}
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
                          <h6> {data.name} </h6> <h6> {data.email} </h6>
                          <h6> +91 98989 74747 </h6>
                          <address>
                            1355 Market St, Suite 900 San Francisco, CA 94103 P:
                            (123) 456 - 7890
                          </address>
                          <br />
                          <h5> Professional Details </h5> <h6> HDFC Bank </h6>
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
                      <h6> Bank Details </h6>
                      <h6 className="bank-text"> HDFC bank </h6>
                      <h6 className="AC-text"> A / C No .4747474747 </h6>
                      <h6 className="IFSC-text"> IFSC Code: 414141414 </h6>
                      <h6 className="Branch-text"> Branch: Surat </h6>
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
                      <h6> Subject </h6>
                      <div className="gap-2 d-md-flex justify-content-md-end">
                        <span className="badge rounded-pill bg-warning">
                          CHEM
                        </span>
                        <span className="badge rounded-pill bg-primary">
                          Maths
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
                      <h6 className="text-secondary"> Earnings </h6>{" "}
                      <h6 className="text-dark">
                        <b> Rs .500 </b>
                      </h6>
                      <h6 className="text-secondary"> Paid </h6>{" "}
                      <h6 className="text-danger">
                        <b> Rs .200 </b>
                      </h6>
                      <h6 className="text-secondary"> Balance </h6>
                      <h4 className="text-success">
                        <b> Rs. {data.balance} </b>
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="heading-main mt-5 text-start">
              <h4> Transaction History </h4>
            </div>
            <div>
              <div className="table-responsive">
                <div className="rable">
                  <table className="table v-top">
                    <thead>
                      <tr>
                        <th colSpan="2"> Date </th> <th colSpan="2"> Paid </th>
                        <th colSpan="2"> Balance </th>
                      </tr>
                    </thead>
                    <tbody>
                      {displaytransation.map((Data, id) => {
                        return (
                          <tr key={id}>
                            <td colSpan="2">
                              <Moment format="D MMM YYYY" withTitle>
                                {Data.date}
                              </Moment>
                            </td>
                            <td colSpan="2"> Rs. {Data.amount} </td>
                            <td colSpan="2"> Rs. {Data.balance} </td>
                          </tr>
                        );
                      })}
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
              <h4> Answer Given </h4>
            </div>
            <div className="row">
              <div className="col-12 grid-margin stretch-card">
                <div className="card new-table">
                  <div className="card-body">
                    {isLoading ? (
                      <div style={{ marginLeft: "450px", marginTop: "50px" }}>
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
                              <th scope="col">Question Price</th>
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
                                <td>{data.allQuestions.questionPrice}</td>
                                <td>{data.allQuestions.status}</td>
                              </tr>
                            ))}
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
  );
};

export default Studentdetails;
