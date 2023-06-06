import React, { useState } from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Moment from "react-moment";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const url = process.env.REACT_APP_API_BASE_URL;

const Questionanswer = () => {
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const { register, handleSubmit, control } = useForm({});

  const handleImageClick = (url) => {
    setShow(true);
    setImageSrc(url);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const token = localStorage.getItem("token");
    try {
      // setLoading1(true);
      const response = await axios.post(
        `${url}/admin/updatetutorquestionanswer`,
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
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
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
                    <input
                      className="p--20 rbt-border radius-6 w-100 bg-primary-opacity"
                      defaultValue={location.state.data.allQuestions.question}
                      {...register("question")}
                      disabled={!isEditing}
                    />
                    {location.state.data.allQuestions.questionPhoto.map(
                      (photoUrl) => (
                        <img
                          key={photoUrl}
                          src={photoUrl}
                          style={{
                            width: "200px",
                            height: "200px",
                          }}
                          onClick={() => handleImageClick(photoUrl)}
                          className="profile-img mt-3"
                          alt=""
                        />
                      )
                    )}
                  </div>
                  {location.state.data.allQuestions.answer && (
                    <div className="col-md-12 col-lg-12 mb--20">
                      <h5>Answer</h5>
                      <input
                        className="p--20 rbt-border radius-6 w-100 bg-primary-opacity"
                        defaultValue={location.state.data.allQuestions.answer}
                        {...register("answer")}
                        disabled={!isEditing}
                      />
                    </div>
                  )}

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
                </div>
              </div>
              <div className="Personal-Settings-button col-lg-6">
                <Button
                  className="border-edit-btn"
                  size="lg"
                  onClick={() => setEditing(!isEditing)}>
                  {!isEditing && <i className="fa fa-pen" />}
                  {!isEditing ? "Edit" : "Cancel"}
                </Button>{" "}
                <Button className="btn-success mx-4" type="submit">
                  Update
                </Button>
                <Button className="btn-danger">Delete</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* image show modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="text-center">
          {" "}
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
