import React, { useState } from "react";
import "./Que.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import Moment from "react-moment";

const url = process.env.REACT_APP_API_BASE_URL;

const Fillups = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answerData = JSON.parse(location.state.data.allQuestions.answer);

  const { register, handleSubmit } = useForm({});
  const [data, setData] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(answerData);
  const questionId = location.state.data.allQuestions.questionId;
  const question = location.state.data.allQuestions.question;
  const explanation = location.state.data.allQuestions.explanation;
  const tutorId = location.state._id;
  const active = location.state.active;
  const questionType = location.state.data.allQuestions.questionType;
  const handleRemoveField = (id) => {
    const updatedAnswer = editedAnswer.filter((_, index) => index !== id);
    setEditedAnswer(updatedAnswer);
  };

  const handleAddField = () => {
    const updatedAnswer = [...editedAnswer, ""];
    setEditedAnswer(updatedAnswer);
  };

  const [imageSrc, setImageSrc] = useState("");
  const [show, setShow] = useState(false);

  const handleImageClick = (url) => {
    setShow(true);
    setImageSrc(url);
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${url}/admin/updatetutorquestionanswer`,
        {
          token: token,
          questionId: questionId,
          question: data.question ? data.question : question,
          answer: data.editedAnswer
            ? data.editedAnswer
            : JSON.stringify(editedAnswer),
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

  let token = localStorage.getItem("token");

  function handleDeleteClick(_id) {
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
            <div className="mx-2 text-start">
              <p>
                <span className="text-dark">Question Subject : </span>
                {location.state.data.allQuestions.questionSubject}
              </p>
              <p>
                Question Type : {location.state.data.allQuestions.questionType}
              </p>
              <p>Status : {location.state.data.allQuestions.status}</p>
              {location.state.data.allQuestions.createdAt && (
                <p>
                  Date Of Posted:
                  <Moment format="DD MMM YYYY" withTitle>
                    {location.state.data.allQuestions.createdAt}
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
                  <div className="multi-field-wrapper">
                    <h5>Answer</h5>
                    <div className="multi-fields">
                      {Array.isArray(editedAnswer) &&
                        editedAnswer.map((data, id, index) => (
                          <div key={id} className="multi-field d-flex mb--10">
                            <input
                              className="p--20 rbt-border radius-6 w-100 bg-primary-opacity"
                              defaultValue={data}
                              name="stuff[]"
                              onChange={(e) => {
                                const updatedAnswers = [...editedAnswer];
                                updatedAnswers[id] = e.target.value;
                                setEditedAnswer(updatedAnswers);
                              }}
                              disabled={!isEditing}
                            />
                            <button
                              type="button"
                              className="remove-field rbt-btn btn-sm btn-border-gradient mt-2 mx-1 "
                              onClick={() => handleRemoveField(id)}>
                              Remove
                            </button>
                          </div>
                        ))}
                    </div>
                    <button
                      type="button"
                      className="rbt-btn btn-sm add-field"
                      onClick={handleAddField}>
                      Add field
                    </button>
                  </div>

                  {questionType === "MCQ-exp" ||
                  questionType === "TrueFalse-exp" ||
                  questionType === "FillInBlanks-exp" ||
                  questionType === "ShortAnswer-exp" ? (
                    <div className="col-md-12 col-lg-12 mb--20">
                      <h5>Explanation</h5>
                      <input
                        className="p--20 rbt-border radius-6 w-100 bg-primary-opacity"
                        defaultValue={
                          location.state.data.allQuestions.explanation
                        }
                        {...register("explanation")}
                        disabled={!isEditing}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>

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

export default Fillups;
