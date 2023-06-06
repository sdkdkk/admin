import React, { useEffect, useState } from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const url = process.env.REACT_APP_API_BASE_URL;

const Truefalseque = () => {
  const location = useLocation();
  const answer = location.state.data.allQuestions.answer;
  const getresponse = location.state.data.allQuestions;
  console.log(getresponse);
  const { register, handleSubmit, control } = useForm({});
  const [isEditing, setEditing] = useState(false);
  const [data, setData] = useState([]);

  const onSubmit = async (data) => {
    const { answer, question, explanation } = data;
    console.log(data);
    const token = localStorage.getItem("token");
    try {
      // setLoading1(true);
      const response = await axios.post(
        `${url}/admin/updatetutorquestionanswer`,
        {
          token: token,
          questionId: location.state.data.allQuestions.questionId,
          question: question,
          answer: answer, // Include the answer field in the form data
          explanation: explanation,
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

  useEffect(() => {
    const answer = location.state.data.allQuestions.answer;
    setData(answer);
  }, [location]);

  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <div className="container-fluid">
            <div className="text-start">
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
                    defaultValue={location.state.data.allQuestions.question}
                    {...register("question")}
                    disabled={!isEditing}
                  />

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
                                    htmlFor="rbt-radio-1">
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
                                    htmlFor="rbt-radio-2">
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

                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Explanation</h5>
                  <input
                    className="p--20 rbt-border radius-6 w-100 bg-primary-opacity"
                    defaultValue={location.state.data.allQuestions.explanation}
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
    </>
  );
};

export default Truefalseque;
