import React, { useState } from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import Moment from "react-moment";

const url = process.env.REACT_APP_API_BASE_URL;

const Fillups = () => {
  const location = useLocation();
  const answerData = JSON.parse(location.state.data.allQuestions.answer);
  console.log(location.state.data.allQuestions);
  const { register, handleSubmit } = useForm({});
  const [data, setData] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(answerData);

  const handleRemoveField = (id) => {
    const updatedAnswer = editedAnswer.filter((_, index) => index !== id);
    setEditedAnswer(updatedAnswer);
  };

  const handleAddField = () => {
    const updatedAnswer = [...editedAnswer, ""];
    setEditedAnswer(updatedAnswer);
  };

  const onSubmit = async (data) => {
    const { answer, question, explanation } = data;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${url}/admin/updatetutorquestionanswer`,
        {
          token: token,
          questionId: location.state.data.allQuestions.questionId,
          question: question,
          answer: JSON.stringify(editedAnswer), // Convert the array to a JSON string
          explanation: explanation,
        }
      );
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
                      defaultValue={location.state.data.allQuestions.question}
                      {...register("question")}
                      disabled={!isEditing}
                    />
                  </div>
                  {/* <div className="col-md-12 col-lg-12 mb--20">
                    <h5>Answer</h5>
                    {Array.isArray(editedAnswer) &&
                      editedAnswer.map((data, id) => (
                        <div key={id} className="mb-2">
                          <span className="mx-3 fw-bolder">{id + 1}) </span>
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
                        </div>
                      ))}
                  </div> */}

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
                <div className="Personal-Settings-button col-lg-6">
                  <Button
                    className="border-edit-btn"
                    size="lg"
                    onClick={() => setEditing(!isEditing)}>
                    {!isEditing && <i className="fa fa-pen" />}
                    {!isEditing ? "Edit" : "Cancel"}
                  </Button>
                  <Button className="btn-success mx-1" type="submit">
                    Update
                  </Button>
                  <Button className="btn-danger mx-1">Delete</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fillups;
