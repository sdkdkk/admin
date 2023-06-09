import React from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";
import DOMPurify from 'dompurify';

const TruefalsequeSearchengine = () => {
  const location = useLocation();
  const answer = DOMPurify.sanitize(location.state.data.answer, {
    ALLOWED_TAGS: [],
  });
  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <div className="container-fluid">
            <div className="text-start">
              <p>
                <span className="text-dark">Question Subject : </span>
                {location.state.data.questionSubject}
              </p>
              <p>Question Type : {location.state.data.questionType}</p>
              <p>Status : {location.state.data.status}</p>
              {location.state.data.createdAt && (
                <p>
                  Date Of Posted:
                  <Moment format="DD MMM YYYY" withTitle>
                    {location.state.data.createdAt}
                  </Moment>
                </p>
              )}
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-12 mb--20">
                <h5>Question</h5>
                <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                  Q 01.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: location.state.data.question,
                    }}
                  />
                  ?
                </div>
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
              )}
              {location.state.data.explanation && (
                  <div className="col-md-12 col-lg-12 mb--20 ">
                    <h5>Explanation</h5>
                    <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: location.state.data.explanation,
                        }}
                      />
                      <br />
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

export default TruefalsequeSearchengine;
