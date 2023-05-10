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

const Fillups = () => {
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
    const payload = { questionId, answer, explanation: explanation};
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
                <h3 className="page-title">Fill In The Blanks Question</h3>
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
                                </div>
                              </div>
                              <div className="col-md-12 col-lg-12 mb--20">
                                <h5>Answer</h5>
                                <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                  <form
                                    id="multi-field"
                                    role="form"
                                    action="/wohoo"
                                    method="POST"
                                  >
                                    <div className="multi-field-wrapper">
                                      <div className="multi-fields">
                                        <div className="multi-field d-flex mb--10">
                                          <input
                                            onChange={(e) => {
                                              setAnswer(e.target.value);
                                            }}
                                            className="mr--10"
                                            type="text"
                                            name="stuff[]"
                                          />
                                          <button
                                            type="button"
                                            className="remove-field rbt-btn btn-sm btn-border-gradient"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                      <button
                                        type="button"
                                        className="rbt-btn btn-sm add-field mt-2"
                                      >
                                        Add field
                                      </button>
                                    </div>
                                  </form>
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
                                <button
                                  disabled={
                                    postAdminQuestionsState.isLoading || !answer
                                  }
                                  onClick={handlePostAnswer}
                                  class="btn btn-primary"
                                >
                                  Answer
                                </button>
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

export default Fillups;
