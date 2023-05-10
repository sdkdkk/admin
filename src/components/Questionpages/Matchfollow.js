import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "./Que.css";
import q01 from "../Image/q01.jpg";
import q02 from "../Image/q02.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postAdminQuestions,
  reset,
} from "../../Redux/Loginpages/postAdminQuestionSlice";

const Matchfollow = () => {
  const history = useNavigate();
  const [fields, setFields] = useState([
    {
      value: "",
      id: "",
    },
    {
      id: "",
      value: "",
    },
    {
      id: "",
      value: "",
    },
  ]);
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
    const payload = { questionId, answer : JSON.stringify(fields), explanation: explanation };
    dispatch(postAdminQuestions(payload));
  };

  useEffect(() => {
    dispatch(reset());
    if (postAdminQuestionsState?.isSuccess) {
      history(`/questions`);
    }
  }, [postAdminQuestionsState?.isSuccess]);

  const handleAddField = () => {
    const newFields = [...fields, { value: "", id: "" }];
    setFields(newFields);
  };

  const handleRemoveField = (idToRemove) => {
    const newFields = fields.filter((field) => field.id !== idToRemove);
    setFields(newFields);
  };

  const handleChange = (id, key, value) => {
    let tempField = [...fields];
    tempField[id] = { ...tempField[id], [key]: value };
    setFields(tempField);
  };

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title"> Match the following Question</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div class="card-body">
                      <div class="col-lg-12">
                        <div class="rbt-dashboard-content bg-color-white rbt-shadow-box rbt-border mb--30 p--20">
                          <div class="content">
                            <div class="row">
                              <div class="col-md-12 col-lg-12 mb--20">
                                <h5>Question</h5>
                                <div class="p--20 rbt-border radius-6 bg-primary-opacity">
                                  <img src={questionDetails?.questionPhoto[0]} alt="q01" />
                                </div>
                              </div>
                              <div class="col-md-12 col-lg-12 mb--20 pl-0">
                                <h5>Answer</h5>
                                <div class="p-0 rbt-border radius-6 bg-primary-opacity">
                                  <div class="container">
                                    <div class="row">
                                      <div class="col-md-6 mt-3">
                                        <form
                                          id="multi-field"
                                          role="form"
                                          action="/wohoo"
                                          method="POST"
                                        >
                                           <div className="multi-field-wrapper">
                                    <div className="multi-fields">
                                      {fields.map((field, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="multi-field mb-3 d-flex mb--10 align-items-center"
                                          >
                                            <input
                                              className="mr--10"
                                              type="text"
                                              name={`stuff-${field.id}`}
                                              value={fields[index]["id"]}
                                              onChange={(e) =>
                                                handleChange(
                                                  index,
                                                  "id",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <i className="mr--20 ml--20 feather-arrow-right" />
                                            <input
                                              className="mr--10"
                                              type="text"
                                              name={`stuff-${field.id}`}
                                              value={fields[index]["value"]}
                                              onChange={(e) =>
                                                handleChange(
                                                  index,
                                                  "value",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            {index < 3 ? <span></span> : <button
                                              type="button"
                                              className="remove-field rbt-btn btn-sm btn-border-gradient"
                                              onClick={() =>
                                                handleRemoveField(field.id)
                                              }
                                            >
                                              Remove
                                            </button>}
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <button
                                      type="button"
                                      className="rbt-btn btn-sm add-field"
                                      onClick={handleAddField}
                                    >
                                      Add field
                                    </button>
                                  </div>
                                        </form>
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
                                <button
                                  disabled={
                                    postAdminQuestionsState.isLoading || !fields.some((a) => a.id && a.value)
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

export default Matchfollow;
