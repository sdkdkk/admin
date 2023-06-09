import React, { useState } from "react";
import "./Que.css";
import { useLocation, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";

const url = process.env.REACT_APP_API_BASE_URL;

const Matchfollow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answerData = JSON.parse(
    location.state.data.allQuestions.answer.replace(/\\/g, "")
  );
  console.log(answerData);
  const [data, setData] = useState([]);
  const { register, handleSubmit } = useForm({});
  const [isEditing, setEditing] = useState(false);
  const tutorId = location.state._id;
  const active = location.state.active;
  const [editedAnswer, setEditedAnswer] = useState([...answerData]);
  const questionType = location.state.data.allQuestions.questionType;
  const question = location.state.data.allQuestions.question;
  const explanation = location.state.data.allQuestions.explanation;
  const questionId = location.state.data.allQuestions.questionId;
  let token = localStorage.getItem("token");
  const [imageSrc, setImageSrc] = useState("");
  const [show, setShow] = useState(false);

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
          questionId: questionId,
          question: data.question ? data.question : question,
          answer: data.editedAnswer
            ? data.editedAnswer
            : JSON.stringify(editedAnswer), // Convert the answer array to a JSON string
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
            <div className="text-start">
              <p>
                <span className="text-dark">Question Subject:</span>
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
              <div className="content mt-3">
                <div className="row">
                  <div className="col-md-12 col-lg-12 mb--20">
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
                  {isEditing ? (
                    <div className="col-md-12 col-lg-12 mb--20">
                      <h5>Answer</h5>
                      {editedAnswer.map((data, index) => (
                        <div key={index}>
                          <span className="mx-3">{data.id}</span>
                          <input
                            className="p--20 rbt-border radius-6 "
                            value={data.value} // Use the value prop instead of defaultValue
                            onChange={(e) => {
                              const updatedAnswer = [...editedAnswer];
                              updatedAnswer[index].value = e.target.value;
                              setEditedAnswer(updatedAnswer);
                            }}
                          />
                          <input
                            type="hidden"
                            defaultValue={data.id}
                            {...register(`answer.${index}.id`)}
                          />
                        </div>
                      ))}
                      <input
                        type="hidden"
                        defaultValue={editedAnswer.length}
                        {...register("answerLength")}
                      />
                    </div>
                  ) : (
                    <div className="col-md-12 col-lg-12 mb--20">
                      <h5>Answer</h5>
                      <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                        {editedAnswer.map((data, index) => (
                          <div key={index}>
                            <span className="">{data.id}</span>
                            <span>=</span>
                            <span className="">{data.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {location.state.data.allQuestions.status === "Answered" ? (
                <div className="Personal-Settings-button col-lg-6">
                  <Button
                    className="border-edit-btn"
                    size="lg"
                    onClick={() => setEditing(!isEditing)}
                  >
                    {!isEditing && <i className="fa fa-pen" />}
                    {!isEditing ? "Edit" : "Cancel"}
                  </Button>
                  <Button className="btn-success mx-4" type="submit">
                    Update
                  </Button>
                  <Button className="btn-danger" onClick={handleDeleteClick}>
                    Delete
                  </Button>
                </div>
              ) : (
                ""
              )}
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

export default Matchfollow;
