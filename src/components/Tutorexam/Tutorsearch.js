import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { getTutorQuestionsListApi } from "../../Redux/Loginpages/getTutorQuestionListSlice";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Tutorsearch = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState("");
  const getTutorQuestionsListData = useSelector(
    (state) => state.getTutorQuestionsList
  );
  const { tutorexamquestion = [] } = getTutorQuestionsListData.data || [];
  const tutorexamquestionData = tutorexamquestion || [];

  const getSearchQuestion = () => {
    const searchQuery = `&search=${searchParams}`;
    const payload = {
      questionSubject: "",
      questionType: "",
      limit: 6,
      skip: (currentPage - 1) * 6,
      searchParams: searchQuery,
    };
    dispatch(getTutorQuestionsListApi(payload));
  };

  useEffect(() => {
    getSearchQuestion();
  }, [currentPage]);

  const isNextButtonDisabled = () => {
    const limit = 6;
    return tutorexamquestionData.length < limit;
  };

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="oneline">
                <h3 className="main-text">Search Engine</h3>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div>
                        <input
                          type="text"
                          placeholder="Please Search question.."
                          onChange={(e) => setSearchParams(e.target.value)}
                        />
                        <button
                          onClick={getSearchQuestion}
                          className=" btn btn-primary mx-4">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table v-top">
                          <thead>
                            <tr>
                              <th scope="col">Question</th>
                              <th scope="col">Question Type</th>
                              <th scope="col">Question Subject</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getTutorQuestionsListData.isLoading ? (
                              <div>
                                <div
                                  style={{
                                    marginLeft: "450px",
                                    marginTop: "50px",
                                  }}>
                                  <div className="loader-container">
                                    <div className="loader">
                                      <RotatingLines
                                        strokeColor="#d63384"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="50"
                                        visible={true}
                                      />
                                    </div>
                                    <div className="mobile-loader-text ml-5 mr-5"></div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <>
                                {tutorexamquestionData.length === 0 ? (
                                  <tr key="no-question">
                                    <td
                                      colSpan="6"
                                      className="fw-3 fw-bolder text-center">
                                      No Question found
                                    </td>
                                  </tr>
                                ) : (
                                  tutorexamquestionData.map((q) => (
                                    <tr key={q.question}>
                                      <td>{q.question}</td>
                                      <td>{q.questionType}</td>
                                      <td>{q.questionSubject}</td>
                                    </tr>
                                  ))
                                )}
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div className="table-pagination">
                        <button
                          onClick={() => setCurrentPage((prev) => prev - 1)}
                          disabled={currentPage === 1}
                          className="btn btn-primary">
                          prev
                        </button>
                        <button className="btn btn-primary mx-2">
                          {currentPage}
                        </button>
                        <button
                          onClick={() => setCurrentPage((prev) => prev + 1)}
                          className="btn btn-primary"
                          disabled={isNextButtonDisabled()}>
                          next
                        </button>
                      </div>
                    </div>
                      <div className="mx-2 mb-4">
                        <Link to="/tutorexam">
                          <button className="btn btn-primary mx-2">
                            Back
                          </button>
                        </Link>
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

export default Tutorsearch;
