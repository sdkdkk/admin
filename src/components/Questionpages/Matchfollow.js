import React from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";

const Matchfollow = () => {
  const location = useLocation();
  const answerData = JSON.parse(location.state.data.allQuestions.answer);
  console.log(location.state.data.allQuestions);
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <div className="container-fluid">
          <div className="mx-2 text-start">
            <p>
              <span className="text-dark">Question Subject:</span>
              {location.state.data.allQuestions.questionSubject}
            </p>
            <p>Question Type:{location.state.data.allQuestions.questionType}</p>
            <p>Status:{location.state.data.allQuestions.status}</p>
            {location.state.data.allQuestions.dateOfPosted && (
              <p>
                Date Of Posted:
                <Moment format="DD MMM YYYY" withTitle>
                  {location.state.data.allQuestions.dateOfPosted}
                </Moment>
              </p>
            )}
          </div>
          <div className="content mt-3">
            <div className="row">
              <div className="col-md-12 col-lg-12 mb--20">
                <h5>Question</h5>
                <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                  {location.state.data.allQuestions.question}
                </div>
              </div>

              <div className="col-md-12 col-lg-12 mb--20">
                <h5>Answer</h5>
                <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                  {console.log(answerData)}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matchfollow;
