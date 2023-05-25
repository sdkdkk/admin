import React, { useState } from "react";
import "./Que.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Moment from "react-moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";

const Matchfollow = () => {
  const history = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const notify = (data) => toast(data);
  const errorToast = (data) => toast.error(data);
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState("");
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
  const [imageSrc, setImageSrc] = useState("");
  const [show, setShow] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const getAdminQuestionsState = useSelector(
    (state) => state.getAdminQuestions
  );
  const { transactions = [] } = getAdminQuestionsState?.data || {};
  const questionDetails = transactions?.find((a) => a._id === id) || {};

  const postAnswer = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://vaidik-backend.onrender.com/api/v1/admin/sendanswer`,
        {
          token: token,
          questionId: id,
          answer: JSON.stringify(fields),
          explanation: explanation,
        }
      );
      if (response) {
        notify(response.data.message);
        history(`/questions`);
      }
    } catch (error) {
      logoutIfInvalidToken(error.response);
      errorToast(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddField = () => {
    const newId = fields.length;
    const newFields = [...fields, { value: "", id: "" }];
    setFields(newFields);
  };

  const handleRemoveField = (idToRemove) => {
    const newFields = [...fields].filter((field) => field.id !== idToRemove);
    setFields(newFields);
  };

  const handleChange = (id, key, value) => {
    let tempField = [...fields];
    tempField[id] = { ...tempField[id], [key]: value };
    setFields(tempField);
  };

  const {
    questionSubject,
    questionType,
    status,
    questionPhoto = [],
    createdAt,
    question,
  } = questionDetails || {};

  const answerData = [];
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
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
            <div className="content mt-3">
              <div className="row">
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Question</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    {question}
                  </div>
                </div>

                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Answer</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    <div className="col-lg-6">
                      {/* <div className="multi-field d-flex mb--10 mr--100 mr_sm--80 align-items-center">
                                                                    <input
                                                                        className="mr--10"
                                                                        placeholder="A"
                                                                        type="text"
                                                                        onChange={(e) => handleChange(0, "id", e.target.value
                                                                        )}
                                                                    />
                                                                    <i className="mr--20 ml--20 feather-arrow-right" />
                                                                    <input
                                                                        className="mr--10"
                                                                        placeholder={1}
                                                                        type="text"
                                                                        onChange={(e) => handleChange(0, "value", e.target.value
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="multi-field d-flex mb--10 mr--100 mr_sm--80 align-items-center">
                                                                    <input
                                                                        className="mr--10"
                                                                        placeholder="B"
                                                                        type="text"
                                                                        onChange={(e) => handleChange(1, "id", e.target.value
                                                                        )}
                                                                    />
                                                                    <i className="mr--20 ml--20 feather-arrow-right" />
                                                                    <input
                                                                        className="mr--10"
                                                                        placeholder={2}
                                                                        type="text"
                                                                        onChange={(e) => handleChange(1, "value", e.target.value
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="multi-field d-flex mb--10 mr--100 mr_sm--80 align-items-center">
                                                                    <input
                                                                        className="mr--10"
                                                                        placeholder="C"
                                                                        type="text"
                                                                        onChange={(e) => handleChange(2, "id", e.target.value
                                                                        )}
                                                                    />
                                                                    <i className="mr--20 ml--20 feather-arrow-right" />
                                                                    <input
                                                                        className="mr--10"
                                                                        placeholder={3}
                                                                        type="text"
                                                                        onChange={(e) => handleChange(2, "value", e.target.value
                                                                        )}
                                                                    />
                                                                </div> */}
                      <form
                        id="multi-field"
                        role="form"
                        action="/wohoo"
                        method="POST"
                      >
                        {/* <div className="multi-field-wrapper">
                                                                        <div className="multi-fields">
                                                                            <div className="multi-field d-flex mb--10 align-items-center">
                                                                                <input
                                                                                    className="mr--10"
                                                                                    type="text"
                                                                                    name="stuff[]"
                                                                                />
                                                                                <i className="mr--20 ml--20 feather-arrow-right" />
                                                                                <input
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
                                                                            className="rbt-btn btn-sm add-field"
                                                                        >
                                                                            Add field
                                                                        </button>
                                                                    </div> */}
                        <div className="multi-field-wrapper">
                          <div className="multi-fields">
                            {fields.map((field, index) => {
                              return (
                                <div
                                  key={index}
                                  className="multi-field d-flex mb--10 align-items-center"
                                >
                                  <input
                                    className="mr--10"
                                    type="text"
                                    name={`stuff-${field.id}`}
                                    value={fields[index]["id"]}
                                    onChange={(e) =>
                                      handleChange(index, "id", e.target.value)
                                    }
                                  />
                                  <div
                                    className="feather-arrow-icon"
                                    style={{ margin: "0 20px 0 20px" }}
                                  />
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
                                  {index < 3 ? (
                                    <span></span>
                                  ) : (
                                    <button
                                      type="button"
                                      className="remove-field rbt-btn btn-sm btn-border-gradient"
                                      onClick={() =>
                                        handleRemoveField(field.id)
                                      }
                                    >
                                      Remove
                                    </button>
                                  )}
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
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Explanation</h5>
                  <textarea
                    style={{ width: "100%", minHeight: 80 }}
                    onChange={(e) => {
                      setExplanation(e.target.value);
                    }}
                    className="p--20 rbt-border radius-6 bg-secondary-opacity"
                  ></textarea>
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
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matchfollow;
