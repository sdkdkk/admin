import React, { useEffect, useState } from "react";
import "./Que.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Moment from "react-moment";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const url = process.env.REACT_APP_API_BASE_URL;

const Truefalseque = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answer = location.state.data.allQuestions.answer;
  const question = location.state.data.allQuestions.question;
  const questionId = location.state.data.allQuestions.questionId;
  const questionType = location.state.data.allQuestions.questionType;
  const explanation = location.state.data.allQuestions.explanation;
  const tutorId = location.state._id;
  const active = location.state.active;
  const { register, handleSubmit, control } = useForm({});
  const [isEditing, setEditing] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const [imageSrc, setImageSrc] = useState("");
  const [show, setShow] = useState(false);
  
  const handleImageClick = (url) => {
    setShow(true);
    setImageSrc(url);
  };

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await axios.post(
        `${url}/admin/updatetutorquestionanswer`,
        {
          token: token,
          questionId: questionId,
          question: data.question ? data.question : question,
          answer: data.answer ? data.answer : answer, // Include the answer field in the form data
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

  useEffect(() => {
    const answer = location.state.data.allQuestions.answer;
    setData(answer);
  }, [location]);

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
                  {/*<span
                    dangerouslySetInnerHTML={{
                      __html: location.state.data.allQuestions.question,
                    }}
                  />*/}
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
                              defaultValue={answer}
                              render={({ field }) => (
                                <>
                                  <input
                                    type="radio"
                                    {...field}
                                    id="true"
                                    value="true"
                                    disabled={!isEditing}
                                    checked={field.value === "true"} // Set the checked state based on the field value
                                  />
                                  <label
                                    className="form-check-label mx-2"
                                    htmlFor="rbt-radio-1"
                                  >
                                    True
                                  </label>
                                </>
                              )}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="rbt-form-check p--10">
                            <Controller
                              control={control}
                              name="answer"
                              defaultChecked={answer === "true"}
                              render={({ field }) => (
                                <>
                                  <input
                                    type="radio"
                                    {...field}
                                    id="false"
                                    value="false"
                                    disabled={!isEditing}
                                    checked={field.value === "false"} // Set the checked state based on the field value
                                  />
                                  <label
                                    className="form-check-label mx-2"
                                    htmlFor="rbt-radio-2"
                                  >
                                    False
                                  </label>
                                </>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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

export default Truefalseque;
