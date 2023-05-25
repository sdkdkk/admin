import React from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";

const Truefalseque = () => {
  const location = useLocation();
  const answer = location.state.data.allQuestions.answer;
  const getresponse = location.state.data.allQuestions;
  console.log(getresponse);

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
            <div className="row">
              <div className="col-md-12 col-lg-12 mb--20">
                <h5>Question</h5>
                <input
                  className="p--20 rbt-border radius-6 w-100 bg-primary-opacity"
                  value={location.state.data.allQuestions.question}
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
                          <input
                            type="radio"
                            name="answer"
                            id="true"
                            value="true"
                            checked={answer === "true"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rbt-radio-1"
                          >
                            True
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="rbt-form-check p--10">
                          <input
                            type="radio"
                            name="answer"
                            id="false"
                            value="false"
                            checked={answer === "false"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rbt-radio-2"
                          >
                            False
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Truefalseque;
