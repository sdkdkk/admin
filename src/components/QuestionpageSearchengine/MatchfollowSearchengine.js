import React from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";

const MatchfollowSearchengine = () => {
  const location = useLocation();
  const answerData = JSON.parse(location.state.data.answer);

  return (
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
          <div className="content mt-3">
            <div className="row">
              <div className="col-md-12 col-lg-12 mb--20">
                <h5>Question</h5>
                <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                  {location.state.data.question}
                </div>
              </div>

              {answerData && (
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Answer</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    {Array.isArray(answerData)
                      ? answerData.map((data) => (
                          <div key={data.id}>
                            <span className="mx-3">{data.id} </span>
                            <span>=</span>
                            <span className="mx-3">{data.value}</span>
                          </div>
                        ))
                      : ""}
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
    </div>
  );
};

export default MatchfollowSearchengine;
