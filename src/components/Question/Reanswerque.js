import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Button } from "react-bootstrap";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Tutors/Tutorlist.css";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAdminQuestions } from "../../Redux/Loginpages/getAdminQuestionSlice";
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_BASE_URL;

const Reanswerque = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const getAdminQuestionsState = useSelector((state) => state.getAdminQuestions);

  const [subjectList, setSubjectList] = useState([]);
  const [questionSubject, setQuestionSubject] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [whomtoAsk, setWhomtoAsk] = useState("tutor");
  const [isOpen, setIsOpen] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { transactions = [] } = getAdminQuestionsState?.data || {};

  const fetchSubjectData = async () => {
    try {
      const response = await axios.post(`${url}/getquestionsubject`, {
        token: token,
      });
      setSubjectList(response?.data?.data);
    } catch (error) {
      // notify("Invalid refresh token!");
    }
  };

  const getQuestionList = () => {

    const payload = { questionType, questionSubject, whomto_ask: whomtoAsk, limit: 5, skip: (currentPage - 1) * 5, };

    dispatch(getAdminQuestions(payload));
  };

  const handleAnswerClick = (data) => {
    if (
      data.questionType.includes("exp") &&
      !["MCQ-exp", "TrueFalse-exp", "FillInBlanks-exp"].includes(
        data.questionType
      )
    ) {
      history(`/questionanswer?id=${data._id}`);
    } else {
      switch (data.questionType) {
        case "MCQ":
        case "MCQ-exp":
          history(`/mcqquestion?id=${data._id}`);
          return;
        case "TrueFalse":
        case "TrueFalse-exp":
          history(`/truefalse?id=${data._id}`);
          return;
        case "FillInBlanks":
        case "FillInBlanks-exp":
          history(`/fillups?id=${data._id}`);
          return;
        case "MatchTheFollowing-less5":
        case "MatchTheFollowing-more5":
          history(`/matchfollow?id=${data._id}`);
          return;
        default:
          history(`/questionanswer?id=${data._id}`);
          return;
      }
    }
  };

  const handleDropdownClick = (id) => {
    setIsOpen(isOpen === id ? "" : id);
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getQuestionList();
  }, [questionSubject, questionType, currentPage, whomtoAsk]);

  useEffect(() => {
    fetchSubjectData();
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
                      onClick={() => setWhomtoAsk("reanswer")}
                      style={{ borderRadius: "4px" }}>
                      Reanswer
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
                        {subjectList.map((a) => {
                          return (
                            <option value={a.questionSubject}>
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
                        className="w-100 form-select"
                        onChange={(e) => setQuestionType(e.target.value)}
                        id="displayname">
                        <option value="MCQ">MCQ</option>
                        <option value="MCQ-exp">MCQ-exp</option>
                        <option value="TrueFalse">True / False</option>
                        <option value="TrueFalse-exp">True / False-exp</option>
                        <option value="FillInBlanks">Fill In the Blanks</option>
                        <option value="FillInBlanks-exp">
                          Fill In the Blanks-exp
                        </option>
                        <option value="ShortAnswer">Short Answer</option>
                        <option value="MatchTheFollowing-less5">
                          Match The Following-less5
                        </option>
                        <option value="MatchTheFollowing-more5">
                          Match The Following-more5
                        </option>
                        <option value="ProblemSolving">Problem Solving</option>
                        <option value="LongAnswer">Long Answer</option>
                        <option value="Writing">Writing</option>
                        <option value="CaseStudy-more3">CaseStudy-more3</option>
                        <option value="CaseStudy-less3">CaseStudy-less3</option>
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
                        <table
                          className={`table ${getAdminQuestionsState?.isLoading && "table-loading"
                            }`}>
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
                          <tbody>
                            {transactions.map((a, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{a.question}</td>
                                <td>{a.questionType}</td>
                                <td>{a.questionSubject}</td>
                                <td>{a.status}</td>
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
                                          <li
                                            onClick={() =>
                                              handleAnswerClick(a)
                                            }>
                                            Answer
                                          </li>
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="table-pagination">
                        <Pagination
                          page={currentPage}
                          onChange={handleChange}
                          count={4}
                          shape="rounded"
                          variant="outlined"
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

export default Reanswerque;
