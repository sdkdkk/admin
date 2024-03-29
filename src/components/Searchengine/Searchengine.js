import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchengine } from "../../Redux/Loginpages/searchengineSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const Searchengine = () => {
  const searchengineState = useSelector((state) => state.searchengine);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const toComponentB = (data) => {
    navigate("/Searchenginequedetail", { state: { data } });
  };

  const queryParams = new URLSearchParams(location.search);
  const currentPageQueryParam = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(() => {
    return currentPageQueryParam ? parseInt(currentPageQueryParam) : 1;
  });
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    setIsLoading(true);
    const skip = (currentPage - 1) * itemsPerPage;
    var limit = itemsPerPage;
    dispatch(searchengine(limit, skip, 0)).then(() => {
      setIsLoading(false);
    });
  }, [currentPage, itemsPerPage, dispatch]);

  const searchengineData = searchengineState?.user?.data || [];
  const hasNextPage = searchengineData.length === itemsPerPage;
  return (
    <div>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="oneline">
                <h3 className="main-text">Search Engine</h3>
              </div>
              <div className="page-header mt-4">
                <div className="mb-2 mt-2">
                  <Link to="/addnew">
                    <Button variant="primary" size="lg">
                      Add New
                    </Button>
                  </Link>
                  <Link to="/searchquestion">
                    <Button
                      className="search-btn mx-2"
                      variant="secondary"
                      size="lg">
                      Search Question
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <table className="table reponsive">
                        <thead>
                          <tr>
                            <th scope="col">Sr. No</th>
                            <th scope="col">Question</th>
                            <th scope="col">Question Type</th>
                            <th scope="col">Question Subject</th>
                            <th scope="col">Question Price</th>
                            <th scope="col">status</th>
                          </tr>
                        </thead>
                        {isLoading ? (
                          <tbody>
                            <tr>
                              <td colSpan="6" className="text-center">
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
                                  <div className="mobile-loader-text"></div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ) : (
                          <tbody>
                            {searchengineData.map((data, index) => {
                              const serialNumber =
                                (currentPage - 1) * itemsPerPage + index + 1;
                              return (
                                <tr key={index}>
                                  <td>{serialNumber}</td>
                                  <td
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      toComponentB(data);
                                    }}>
                                    <p className="question">
                                      {data.question
                                        .split(" ")
                                        .slice(0, 3)
                                        .join(" ")}
                                    </p>
                                  </td>
                                  <td>{data.questionType}</td>
                                  <td>{data.questionSubject}</td>
                                  <td>{data.questionPrice}</td>
                                  <td>
                                    {data.status === "Answered" ? (
                                      <span className="badge text-bg-success badge-status">
                                        {data.status.toLowerCase()}
                                      </span>
                                    ) : data.status === "PENDING" ? (
                                      <span className="badge text-bg-warning badge-status">
                                        {data.status.toLowerCase()}
                                      </span>
                                    ) : (
                                      <span className="badge text-bg-info badge-status">
                                        {data.status.toLowerCase()}
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        )}
                      </table>

                      <div className="table-pagination">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            if (currentPage > 1) {
                              setCurrentPage(currentPage - 1);
                              navigate(`/Searchengine?page=${currentPage - 1}`);
                            }
                          }}
                          disabled={currentPage === 1}>
                          prev
                        </button>
                        <button className="btn btn-primary mx-2">
                          {currentPage}
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setCurrentPage(currentPage + 1);
                            navigate(`/Searchengine?page=${currentPage + 1}`);
                          }}
                          disabled={!hasNextPage}>
                          next
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
    </div>
  );
};

export default Searchengine;
