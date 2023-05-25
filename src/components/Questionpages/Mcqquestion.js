import React, { useState } from "react";
import "./Que.css";
import "../Css/Tutorlist.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import Footer from "../shared/Footer";
import axios from "axios";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import { toast } from "react-toastify";

const Mcqquestion = () => {
  const history = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const notify = (data) => toast(data);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState("");
  const token = useSelector((state) => state.auth.token);
  const getAdminQuestionsState = useSelector(
    (state) => state.getAdminQuestions
  );
  const { transactions = [] } = getAdminQuestionsState?.data || {};
  const questionDetails = transactions?.find((a) => a._id === id) || {};

  const { questionSubject, questionType, status, createdAt, question } =
    questionDetails || {};

  const postAnswer = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://vaidik-backend.onrender.com/api/v1/admin/sendanswer`,
        {
          token: token,
          questionId: id,
          answer: answer,
          explanation: "",
        }
      );
      if (response) {
        notify(response.data.message);
        history(`/questions`);
      }
    } catch (error) {
      logoutIfInvalidToken(error.response);
      // notify("Invalid refresh token!");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="mx-2 text-start">
                <p>
                  <span className="text-dark">Question Subject:</span>
                  {questionSubject}
                </p>
                <p>Question Type:{questionType}</p>
                <p>Status:{status}</p>
                {createdAt && (
                  <p>
                    Date Of Posted:
                    <Moment format="DD MMM YYYY" withTitle>
                      {createdAt}
                    </Moment>
                  </p>
                )}
              </div>
              <div className="content mt-2">
                <div className="row">
                  <div className="col-md-12 col-lg-12 mb--20 ">
                    <h5>Question</h5>
                    <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                      Q 01. {question}
                    </div>

                   
                  </div>
                  {true && (
                    <div className="col-md-12 col-lg-12 mb--20">
                      <h5>Answer</h5>
                      <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="rbt-form-check p--10">
                              <input
                                className="form-check-input "
                                type="radio"
                                name="rbt-radio"
                                id="rbt-radio-1"
                                value="a"
                                onChange={() => setAnswer("a")}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rbt-radio-1"
                              >
                                {" "}
                                A)
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="rbt-form-check p--10">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="rbt-radio"
                                id="rbt-radio-2"
                                value="b"
                                onChange={() => setAnswer("b")}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rbt-radio-2"
                              >
                                {" "}
                                B)
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="rbt-form-check p--10">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="rbt-radio"
                                id="rbt-radio-3"
                                value="c"
                                onChange={() => setAnswer("c")}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rbt-radio-3"
                              >
                                {" "}
                                C)
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="rbt-form-check p--10">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="rbt-radio"
                                id="rbt-radio-4"
                                value="d"
                                onChange={() => setAnswer("d")}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rbt-radio-4"
                              >
                                {" "}
                                D)
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        className="mt-4"
                      >
                        <span></span>
                        <button
                          disabled={loading}
                          type="submit"
                          className="btn btn-primary"
                          onClick={postAnswer}
                        >
                          {loading ? "Posting..." : "Answer"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mcqquestion;
