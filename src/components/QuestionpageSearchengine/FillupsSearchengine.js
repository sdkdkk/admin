import React from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";

const FillupsSearchengine = () => {
  const location = useLocation();
  const answerData = JSON.parse(location.state.data.answer);
  console.log(location.state.data.answer);

  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <div>
            <div>
              <h3 className="page-title">Fill In The Blanks Question</h3>
            </div>
            <div className="content mt-2">
              <div className="row">
                <div className="col-md-12 col-lg-12 mb--20 ">
                  <h5>Question</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    Q 01. {location.state.data.question}
                    <br />
                  </div>
                </div>
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Answer</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    {Array.isArray(answerData)
                      ? answerData.map((data, id) => (
                          <p>
                            <span className="mx-3 fw-bolder">{id + 1}) </span>
                            {data}
                          </p>
                        ))
                      : ""}
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

export default FillupsSearchengine;
