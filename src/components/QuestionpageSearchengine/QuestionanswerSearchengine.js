import React from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";

const QuestionanswerSearchengine = () => {
  const location = useLocation();
  return (
    <>
      <div className="container-scroller">
        {/* <Navbar /> */}
        <div className="container-fluid page-body-wrapper">
          {/* <Sidebar /> */}
          <div className="container-fluid">
            <div className="mx-2 text-end">
              <p>
                <span className="text-dark">Question Subject:</span>
                {location.state.data.questionSubject}
              </p>
              <p>
                Question Type:{location.state.data.questionType}
              </p>
              <p>Status:{location.state.data.status}</p>
            </div>
            <div className="content mt-3">
              <div className="row">
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Question</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    Q 01.{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: location.state.data.question,
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Answer</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: location.state.data.answer,
                      }}
                    />
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

export default QuestionanswerSearchengine;
