
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
                                    .questionType === "True False - With Explanation" ||
                                    location.state.data
                                      .questionType === "True False - Final answer" ? (
                                    <TruefalsequeSearchengine />
                                  ) : location.state.data
                                    .questionType === "MCQ - With Explanation" ||
                                    location.state.data
                                      .questionType === "MCQ - Final answer" ? (
                                    <McqquestionSearchengine />
                                  ) : location.state.data
                                    .questionType === "Fill in the blanks - With Explanation" ||
                                    location.state.data
                                      .questionType === "Fill in the blanks - Final answer" ? (
                                    <FillupsSearchengine />
                                  ) : location.state.data
                                    .questionType ===
                                    "Match the following - Till 5 question" ||
                                    location.state.data
                                      .questionType ===
                                    "Match the following - Above 5 question" ? (
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
