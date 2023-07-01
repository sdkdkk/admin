import React, { useState } from "react";
import "./Que.css";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Moment from "react-moment";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const url = process.env.REACT_APP_API_BASE_URL;

const Mcqquestion = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const question = location.state.data.allQuestions.question;
  const answer = location.state.data.allQuestions.answer;
  const explanation = location.state.data.allQuestions.explanation;
  const questionId = location.state.data.allQuestions.questionId;

  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const { register, handleSubmit, control } = useForm({});

  const [isEditing, setEditing] = useState(false);

  const tutorId = location.state._id;
  const active = location.state.active;
  const questionType = location.state.data.allQuestions.questionType;

  let token = localStorage.getItem("token");

  const [imageSrc, setImageSrc] = useState("");

  const handleImageClick = (url) => {
    setShow(true);
    setImageSrc(url);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${url}/admin/updatetutorquestionanswer`,
        {
          token: token,
          questionId: location.state.data.allQuestions.questionId,
          question: data.question ? data.question : question,
          answer: data.answer ? data.answer : answer,
          explanation: data.explanation ? data.explanation : explanation,
        }
      );
      setData(response.data);
      toast.success(response.data.message);
      if (response.data.message) {
        navigate(`/tutordetails/${tutorId}/${active}`);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  function handleDeleteClick() {
    axios
      .post(`${url}/admin/deletequestion`, {
        token: token,
        tutorId: tutorId,
        questionId: questionId,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }
  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <div className="container-fluid">
            <div className="text-start">
              <p>
                <span className="text-dark">Question Subject: </span>
                {location.state.data.allQuestions.questionSubject}
              </p>
              <p>
                Question Type: {location.state.data.allQuestions.questionType}
              </p>
              <p>Status: {location.state.data.allQuestions.status}</p>
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
                    <h5>Question</h5>
                    <input
                      className="p--20 rbt-border radius-6 w-100 bg-primary-opacity"
                      defaultValue={question}
                      {...register("question")}
                      disabled={!isEditing}
                    />
                    {location.state.data.allQuestions.questionPhoto.map(
                      (photoUrl) => (
                        <img
                          key={photoUrl}
                          src={photoUrl}
                          style={{
                            width: "50px",
                            height: "50px",
                          }}
                          onClick={() => handleImageClick(photoUrl)}
                          className="profile-img mt-3"
                          alt=""
                        />
                      )
                    )}          
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
                                htmlFor="rbt-radio-1">
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
                                htmlFor="rbt-radio-1">
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
                                htmlFor="rbt-radio-1">
                                D)
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {questionType === "MCQ-exp" ||
                questionType === "TrueFalse-exp" ||
                questionType === "FillInBlanks-exp" ||
                questionType === "ShortAnswer-exp" ? (
                  <div className="col-md-12 col-lg-12 mb--20">
                    <h5>Explanation</h5>
                    <input
                      className="p--20 rbt-border radius-6 w-100 bg-primary-opacity"
                      defaultValue={explanation}
                      {...register("explanation")}
                      disabled={!isEditing}
                    />
                  </div>
                ) : (
                  ""
                )}

                {location.state.data.allQuestions.status === "Answered" ? (
                  <div className="Personal-Settings-button col-lg-6 col-md-12">
                    <div className="d-flex justify-content-center justify-content-lg-start">
                      <Button
                        className="border-edit-btn btn-sm me-lg-3"
                        onClick={() => setEditing(!isEditing)}
                        style={{ width: "100px", height: "40px" }}>
                        {!isEditing && <i className="fa fa-pen" />}
                        {!isEditing ? "Edit" : "Cancel"}
                      </Button>
                      <Button
                        className="btn-success btn-sm me-lg-3 mt-lg-0"
                        type="submit"
                        style={{ width: "100px", height: "40px" }}>
                        Update
                      </Button>
                      <Button
                        className="btn-danger btn-sm  mt-lg-0"
                        onClick={handleDeleteClick}
                        style={{ width: "100px", height: "40px" }}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
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
