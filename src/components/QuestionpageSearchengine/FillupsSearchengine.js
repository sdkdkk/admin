import React from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import Moment from "react-moment";

const FillupsSearchengine = () => {
  const location = useLocation();
  const answerData = location.state.data.answer
    ? JSON.parse(location.state.data.answer)
    : null;
  console.log(location.state.data);

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
            <div className="content mt-2">
              <div className="row">
                <div className="col-md-12 col-lg-12 mb--20 ">
                
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                  <h5>Question:</h5>
                    Q 01.{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: location.state.data.question,
                      }}
                    />
                    <br />
                  </div>
                </div>
                <div className="col-md-12 col-lg-12 mb--20">
                  {Array.isArray(answerData) && (
                    <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                      <h5>Answer:</h5>
                      {answerData.map((data, id) => (
                        <p key={id}>
                          <span className="mx-3 fw-bolder">{id + 1}) </span>
                          {data.value}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                {location.state.data.explanation && (
                  <div className="col-md-12 col-lg-12 mb--20 ">
               
                    <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    <h5>Explanation:</h5>
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
      </div>
    </>
  );
};

export default FillupsSearchengine;
