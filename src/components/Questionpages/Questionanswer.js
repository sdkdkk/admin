import React, { useState } from "react";
import "./Que.css";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Moment from "react-moment";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const url = process.env.REACT_APP_API_BASE_URL;

const Questionanswer = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [isEditing, setEditing] = useState(false);

  const { register, handleSubmit, control } = useForm({});

  const questionId = location.state.data.allQuestions.questionId;
  const tutorId = location.state._id;
  const active = location.state.active;
  const question = location.state.data.allQuestions.question;
  const answer = location.state.data.allQuestions.answer;

  const handleImageClick = (url) => {
    setShow(true);
    setImageSrc(url);
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      // setLoading1(true);
      const response = await axios.post(
        `${url}/admin/updatetutorquestionanswer`,
        {
          token: token,
          questionId: questionId,
          question: data.question ? data.question : question,
          answer: data.answer ? data.answer : answer,
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
            <div className="text-start">
              <p>
                <span className="text-dark">Question Subject: </span>
                {location.state.data.allQuestions.questionSubject}
              </p>
              <p>
                Question Type: {location.state.data.allQuestions.questionType}
              </p>
              <p>Status: {location.state.data.allQuestions.status}</p>
              {location.state.data.allQuestions.dateOfPosted && (
                <p>
                  Date Of Posted:
                  <Moment format="DD MMM YYYY" withTitle>
                    {location.state.data.allQuestions.dateOfPosted}
                  </Moment>
                </p>
              )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="content mt-3">
                <div className="row">
                  <div className="col-md-12 col-lg-12 mb--20">
                    <h5>Question</h5>
                    <div className="p--20 rbt-border radius-6 w-100 bg-primary-opacity">
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
                  </div>
                  {location.state.data.allQuestions.answer && (
                    <div className="col-md-12 col-lg-12 mb--20">
                      <h5>Answer</h5>
                      <input
                        className="p--20 rbt-border radius-6 w-100 bg-primary-opacity"
                        defaultValue={answer}
                        {...register("answer")}
                        disabled={!isEditing}
                      />
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

export default Questionanswer;
