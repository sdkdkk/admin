import React, { useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { useLocation } from "react-router-dom";
import Truefalseque from "../Questionpages/Truefalseque";
import Mcqquestion from "../Questionpages/Mcqquestion";
import Fillups from "../Questionpages/Fillups";
import Matchfollow from "../Questionpages/Matchfollow";
import Questionanswer from "../Questionpages/Questionanswer";
import { Button } from "react-bootstrap";

const Tutorquestiondetails = () => {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({}); //
  const [formData, setFormData] = useState({
    /* initial data */
  });
  const location = useLocation();
  const getresponse = location.state.data.allQuestions;
  console.log(getresponse);
  const handleEdit = () => {
    setEditing(true);
    setEditData(location.state.data.allQuestions); // Set editData with current data
  };
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
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
                                    <Mcqquestion
                                      question={
                                        location.state.data.allQuestions
                                          .question
                                      }
                                    />
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
                                <div className="">
                                  {/* Render the edit/update/delete buttons based on the editing state */}
                                  {editing ? (
                                    <>
                                      <Button className="btn-warning mx-4">
                                        Update
                                      </Button>
                                      <Button onClick={() => setEditing(false)}>
                                        Cancel
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <Button
                                        className="btn-info  mx-4"
                                        onClick={handleEdit}
                                      >
                                        Edit
                                      </Button>
                                      <Button className="btn-danger">
                                        Delete
                                      </Button>
                                    </>
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

export default Tutorquestiondetails;
