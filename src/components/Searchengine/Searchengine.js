import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { Pagination } from "@mui/material";
import { Badge, Button } from "react-bootstrap";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { searchengine } from "../../Redux/Loginpages/searchengineSlice";
import { set } from "react-hook-form";

const Searchengine = () => {
  const searchengineState = useSelector((state) => state.searchengine);
  const dispatch = useDispatch();

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const skip = (currentPage - 1) * itemsPerPage;
    var limit = itemsPerPage;
    dispatch(searchengine(limit, skip));
  }, [currentPage, itemsPerPage]);

  const searchengineData = searchengineState?.user?.data ||  [];
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
                      size="lg"
                    >
                      Search Question
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <table className="table v-top">
                        <thead>
                          <tr>
                            <th scope="col">Question Subject</th>
                            <th scope="col">Question</th>
                            <th scope="col">Question Price</th>
                            <th scope="col">status</th>
                            <th scope="col">Question Type</th>
                            <th scope="col">ACTION</th>
                          </tr>
                        </thead>
                        {searchengineData.map((data) => (
                          <tbody>
                            <tr>
                              <td>{data.questionSubject}</td>
                              <td>{data.question}</td>
                              <td>{data.questionPrice}</td>
                              <td>{data.status}</td>
                              <td>{data.questionType}</td>
                              <td>
                                <Link>
                                  <button className="btn btn-primary btn-sm">
                                    click
                                  </button>
                                </Link>
                              </td>

                              {/* <td>
                                    <Link to={`/studentdetails/${data._id}`}>
                                      <button className="btn btn-primary btn-sm">
                                        click
                                      </button>
                                    </Link>
                                  </td> */}
                            </tr>
                          </tbody>
                        ))}
                      </table>
                      <div className="table-pagination">
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          {" "}
                          prev{" "}
                        </button>
                        <button>{currentPage}</button>
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          // disabled={
                          //   currentPage ===
                          //   Math.ceil(Searchengine.length / postsPerPage)
                          // }
                        >
                          {" "}
                          next{" "}
                        </button>

                        {/* <Pagination
                          count={4}
                          page={currentPage}
                          onChange={handleChange}
                          shape="rounded"
                          variant="outlined"
                          showFirstButton
                          showLastButton
                        /> */}
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
