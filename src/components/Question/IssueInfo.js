import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import Footer from "../shared/Footer";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const url = process.env.REACT_APP_API_BASE_URL;

const IssueInfo = () => {
  const [questionSubject, setQuestionSubject] = useState("");

  const [subjectList, setSubjectList] = useState([]);
  const location = useLocation();
  const { issueData } = location.state;
  const token = localStorage.getItem("token");

  const { register, handleSubmit, reset } = useForm({});

  const onSubmit = async (data) => {
    const issueSubData = {
      token: token,
      questionId: issueData.allQuestions.questionId,
      questionSubject: data.questionSubject,
    };
    try {
      const { data } = await axios.post(
        `${url}/admin/updateissuesubject`,
        issueSubData
      );
      if (data.status === 1) {
        toast.success(data.message);
        reset();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchSubjectData();
  }, []);

  const fetchSubjectData = async () => {
    try {
      const response = await axios.post(`${url}/getquestionsubject`, {
        token: token,
      });
      setSubjectList(response?.data?.data);
    } catch (error) {}
  };

  const adminIssueSolve = async () => {
    const issueSolve = {
      token: token,
      questionId: issueData.allQuestions.questionId,
    };
    try {
      const response = await axios.post(`${url}/admin/issuesolve`, issueSolve);
    } catch (error) {}
  };
  return (
    <>
      <div>
        <div className="container-scroller">
          <Navbar />
          <div className="container-fluid page-body-wrapper">
            <Sidebar />

            <div className="main-panel">
              <div className="content-wrapper">
                <div className="row mt-3">
                  <div className="col- grid-margin stretch-card">
                    <div className="col-lg-6 mx-auto">
                      <div className="card">
                        <div className="card-body my-4 text-center">
                          <h3>Issue Question</h3>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                              <div className="col-md-12 col-lg-12 mb--30 w-100 ">
                                <textarea
                                  id="ckplot"
                                  name="question"
                                  className="form-control"
                                  rows={3}
                                  value={issueData.allQuestions.question}
                                />
                              </div>
                              <div className="col-lg-12">
                                <div className="filter-select rbt-modern-select mb--15">
                                  <div className="dropdown react-bootstrap-select w-100">
                                    <div>
                                      <img
                                        className="my-4"
                                        src={
                                          issueData.allQuestions
                                            .questionPhoto[0]
                                        }
                                        width={600}
                                        alt="img"
                                      />
                                      <br />
                                    </div>
                                  </div>
                                </div>

                                <div className="filter-select rbt-modern-select mb--15">
                                  <div className="dropdown react-bootstrap-select w-100">
                                    <select
                                      defaultValue={
                                        issueData.allQuestions.questionSubject
                                      }
                                      onChange={(e) =>
                                        setQuestionSubject(e.target.value)
                                      }
                                      className="w-100 form-select"
                                      id="displayname"
                                      {...register("questionSubject")}>
                                      {subjectList.map((a) => {
                                        return (
                                          <option
                                            value={a.questionSubject}
                                            key={a.questionSubject}>
                                            {a.questionSubject}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>

                                <div className="filter-select rbt-modern-select mb--15">
                                  <div className="dropdown react-bootstrap-select w-100">
                                    <input
                                      className="form-select mt-2"
                                      value={
                                        issueData.allQuestions.questionType
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="col-lg-8">
                                  <Button
                                    className="btn btn-primary btn-sm w-100 mt-4"
                                    type="submit">
                                    Update Question
                                  </Button>
                                </div>
                                <div className="col-lg-3">
                                  <Button
                                    className="btn btn-primary btn-sm w-100 mt-4"
                                    onClick={() => {
                                      adminIssueSolve();
                                    }}>
                                    OK
                                  </Button>
                                </div>
                                <div className="text-end mt-1">
                                <Link to={`/issuequestion`}>
                                  <Button
                                    className="btn-primary btn-sm "
                                    style={{ width: "70px", height: "40px" }}
                                    type="button">
                                    Back
                                  </Button>
                                </Link>
                                </div>
                              </div>
                            </div>
                          </form>
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
      </div>
    </>
  );
};

export default IssueInfo;
