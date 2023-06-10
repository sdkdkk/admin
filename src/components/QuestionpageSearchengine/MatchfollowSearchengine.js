import React from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";

const MatchfollowSearchengine = () => {

  const location = useLocation();
  const answerData = JSON.parse(location.state.data.answer);

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <div>
          <div>
            <h3 className="page-title">Match the following Question</h3>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchfollowSearchengine;
