import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { getTutorQuestionsListApi } from "../../Redux/Loginpages/getTutorQuestionListSlice";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";

const Tutorsearch = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState("");
  const getTutorQuestionsListData = useSelector(
    (state) => state.getTutorQuestionsList
  );

  const { tutorexamquestion = [] } = getTutorQuestionsListData.data || [];
  const tutorexamquestionData = tutorexamquestion || [];

  const getSearchQuestion = () =>{
    const searchQuery = `&search=${searchParams}`
    const payload = {
      questionSubject : "",
      questionType : "",
      limit: 6,
      skip: (currentPage - 1) * 6,
      searchParams : searchQuery
    };
    dispatch(getTutorQuestionsListApi(payload));
  }

  useEffect(() =>{
    getSearchQuestion()
  },[currentPage])

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
                        {/* <ul>
                          {searchResults &&
                            searchResults.map((result) => (
                              <li key={result._id}>{result.question}</li>
                            ))}
                        </ul> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">

                      <div class="table-responsive">
                        <table class="table v-top">
                          <thead>
                            <tr>
                              <th scope="col">Question</th>
                              <th scope="col">Question Type</th>
                              <th scope="col">Question Subject</th>
                            </tr>
                          </thead>
                          <tbody>
                          {getTutorQuestionsListData.isLoading ? <div><div style={{ marginLeft: "450px", marginTop: "50px" }}>
                          <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={["black"]}
                          />
                        </div></div> : <>
                            {tutorexamquestionData.map((q) =>(<tr>
                              <td>{q.question}</td>
                              <td>{q.questionType}</td>
                              <td>{q.questionSubject}</td>
                            </tr>))}
                            </> }
                            
                          </tbody>
                        </table>
                      </div>

                      <div className="table-pagination">
                        <button
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        disabled={currentPage === 1}
                          className="btn btn-primary">
                          {" "}
                          prev{" "}
                        </button>
                        <button className="btn btn-primary mx-2">
                        </button>
                        <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                          className="btn btn-primary">
                          {" "}
                          next{" "}
                        </button>
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
  )

}

export default Tutorsearch;