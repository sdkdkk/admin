import React from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";

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
                <span className="text-dark">Question Subject:</span>
                {location.state.data.allQuestions.questionSubject}
              </p>
              <p>
                Question Type:{location.state.data.allQuestions.questionType}
              </p>
              <p>Status:{location.state.data.allQuestions.status}</p>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-12 mb--20">
                <h5>Question</h5>
                <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                  Q 01. {location.state.data.allQuestions.question}?
                  <br />
                  <br />
                </div>
              </div>

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
                          htmlFor="rbt-radio-1">
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
                          htmlFor="rbt-radio-2">
                          False
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Truefalseque;