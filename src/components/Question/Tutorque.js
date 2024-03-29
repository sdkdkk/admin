import React, { useState, useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Tutors/Tutorlist.css";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAdminQuestions } from "../../Redux/Loginpages/getAdminQuestionSlice";
import { Link, useLocation } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const url = process.env.REACT_APP_API_BASE_URL;

const Tutorque = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const getAdminQuestionsState = useSelector(
    (state) => state.getAdminQuestions
  );
  const [queTypeList, setQueTypeList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [questionSubject, setQuestionSubject] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [whomtoAsk, setWhomtoAsk] = useState("tutor");
  const [isOpen, setIsOpen] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { transactions = [] } = getAdminQuestionsState?.data || {};
  const [postsPerPage] = useState(4);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers = transactions?.slice(indexOfFirstPage, indexOfLastPage);
  const totalPages = Math.ceil(transactions.length / postsPerPage);

  const fetchSubjectData = async () => {
    try {
      const response = await axios.post(`${url}/getquestionsubject`, {
        token: token,
      });
      setSubjectList(response?.data?.data);
    } catch (error) {}
  };

  const fetchQueTypeData = async () => {
    try {
      const response = await axios.get(`${url}/getquestiontype`, { token });
      setQueTypeList(response?.data?.data);
    } catch (error) {}
  };

  const getQuestionList = () => {
    setIsLoading(true);
    const payload = {
      questionType,
      questionSubject,
      whomto_ask: whomtoAsk,
      limit: 5,
      skip: (currentPage - 1) * 5,
    };

    dispatch(getAdminQuestions(payload))
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const handleDropdownClick = (id) => {
    setIsOpen(isOpen === id ? "" : id);
  };

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

  useEffect(() => {
    getQuestionList();
  }, [questionSubject, questionType, currentPage, whomtoAsk]);

  useEffect(() => {
    fetchSubjectData();
    fetchQueTypeData();
  }, []);

  return (
    <div>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="oneline">
                <h3 className="main-text">Question </h3>
              </div>
              <div className="page-header">
                <div className="col-md-12">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn btn-light"
                      type="button"
                      onClick={() => setWhomtoAsk("tutor")}
                      style={{ borderRadius: "4px" }}>
                      Tutor
                    </button>
                  </div>
                </div>
              </div>

              <div className="row justify-content-end">
                <div className="col-lg-4">
                  <div className="filter-select rbt-modern-select mb--10">
                    <label>Question Subject :</label>
                    <div className="dropdown react-bootstrap-select w-100">
                      <select
                        onChange={(e) => setQuestionSubject(e.target.value)}
                        className="w-100 form-select"
                        id="displayname">
                        {subjectList.map((a, id) => {
                          return (
                            <option key={id} value={a.questionSubject}>
                              {a.questionSubject}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="filter-select rbt-modern-select mb--10">
                    <label>Question Type :</label>
                    <div className="dropdown react-bootstrap-select w-100">
                      <select
                        onChange={(e) => setQuestionType(e.target.value)}
                        className="w-100 form-select"
                        id="displayname">
                        {queTypeList?.map((a, id) => {
                          return (
                            <option key={id} value={a.questionType}>
                              {a.questionType}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className={`table `}>
                          <thead>
                            <tr>
                              <th scope="col">Sr.No</th>
                              <th scope="col">Question</th>
                              <th scope="col">Question Type</th>
                              <th scope="col">Question Subject</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          {getAdminQuestionsState?.isLoading ? (
                            <tbody>
                              <tr>
                                <td colSpan="6" className="text-center">
                                  <div className="loader-container">
                                    <div className="loader">
                                      <RotatingLines
                                        strokeColor="#d63384"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="50"
                                        visible={true}
                                      />
                                    </div>
                                    <div className="mobile-loader-text"></div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ) : (
                            <tbody>
                              {displayUsers.length === 0 ? (
                                <tr>
                                  <td
                                    colSpan="6"
                                    className="fw-3 fw-bolder text-center">
                                    No Question found
                                  </td>
                                </tr>
                              ) : (
                                displayUsers.map((a, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <p className="question">
                                         {a.question?.length > 40 ? a.question?.slice(0, 40) + "..." : a.question}
                                       
                                      </p>
                                    </td>
                                    <td>{a.questionType}</td>
                                    <td>{a.questionSubject}</td>
                                    <td>
                                      {a.status === "Answered" ? (
                                        <span className="badge text-bg-success badge-status">
                                          {a.status.toLowerCase()}
                                        </span>
                                      ) : a.status === "PENDING" ? (
                                        <span className="badge text-bg-warning badge-status">
                                          {a.status.toLowerCase()}
                                        </span>
                                      ) : (
                                        <span className="badge text-bg-info badge-status">
                                          {a.status.toLowerCase()}
                                        </span>
                                      )}
                                    </td>
                                    <td>
                                      <div className="dropdown">
                                        <button
                                          className="dropdown__button"
                                          onClick={() =>
                                            handleDropdownClick(a._id)
                                          }>
                                          ...
                                        </button>
                                        {a._id === isOpen && (
                                          <div className="dropdown__popup">
                                            <ul className="dropdown__list">
                                              <Link
                                                to={`/questionanswerall/${a._id}`}>
                                                <li>Answer</li>
                                              </Link>
                                            </ul>
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          )}
                        </table>
                      </div>
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
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorque;
