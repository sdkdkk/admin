import React from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";


const Questionanswer = () => {
  const location = useLocation();
  return (
    <>
      <div className="container-scroller">
        {/* <Navbar /> */}
        <div className="container-fluid page-body-wrapper">
          {/* <Sidebar /> */}
          <div>
            <div>
              <div>
                <h3 className="page-title">Question Answer</h3>
              </div>
              <div className="content mt-3">
                <div className="row">
                  <div className="col-md-12 col-lg-12 mb--20">
                    <h5>Question</h5>
                    <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                      Q 01. {location.state.data.allQuestions.question}?
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12 mb--20">
                    <h5>Answer</h5>
                    <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                      {location.state.data.allQuestions.answer}?
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Questionanswer;
