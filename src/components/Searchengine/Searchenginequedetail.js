
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "./Searchengine.css";
import { useLocation } from "react-router-dom";
import FillupsSearchengine from "../QuestionpageSearchengine/FillupsSearchengine";
import MatchfollowSearchengine from "../QuestionpageSearchengine/MatchfollowSearchengine";
import McqquestionSearchengine from "../QuestionpageSearchengine/McqquestionSearchengine";
import QuestionanswerSearchengine from "../QuestionpageSearchengine/QuestionanswerSearchengine";
import TruefalsequeSearchengine from "../QuestionpageSearchengine/TruefalsequeSearchengine";

const Searchenginequedetail = () => {
  const location = useLocation();
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
                                  {location.state.data
                                    .questionType === "TrueFalse-exp" ||
                                    location.state.data
                                      .questionType === "TrueFalse" ? (
                                    <TruefalsequeSearchengine />
                                  ) : location.state.data
                                    .questionType === "MCQ-exp" ||
                                    location.state.data
                                      .questionType === "MCQ" ? (
                                    <McqquestionSearchengine />
                                  ) : location.state.data
                                    .questionType === "FillInBlanks-exp" ||
                                    location.state.data
                                      .questionType === "FillInBlanks" ? (
                                    <FillupsSearchengine />
                                  ) : location.state.data
                                    .questionType ===
                                    "MatchTheFollowing-less5" ||
                                    location.state.data
                                      .questionType ===
                                    "MatchTheFollowing-more5" ? (
                                    <MatchfollowSearchengine />
                                  ) : (
                                    <QuestionanswerSearchengine />
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
    </>
  );
};

export default Searchenginequedetail;
