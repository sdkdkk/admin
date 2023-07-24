import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Tutors/Tutorlist.css";
import "../Css/Tutorlist.css";
import { Pagination } from "@mui/material";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { tutordetail } from "../../Redux/Loginpages/tutordetailSlice";
import { RotatingLines } from "react-loader-spinner";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import { Button, Form, ToastContainer } from "react-bootstrap";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { BiSearch } from "react-icons/bi";
import { BsCheck2Circle } from "react-icons/bs";
import { useForm } from "react-hook-form";

const url = process.env.REACT_APP_API_BASE_URL;

const Tutordetails = () => {
  const dispatch = useDispatch();
  const { _id, active } = useParams();
  useEffect(() => {
    dispatch(tutordetail(_id));
  }, [dispatch, _id]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [transation, setTransation] = useState([]);
  const [tutorpaydetails, setTutorpaydetails] = useState([]);
  const [Loader, setLoader] = useState(true);
  const { register, handleSubmit, reset } = useForm({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${url}/admin/tutorquestionanswer/${_id}`,
          {
            token: token,
          }
        );
        const response1 = await axios.post(
          `${url}/admin/transactiondetails/${_id}`,
          {
            token: token,
          }
        );
        const response2 = await axios.post(`${url}/admin/tutordetails/${_id}`, {
          token: token,
        });
        setData(response.data.message);
        setTransation(response1.data.transaction);
        setTutorpaydetails(response2.data.document);
        setIsLoading(false);
        setLoader(false);
      } catch (error) {
        logoutIfInvalidToken(error.response);
      }
    };

    fetchData();
  }, []);

  const approveTutors = async () => {
    const tutorsObjData = {
      token: token,
      status: 3,
    };
    try {
      const { data } = await axios.post(
        `${url}/admin/tutorstatus/${_id}`,
        tutorsObjData
      );

      if (data.message) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const rejectTutors = async () => {
    const tutorsObjData = {
      token: token,
      status: 2,
    };
    try {
      const { data } = await axios.post(
        `${url}/admin/tutorstatus/${_id}`,
        tutorsObjData
      );

      if (data.message) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const warningQuestions = async () => {
    const tutorsObjData = {
      token: token,
    };
    try {
      const { data } = await axios.post(
        `${url}/admin/gettutorwarningquestion/${_id}?skip=0&limit=5`,
        tutorsObjData
      );

      if (data.message) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  useEffect(() => {
    warningQuestions();
  }, []);

  //Suspend Api
  const Suspend = async () => {
    try {
      const { data } = await axios.post(`${url}/admin/suspendtutor/${_id}`, {
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
  //Reactive Api
  const Reactive = async () => {
    try {
      const { data } = await axios.post(`${url}/admin/reactivetutor/${_id}`, {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const filteredData = useMemo(() => {
    if (searchQuery.trim() === "") {
      return data;
    } else {
      const query = searchQuery.toLowerCase();
      return data.filter((item) =>
        item.allQuestions.question.toLowerCase().includes(query)
      );
    }
  }, [data, searchQuery]);

  let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers = filteredData.slice(indexOfFirstPage, indexOfLastPage);
  const totalPages = Math.ceil(filteredData.length / postsPerPage);

  const location = useLocation();

  const handleChange = (event, value) => {
    setCurrentPage(value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${searchParams.toString()}`
    );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    const initialPage = pageParam ? parseInt(pageParam) : 1;

    setCurrentPage(initialPage);
  }, [location.search]);

  const [currentPage1, setCurrentPage1] = useState(1);
  const [postsPerPage1] = useState(6);
  const indexOfLastPage1 = currentPage1 * postsPerPage1;
  const indexOfFirstPage1 = indexOfLastPage1 - postsPerPage1;
  const displaytransation = transation.slice(
    indexOfFirstPage1,
    indexOfLastPage1
  );
  const totalPage = Math.ceil(transation.length / postsPerPage);
  const handleChange1 = (event, value) => {
    setCurrentPage1(value);
  };

  const toComponentB = (data) => {
    navigate("/tutorquestiondetails", { state: { data, _id, active } });
  };

  const questionId = displayUsers.map((item) => item.allQuestions.questionId);
  const filterQuestionId = questionId.filter((id) => id);
  const questionIdObject = filterQuestionId[0];

  const onSubmit = async (data) => {
    const priceData = {
      token: token,
      questionId: questionIdObject,
      price: parseInt(data.price),
    };

    try {
      const { data } = await axios.post(
        `${url}/admin/tutordownvotequestionpayment/${_id}`,
        priceData
      );

      if (data.status === 1) {
        toast.success(data.message);
        reset();
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
          <div className="main-details" style={{ width: "inherit" }}>
            {isLoading ? (
              <div
                className="loader-container"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}>
                <RotatingLines
                  strokeColor="#d63384"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="50"
                  visible={true}
                />
              </div>
            ) : (
              <>
                <div className="heading-main mt-5 text-start mx-3">
                  <h4>Tutor Details</h4>
                </div>
                <div className="second-section text-start mt-4 mx-4">
                  {tutorpaydetails.map((data, index) => {
                    return (
                      <div key={index} style={{ backgroundColor: "#c0d7ff" }}>
                        <div
                          className="row"
                          style={{ backgroundColor: "#c0d7ff" }}>
                          <div className="col ">
                            <div className="profile">
                              <div className="profile-img mt-2">
                                <img src={data.profilephoto} alt=" " />
                              </div>
                              <div className="profile-info">
                                <h6 className="">{data.name}</h6>
                                <p>{data.mobileNo}</p>
                                <p>{data.email}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col bankdetails ">
                            <h5 className="mt-2">Bank Details</h5>
                            <div>
                              <strong>Bank Name:</strong>
                              {data.bankdetails?.bankName || ""}
                            </div>
                            <div>
                              <strong>Acc.Number:</strong>
                              {data.bankdetails?.accountNumber || ""}
                            </div>
                            <div>
                              <strong>IFSC Code:</strong>
                              {data.bankdetails?.IFSCCode || ""}
                            </div>
                            <div>
                              <strong>Branch:</strong>
                              {data.bankdetails?.Tutorbankname || ""}
                            </div>
                            <div>
                              <strong>Bank Country:</strong>
                              {data.bankdetails?.bankcountry || ""}
                            </div>
                            <div className="">
                              {active === "1" || active === "2" ? (
                                <Button
                                  className="rbt-btn btn-gradient btn-sm my-3 "
                                  data-bs-toggle="modal"
                                  data-bs-target="#pay-now">
                                  Pay Now
                                </Button>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="col Subject">
                            <h5 className="mt-2">Subject </h5>
                            <div className="badge rounded-pill bg-warning">
                              {data.subjects?.[0]}
                            </div>
                            <div className="badge rounded-pill bg-primary mx-2">
                              {data.subjects?.[1]}
                            </div>
                            <div className="mt-3">
                              <h5>Total Referral </h5>
                              <div className="badge rounded-pill bg-dark">
                                {data.subjects?.[2]}
                              </div>
                            </div>
                          </div>
                          <div className="col Earnings">
                            <div className="mt-2">
                              <strong>Earnings</strong>
                            </div>
                            <div>Rs.{data.earning}</div>
                            <div>
                              <strong>Paid</strong>
                            </div>
                            <h4 className="text-danger">
                              <strong>Rs.{data.paid}</strong>
                            </h4>
                            <div>
                              <strong>Balance</strong>
                            </div>
                            <h4 className="text-success">
                              <strong>Rs.{data.balance}</strong>
                            </h4>
                          </div>
                          {active === "3" ? (
                            <div className=" text-center">
                              <hr />
                              <Button
                                className="btn-success my-4 mx-3"
                                onClick={() => approveTutors()}>
                                <AiOutlineCheck /> Approve
                              </Button>
                              <Button
                                className="btn-danger"
                                onClick={() => rejectTutors()}>
                                <AiOutlineClose /> Rejected
                              </Button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
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
                        <div className="table-pagination float-end">
                          <Pagination
                            count={totalPage}
                            page={currentPage1}
                            onChange={handleChange1}
                            shape="rounded"
                            variant="outlined"
                            siblingCount={0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" text-start heading-main mt-5">
                    <h4>Answer Given</h4>
                  </div>
                  <div className="row">
                    <div className=" col-12 grid-margin stretch-card">
                      <div className="card">
                        <div className="card-body">
                          <div className="row ">
                            <div className="col-md-12">
                              <Form className="d-flex">
                                <Form.Control
                                  type="search"
                                  id="fname"
                                  className="form-control "
                                  placeholder="Search Questions"
                                  aria-label="Search"
                                  name="fname"
                                  value={searchQuery}
                                  onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                  }
                                />
                                <div className="search-icon">
                                  <BiSearch className="" />
                                </div>
                              </Form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 grid-margin stretch-card">
                      <div className="card new-table">
                        <div className="card-body">
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
                              {displayUsers.length === 0 ? (
                                <tr>
                                  <td colSpan="5" className="text-center">
                                    No matching questions found.
                                  </td>
                                </tr>
                              ) : (
                                displayUsers.map((data, id) => (
                                  <tr key={id}>
                                    <td
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        toComponentB(data);
                                      }}>
                                      <p className="question">
                                        {data.allQuestions.question
                                          .split(" ")
                                          .slice(0, 3)
                                          .join(" ")}
                                        ...
                                      </p>
                                    </td>
                                    <td>{data.allQuestions.questionType}</td>
                                    <td>{data.allQuestions.questionSubject}</td>
                                    <td>{data.allQuestions.tutorPrice}</td>
                                    <td>
                                      {data.allQuestions.status ===
                                      "Answered" ? (
                                        <span className="badge text-bg-success badge-status">
                                          {data.allQuestions.status.toLowerCase()}
                                        </span>
                                      ) : data.allQuestions.status ===
                                        "PENDING" ? (
                                        <span className="badge text-bg-warning badge-status">
                                          {data.allQuestions.status.toLowerCase()}
                                        </span>
                                      ) : (
                                        <span className="badge text-bg-info badge-status">
                                          {data.allQuestions.status.toLowerCase()}
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                          <div className="table-pagination float-end">
                            <Pagination
                              count={totalPages}
                              page={currentPage}
                              onChange={handleChange}
                              shape="rounded"
                              variant="outlined"
                              siblingCount={0}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {active === "2" ? (
                    <>
                      <div className=" text-start heading-main mt-5">
                        <h4>Warning Questions</h4>
                      </div>
                      <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                          <div className="card new-table">
                            <div className="card-body">
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
                                  {displayUsers.map((data, id) => (
                                    <tr key={id}>
                                      <td
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          toComponentB(data);
                                        }}>
                                        {data.allQuestions.question
                                          .split(" ")
                                          .slice(0, 3)
                                          .join(" ")}
                                      </td>
                                      <td>{data.allQuestions.questionType}</td>
                                      <td>
                                        {data.allQuestions.questionSubject}
                                      </td>
                                      <td>{data.allQuestions.tutorPrice}</td>
                                      <td>{data.allQuestions.status}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div className="table-pagination float-end my-4">
                                <Pagination
                                  count={totalPages}
                                  page={currentPage}
                                  onChange={handleChange}
                                  shape="rounded"
                                  variant="outlined"
                                  siblingCount={0}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <div
                    className="gap-2 d-md-flex "
                    style={{ justifyContent: "end" }}>
                    {active === "5" || active === "4" ? (
                      <Link to="/tutorlist">
                        <button
                          className="btn btn-outline-primary my-2"
                          type="button"
                          onClick={Reactive}>
                          Reactive
                        </button>
                      </Link>
                    ) : (
                      ""
                    )}
                    {active === "2" ? (
                      <Link to="/tutorlist">
                        <button
                          className="btn btn-outline-primary my-2"
                          type="button"
                          onClick={Suspend}>
                          Suspend
                        </button>
                      </Link>
                    ) : (
                      ""
                    )}
                     <div
                    className="gap-2 d-md-flex "
                    style={{ justifyContent: "end" }}>
                    { active === "4" ? (
                      <Link to="/tutorlist">
                        <button
                          className="btn btn-outline-primary my-2"
                          type="button"
                          onClick={Reactive}>
                          Verify
                        </button>
                      </Link>
                    ) : (
                      ""
                    )}
                    <Link to={`/professionaldetails/${_id}`}>
                      <button
                        className="btn btn-outline-primary mx-1  my-2"
                        type="button">
                        Edit User
                      </button>
                    </Link>
                    <Link to={`/tutorlist`}>
                      <button
                        className="btn btn-primary mx-1 my-2"
                        type="button">
                        Back to List
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />

      {/* modal */}
      <div
        className="modal fade"
        id="pay-now"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="pay-now"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="text-center">
                <h1 className="mt-0 mb-3 fw-2 text-success">
                  <BsCheck2Circle className="" />
                </h1>

                <h4 className="mt--20 mb--20">Pay For Tutor's</h4>
                <p>This payment is only for downvoting tutors.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="my-2 mb-4">
                    <label className="mr-3">Amount: </label>
                    <input type="number" required {...register("price")} />
                  </div>

                  <div className="d-flex justify-content-center">
                    <Button
                      className="rbt-btn btn-sm mr--10 mr_sm--0 mb_sm--10"
                      type="submit">
                      YES
                    </Button>
                    <Button
                      className="rbt-btn btn-gradient hover-icon-reverse btn-sm"
                      data-bs-dismiss="modal">
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">NO</span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right" />
                        </span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right" />
                        </span>
                      </span>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tutordetails;
