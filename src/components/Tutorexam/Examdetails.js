
 

import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "./Exam.css";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const Examdetails = () => {
  let history = useNavigate();
  const location = useLocation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [examInfo, setExamInfo] = useState({});
 

  useEffect(() =>{
    if(location.state?.data){
      setExamInfo(location.state?.data)
    }
  },[location.state?.data])

  useEffect(() =>{
    if(Object.keys(examInfo).length === 0  && !location.state?.data){
      history("/testexam")
    }
  },[examInfo, location.state?.data])

  
  const handleNext = () => {
    if (currentIndex === examInfo?.theoryQA.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) {
      setCurrentIndex(examInfo?.theoryQA.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  //radio-btn
  const [selectedValue, setSelectedValue] = useState(null);
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="Title">
                <h3 className="text">Test Exam</h3>
              </div>
              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      {Object.keys(examInfo).length !== 0 && <div className="row">
                        <div className="col-lg-4">
                          <h6>{examInfo?.name}</h6>
                          <h6>{examInfo?.mobileNo}</h6>
                          <h6>{examInfo?.email}</h6>
                        </div>
                        <div className="col-lg-4 border-left border-right">
                          <h5>Subject</h5>
                          <h6>{examInfo?.examSubject}</h6>
                        </div>
                        <div className="col-lg-4">
                          <h5>MCQ</h5>
                          <h6>
                            {examInfo?.mcqScore}/
                            {examInfo?.mcqTotal}
                          </h6>
                        </div>
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
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
                                {Object.keys(examInfo).length !== 0 && <div className="col-md-12 col-lg-12 mb--20">
                                  <h5 className="exam-que">Question</h5>
                                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                    {
                                      examInfo?.theoryQA[currentIndex]
                                        .question
                                    }
                                  </div>
                                </div>}
                                <div className="col-md-12 col-lg-12 mb--20">
                                  <h5>Tutor Answer</h5>
                                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                    <div className="row">
                                      {Object.keys(examInfo).length !== 0 && <div className="col-lg-6">
                                        {
                                          examInfo?.theoryQA[
                                            currentIndex
                                          ].tutorAnswer
                                        }
                                      </div>}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-12 mb--20">
                                  <h5>Admin Answer</h5>
                                  {Object.keys(examInfo).length !== 0 && <div className="p--20 rbt-border radius-6 bg-secondary-opacity">
                                    {
                                      examInfo?.theoryQA[currentIndex]
                                        .realAnswer
                                    }
                                  </div>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="rbt-dashboard-content bg-color-white rbt-shadow-box rbt-border mb--30 p--20">
                            <form>
                              <div className="radio-buttons">
                                <label className="true-btn">
                                  <input
                                    className="radio mx-2"
                                    type="radio"
                                    value="true"
                                    checked={selectedValue === "true"}
                                    onChange={(event) =>
                                      setSelectedValue(event.target.value)
                                    }
                                  />
                                  True
                                </label>
                                <label className="true-btn">
                                  <input
                                    className="radio mx-2"
                                    type="radio"
                                    value="false"
                                    checked={selectedValue === "false"}
                                    onChange={(event) =>
                                      setSelectedValue(event.target.value)
                                    }
                                  />
                                  False
                                </label>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="radio-btn">
                            <Link to="#">
                              <button
                                className="btn btn-primary mx-2"
                                onClick={handleBack}>
                                Back
                              </button>
                            </Link>
                            <Link to="#">
                              <button
                                className="btn btn-primary mx-2"
                                onClick={handleNext}>
                                Next
                              </button>
                            </Link>
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

export default Examdetails;
