import React from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { useLocation } from "react-router-dom";
import Truefalseque from "../Questionpages/Truefalseque";
import Mcqquestion from "../Questionpages/Mcqquestion";
import Matchfollow from "../Questionpages/Matchfollow";
import Questionanswer from "../Questionpages/Questionanswer";
import Fillups from "../Questionpages/Fillups";



const Studentquestiondetails = () => {

  const location = useLocation();
  const getresponse = location.state.data.allQuestions;

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="Title">
                <h3 className="text">Question</h3>
              </div>
              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="rbt-dashboard-content bg-color-white rbt-shadow-box rbt-border mb--30 p--20">
                            <div className="content">
                              <div className="row">
                                <div>
                                  {location.state.data.allQuestions
                                    .questionType === "TrueFalse-exp" ||
                                    location.state.data.allQuestions
                                      .questionType === "TrueFalse" ? (
                                    <Truefalseque />
                                  ) : location.state.data.allQuestions
                                    .questionType === "MCQ-exp" ||
                                    location.state.data.allQuestions
                                      .questionType === "MCQ" ? (
                                    <Mcqquestion />
                                  ) : location.state.data.allQuestions
                                    .questionType === "FillInBlanks-exp" ||
                                    location.state.data.allQuestions
                                      .questionType === "FillInBlanks" ? (
                                    <Fillups />
                                  ) : location.state.data.allQuestions
                                    .questionType ===
                                    "MatchTheFollowing-less5" ||
                                    location.state.data.allQuestions
                                      .questionType ===
                                    "MatchTheFollowing-more5" ? (
                                    <Matchfollow />
                                  ) : (
                                    <Questionanswer />
                                  )}
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
            </div>
            <Footer />
          </div>
        </div>
      </div>
      {/* image show modal */}
    </>
  );
};

export default Studentquestiondetails;
