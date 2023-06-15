import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Button, Table } from "react-bootstrap";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import "../Css/Tutorlist.css";

const url = process.env.REACT_APP_API_BASE_URL;

const IssueQuestion = () => {
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);

  let token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading1(true);
      const response = await axios.post(`${url}/admin/issuequestion`, {
        token: token,
      });
      setData(response.data.message);
      setLoading1(false);
    } catch (error) {
      setLoading1(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers = data?.slice(indexOfFirstPage, indexOfLastPage);
  const totalPages = Math.ceil(data?.length / postsPerPage);
  const handleChange = (event, value) => {
    setCurrentPage(value);
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
                  <div className="col-12 grid-margin stretch-card">
                    <div className="card new-table">
                      <div className="card-body my-4">
                        <h3>Issue Question</h3>
                        <div className="table-container my-4">
                          {loading1 ? (
                            <p className="loader-container">
                             <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="50"
                            visible={true}
                          />
                            </p>
                          ) : (
                            <>
                              <Table
                                striped
                                bordered
                                hover
                                responsive
                                className="single-color"
                              >
                                <thead>
                                  <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Questions</th>
                                    <th scope="col">Question Photo</th>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Type </th>
                                    <th scope="col">Status</th>
                                    <th scope="col">newreason</th>
                                    <th scope="col">Action</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {data.map((item, id) => (
                                    <tr key={id}>
                                      <td>{id + 1}</td>
                                      <td>{item.allQuestions.question}</td>
                                      <td>
                                        <img
                                          src={
                                            item.allQuestions.questionPhoto[0]
                                          }
                                          alt=""
                                        />
                                      </td>
                                      <td>
                                        {item.allQuestions.questionSubject}
                                      </td>
                                      <td>{item.allQuestions.questionType}</td>

                                      <td>{item.allQuestions.status}</td>
                                      <td>{item.newreason}</td>
                                      <td>
                                        <Link
                                          to={`/issueinfo/${id}`}
                                          state={{ issueData: item }}
                                        >
                                          <Button className="btn-info">
                                            View
                                          </Button>
                                        </Link>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                              <div className="table-pagination">
                                <Pagination
                                  count={totalPages}
                                  page={currentPage}
                                  onChange={handleChange}
                                  shape="rounded"
                                  variant="outlined"
                                // showFirstButton
                                />
                              </div>
                            </>
                          )}
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

export default IssueQuestion;
