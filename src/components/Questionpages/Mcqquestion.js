import React from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";

const Mcqquestion = () => {
  const location = useLocation();
  console.log(location.state.data.allQuestions.answer);
  const answer = location.state.data.allQuestions.answer; // Get the answer from location

  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <div>
            <div>
              <h3 className="page-title">MCQ Question</h3>
            </div>
            <div className="content mt-2">
              <div className="row">
                <div className="col-md-12 col-lg-12 mb--20 ">
                  <h5>Question</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    Q 01. {location.state.data.allQuestions.question}?
                  </div>
                </div>
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Answer</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="rbt-form-check p--10">
                          <input
                            className="form-check-input "
                            type="radio"
                            name="rbt-radio"
                            id="rbt-radio-1"
                            value="a"
                            checked={answer === "a"} // Set the checked state based on the answer
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rbt-radio-1">
                            {" "}
                            A)
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="rbt-form-check p--10">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="rbt-radio"
                            id="rbt-radio-2"
                            value="b"
                            checked={answer === "b"} // Set the checked state based on the answer
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rbt-radio-2">
                            {" "}
                            B)
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="rbt-form-check p--10">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="rbt-radio"
                            id="rbt-radio-3"
                            value="c"
                            checked={answer === "c"} // Set the checked state based on the answer
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rbt-radio-3">
                            {" "}
                            C)
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="rbt-form-check p--10">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="rbt-radio"
                            id="rbt-radio-4"
                            value="d"
                            checked={answer === "d"} // Set the checked state based on the answer
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rbt-radio-4">
                            {" "}
                            D)
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
      </div>
    </>
  );
};

export default Mcqquestion;
