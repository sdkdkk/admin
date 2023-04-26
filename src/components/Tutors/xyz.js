import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { dashboards } from "../Students/dashboardSlice";
import { pending } from "../Students/dashboardPendingSlice";
import { Open } from "../Students/dashboardOpenSlice";
import { Close } from "../Students/dashboardCloseSlice";

const Dashboard = () => {

  const dashboard = useSelector((state) => state.dashboard);

  const dashboardpending = useSelector((state) => state.dashboardpending);
  const dashboardClose = useSelector((state) => state.dashboardClose);
  const dashboardOpen = useSelector((state) => state.dashboardOpen);
  const dispatch = useDispatch();
  const [currentData, setCurrentData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [status, setStatus] = useState({
    all: [],
    pending: [],
    open: [],
    close: [],
  });
  console.log(status)
  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let tokens = localStorage.getItem("token");
    dispatch(dashboards(tokens));
    dispatch(pending(tokens));
    dispatch(Open(tokens));
    dispatch(Close(tokens));
  }, []);

  useEffect(() => {
    setStatus({
      all: dashboard.user && dashboard.user.info,
      pending: dashboardpending.user && dashboardpending.user.info,
      open: dashboardOpen.user && dashboardOpen.user.info,
      close: dashboardClose.user && dashboardClose.user.info,
    });
    setIsLoading(false);
  }, [dashboard, dashboardpending, dashboardOpen, dashboardClose]);

  //pagination
  useEffect(() => {
    setCurrentData(status[selectedStatus]);
  }, [currentPage, selectedStatus, status]);

  const handleClick = (status) => {
    setSelectedStatus(status);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(status[selectedStatus].length / PAGE_SIZE)) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  //filter Data

  return (
    <>
      <main className="rbt-main-wrapper">
        <div className="blue-title">
          <div className="container">
            <h5 className="color-white pt--20 pb--20 mb--0">
              <i className="feather-user" />{" "}
              <span className="normal-text">Hello,</span> Pratik Chavda
            </h5>
          </div>
        </div>
        <div className="dashboard pt--20">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* Start Dashboard Top  */}
                {/* End Dashboard Top  */}
                <div className="row g-5">
                  <div className="col-lg-3">
                    {/* Start Dashboard Sidebar  */}
                    <div className="sticky-top mb--30">
                      <div className="rbt-default-sidebar rbt-shadow-box rbt-border">
                        <div className="inner">
                          <div className="content-item-content">
                            <div className="rbt-default-sidebar-wrapper">
                              <div className="section-title mb--20">
                                <h6 className="rbt-title-style-2">
                                  <img
                                    src="assets/images/icons/writing_questions.svg"
                                    alt="img"
                                  />{" "}
                                  My Stats
                                </h6>
                              </div>
                              <nav className="mainmenu-nav">
                                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                  <li>
                                    <Link to="#" className="active">
                                      <i className="feather-arrow-right" />
                                      <span onClick={() => handleClick("all")}>
                                        All
                                      </span>
                                    </Link>{" "}
                                    {/* <small className="badge color-body">12</small> */}
                                  </li>
                                  <li>
                                    <Link to="#">
                                      <i className="feather-arrow-right" />
                                      <span
                                        onClick={() => handleClick("pending")}
                                      >
                                        In Progress
                                      </span>
                                    </Link>{" "}
                                    {/* <small className="badge color-body">12</small> */}
                                  </li>
                                  <li>
                                    <Link to="#">
                                      <i className="feather-arrow-right" />
                                      <span onClick={() => handleClick("open")}>
                                        Open Question
                                      </span>
                                    </Link>{" "}
                                    {/* <small className="badge color-body">12</small> */}
                                  </li>
                                  <li>
                                    <Link to="#">
                                      <i className="feather-arrow-right" />
                                      <span
                                        onClick={() => handleClick("close")}
                                      >
                                        Close Question
                                      </span>
                                    </Link>{" "}
                                    {/* <small className="badge color-body">12</small> */}
                                  </li>
                                </ul>
                              </nav>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt--30 mb--30 quote">
                        <div className="bg-color-white pt--20 pr--20 pb--20 pl--20">
                          It is Impossible for a man to learn what he thinks he
                          already knows.
                          <br /> - Vaidik
                        </div>
                      </div>
                    </div>
                    {/* End Dashboard Sidebar  */}
                  </div>
                  <div className="col-lg-9">
                    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box rbt-border mb--30 p--30">
                      <div className="content">
                        <div className="section-title text-center">
                          <h4 className="mb--0">Ask Question from Experts</h4>
                          <p>Ask questions from subject level experts.</p>
                          <Link
                            className="rbt-btn btn-gradient hover-icon-reverse btn-sm"
                            to="#"
                          >
                            <span className="icon-reverse-wrapper">
                              <span className="btn-text">Ask Question</span>
                              <span className="btn-icon">
                                <i className="feather-arrow-right" />
                              </span>
                              <span className="btn-icon">
                                <i className="feather-arrow-right" />
                              </span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box rbt-border mb--30 p--30">
                      <div className="content">
                        <div className="row">
                          <div className="col-lg-8">
                            <div className="section-title">
                              <h4 className="mb--10 text-capitalize">
                                {" "}
                                {selectedStatus} questions
                              </h4>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="filter-select rbt-modern-select mb--10">
                              <label>Question Type :</label>
                              <div className="dropdown react-bootstrap-select w-100">
                                <Form.Select id="displayname" className="w-100">
                                  <option>All</option>
                                  <option value="1">MCQ</option>
                                  <option value="2">Fillups</option>
                                  <option value="3">True / false</option>
                                  <option value="4">Match The Following</option>
                                  <option value="5">Definations</option>
                                </Form.Select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rbt-dashboard-table table-responsive mobile-table-750">
                          <table className="rbt-table table table-borderless">
                            <thead>
                              <tr>
                                <th>Question</th>
                               
                                <th>Type</th> 
                               <th>Subject</th> 
                                <th>Price</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentData != null && currentData.length > 0 ? (
                                currentData
                                  .slice(
                                    (currentPage - 1) * PAGE_SIZE,
                                    currentPage * PAGE_SIZE
                                  )
                                  .map((item) => {
                                    return (
                                      <tr key={item.questionId}>
                                        <td>
                                          <Link
                                            to={`/myquestionanswer/${item.questionId}` }
                                          >
                                            {item.question}
                                          </Link>
                                        </td>
                                        <td>{item.questionType}</td>
                                        <td> {item.questionSubject}</td>
                                        <td>${item.questionPrice}</td>
                                        <td>{item.questionPhoto}</td>
                                        <td>
                                          {" "}
                                          {item.status === "PENDING"
                                            ? "Pending"
                                            : item.status}
                                        </td>
                                      </tr>
                                    );
                                  })
                              ) : (
                                <tr>
                                  <td colSpan="5">
                                    {currentData === null
                                      ? isLoading === false
                                      : "No data available"}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        <div className="col-lg-12">
                          <nav>
                            <ul className="rbt-pagination justify-content-end">
                              <li>
                                <Link
                                  to="#"
                                  aria-label="Previous"
                                  onClick={handlePrevPage}
                                >
                                  <i className="feather-chevron-left" />
                                </Link>
                              </li>
                              <li className="active">
                                <Link to="#">{currentPage}</Link>
                              </li>

                              <li>
                                <Link
                                  to="#"
                                  aria-label="Next"
                                  onClick={handleNextPage}
                                >
                                  <i className="feather-chevron-right" />
                                </Link>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box rbt-border mb--60 p--20">
                      <div className="content">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="section-title">
                              <h5 className="mb--20">
                                Frequently asked questions
                              </h5>
                            </div>
                          </div>
                        </div>

                        <div className="rbt-accordion-style rbt-accordion-04 accordion">
                          <div className="accordion" id="accordionExamplec3">
                            <div className="accordion-item card">
                              <h2
                                className="accordion-header card-header"
                                id="headingThree1"
                              >
                                <button
                                  className="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseThree1"
                                  aria-expanded="true"
                                  aria-controls="collapseThree1"
                                >
                                  Can I change my Q&amp;A subject preference?
                                </button>
                              </h2>
                              <div
                                id="collapseThree1"
                                className="accordion-collapse collapse show"
                                aria-labelledby="headingThree1"
                                data-bs-parent="#accordionExamplec3"
                              >
                                <div className="accordion-body card-body">
                                  You can run Histudy easily. Any School,
                                  University, College can be use this histudy
                                  education template for their educational
                                  purpose. A university can be run their online
                                  leaning management system by histudy education
                                  template.
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item card">
                              <h2
                                className="accordion-header card-header"
                                id="headingThree2"
                              >
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseThree2"
                                  aria-expanded="false"
                                  aria-controls="collapseThree2"
                                >
                                  Who evaluates my answers? whwn do i got a
                                  feedback report?
                                </button>
                              </h2>
                              <div
                                id="collapseThree2"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingThree2"
                                data-bs-parent="#accordionExamplec3"
                              >
                                <div className="accordion-body card-body">
                                  After purchasing the product need you any
                                  support you can be share with us with sending
                                  mail to rainbowit10@gmail.com.
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item card">
                              <h2
                                className="accordion-header card-header"
                                id="headingThree3"
                              >
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseThree3"
                                  aria-expanded="false"
                                  aria-controls="collapseThree3"
                                >
                                  When will I get paid for my answers?
                                </button>
                              </h2>
                              <div
                                id="collapseThree3"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingThree3"
                                data-bs-parent="#accordionExamplec3"
                              >
                                <div className="accordion-body card-body">
                                  Yes, We will get update the Histudy. And you
                                  can get it any time. Next time we will comes
                                  with more feature. You can be get update for
                                  unlimited times. Our dedicated team works for
                                  update.
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item card">
                              <h2
                                className="accordion-header card-header"
                                id="headingThree4"
                              >
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseThree4"
                                  aria-expanded="false"
                                  aria-controls="collapseThree4"
                                >
                                  How many questions can i skip?
                                </button>
                              </h2>
                              <div
                                id="collapseThree4"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingThree4"
                                data-bs-parent="#accordionExamplec3"
                              >
                                <div className="accordion-body card-body">
                                  If you're looking for random paragraphs,
                                  you've come to the right place. When a random
                                  word or a random sentence isn't quite enough,
                                  the next logical step is to find a random
                                  paragraph.
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
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
