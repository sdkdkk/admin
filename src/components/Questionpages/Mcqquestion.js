import React, { useState } from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Moment from "react-moment";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Mcqquestion = () => {
  const location = useLocation();
  console.log(location.state.data.allQuestions.questionId);
  const answer = location.state.data.allQuestions.answer;
  const explation = location.state.data.allQuestions.explanation;
  // Get the answer from location
  console.log(answer);
  const [imageSrc, setImageSrc] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const { register, handleSubmit, control } = useForm({});
  const handleImageClick = (url) => {
    setShow(true);
    setImageSrc(url);
  };
  const [isEditing, setEditing] = useState(false);
  const onSubmit = async (data) => {
    console.log(data);
    const token = localStorage.getItem("token");
    try {
      // setLoading1(true);
      const response = await axios.post(
        `https://vaidik-backend.onrender.com/api/v1/admin/updatetutorquestionanswer`,
        {
          token: token,
          questionId: location.state.data.allQuestions.questionId,
          question: data.question,
          answer: data.answer,
          explanation: data.explanation,
        }
      );
      console.log(response.data);
      setData(response.data);
      toast.success(response.data.message);
      // setLoading1(false);
    } catch (error) {
      // logoutIfInvalidToken(error.response);
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
      // notify("Invalid refresh token!");
      // setLoading1(false);
    }
  };

  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <div className="container-fluid">
            <div className="mx-2 text-start">
              <p>
                <span className="text-dark">Question Subject:</span>
                {location.state.data.allQuestions.questionSubject}
              </p>
              <p>
                Question Type:{location.state.data.allQuestions.questionType}
              </p>
              <p>Status:{location.state.data.allQuestions.status}</p>
              {location.state.data.allQuestions.createdAt && (
                <p>
                  Date Of Posted:
                  <Moment format="DD MMM YYYY" withTitle>
                    {location.state.data.createdAt}
                  </Moment>
                </p>
              )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="content mt-2">
                <div className="row">
                  <div className="col-md-12 col-lg-12 mb--20 ">
                    <input
                      className="p--20 rbt-border radius-6 w-100 bg-primary-opacity"
                      defaultValue={location.state.data.allQuestions.question}
                      {...register("question")}
                      disabled={!isEditing}
                    />

                    {/*<span
                    dangerouslySetInnerHTML={{
                      __html: location.state.data.allQuestions.question,
                    }}
                  />*/}

                    <h5>Question</h5>
                  </div>
                  {answer && (
                    <div className="col-md-12 col-lg-12 mb--20">
                      <h5>Answer</h5>
                      <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="rbt-form-check p--10">
                              <Controller
                                control={control}
                                name="answer"
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    className="form-check-input"
                                    type="radio"
                                    id="rbt-radio-1"
                                    defaultChecked={answer === "a"}
                                    value="a"
                                    disabled={!isEditing}
                                  />
                                )}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rbt-radio-1"
                              >
                                A)
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="rbt-form-check p--10">
                              <Controller
                                control={control}
                                name="answer"
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    className="form-check-input"
                                    type="radio"
                                    id="rbt-radio-2"
                                    defaultChecked={answer === "b"}
                                    value="b"
                                    disabled={!isEditing}
                                  />
                                )}
                              />
                              <label
                                className="form-check-label"
                              // htmlFor="rbt-radio-2"
                              >
                                B)
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="rbt-form-check p--10">
                              <Controller
                                control={control}
                                name="answer"
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    className="form-check-input"
                                    type="radio"
                                    id="rbt-radio-3"
                                    defaultChecked={answer === "c"}
                                    value="c"
                                    disabled={!isEditing}
                                  />
                                )}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rbt-radio-1"
                              >
                                C)
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="rbt-form-check p--10">
                              <Controller
                                control={control}
                                name="answer"
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    className="form-check-input"
                                    type="radio"
                                    id="rbt-radio-4"
                                    defaultChecked={answer === "d"}
                                    value="d"
                                    disabled={!isEditing}
                                  />
                                )}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rbt-radio-1"
                              >
                                D)
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Explanation</h5>
                  <input
                    className="p--20 rbt-border radius-6 w-100 bg-primary-opacity"
                    defaultValue={location.state.data.allQuestions.explanation}
                    {...register("explanation")}
                    disabled={!isEditing}
                  />
                </div>

                <div className="Personal-Settings-button col-lg-6">
                  {/* Render the edit/update/delete buttons based on the editing state */}
                  <Button
                    className="border-edit-btn"
                    size="lg"
                    onClick={() => setEditing(!isEditing)}
                  >
                    {!isEditing && <i className="fa fa-pen" />}
                    {!isEditing ? "Edit" : "Cancel"}
                  </Button>{" "}
                  <Button className="btn-success mx-4" type="submit">
                    Update
                  </Button>
                  <Button className="btn-danger">Delete</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* image show modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="text-center">
          <img
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            src={imageSrc}
            alt="modal-img"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Mcqquestion;
