import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "./Que.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postAdminQuestions,
  reset,
} from "../../Redux/Loginpages/postAdminQuestionSlice";

const Truefalseque = () => {
  const history = useNavigate();
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const questionId = urlParams.get("id");
  const getAdminQuestionsState = useSelector(
    (state) => state.getAdminQuestions
  );
  const postAdminQuestionsState = useSelector(
    (state) => state.postAdminQuestions
  );
  const { transactions = [] } = getAdminQuestionsState?.data || {};
  const questionDetails = transactions.find((a) => a._id === questionId);
  
  const handlePostAnswer = () => {
    const payload = { questionId, answer, explanation: explanation };
    dispatch(postAdminQuestions(payload));
  };

  useEffect(() => {
    dispatch(reset());
    if (postAdminQuestionsState?.isSuccess) {
      history(`/questions`);
    }
  }, [postAdminQuestionsState?.isSuccess]);

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">True / False Question</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <div className="col-lg-12">
                        <div className="rbt-dashboard-content bg-color-white rbt-shadow-box rbt-border mb--30 p--20">
                          <div className="content">
                            <div className="row">
                              <div className="col-md-12 col-lg-12 mb--20">
                                <h5>Question</h5>
                                <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                  Q 01. {questionDetails?.question}?
                                  <br />
                                  <br />
                                  State : True / False
                                </div>
                              </div>
                              <div className="col-md-12 col-lg-12 mb--20">
                                <h5>Answer</h5>
                                <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="rbt-form-check p--10">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="rbt-radio"
                                          id="rbt-radio-1"
                                          onChange={(e) => {
                                            setAnswer(true);
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="rbt-radio-1"
                                        >
                                          {" "}
                                          True
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
                                          onChange={(e) => {
                                            setAnswer(false);
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="rbt-radio-2"
                                        >
                                          {" "}
                                          False
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {questionDetails?.questionType.includes(
                                "exp"
                              ) && (
                                <div className="col-md-12 col-lg-12 mb--20">
                                  <h5>Explanation</h5>
                                  <textarea
                                    onChange={(e) => {
                                      setExplanation(e.target.value);
                                    }}
                                    style={{ height: 100 }}
                                    className="p--20 rbt-border radius-6 bg-secondary-opacity"
                                  ></textarea>
                                </div>
                              )}
                            </div>
                            <div class="row mt--20 pt--20 border-top">
                              <div class="col-lg-12 col-8 text-end mt-4">
                              <button disabled={postAdminQuestionsState.isLoading || (!answer && answer !== false)} onClick={handlePostAnswer} class="btn btn-primary">Answer</button>
                              </div>
                            </div>
                          </div>
                        </div>
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
    </>
  );
};

export default Truefalseque;
