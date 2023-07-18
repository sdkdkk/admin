import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Pagination } from "@mui/material";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import "../Tutors/Tutorlist.css";
import { useLocation } from "react-router";

const url = process.env.REACT_APP_API_BASE_URL;

const Studentcounter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [studentClass, setStudentClass] = useState([]);
  const token = localStorage.getItem("token");
  const notify = (data) => toast(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers = studentClass.slice(indexOfFirstPage, indexOfLastPage);
  const totalPages = Math.ceil(studentClass.length / postsPerPage);

  const location = useLocation();

  const handleChange = (event, value) => {
    setCurrentPage(value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${searchParams.toString()}`
    );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    const initialPage = pageParam ? parseInt(pageParam) : 1;
    setCurrentPage(initialPage);
  }, [location.search]);

  const fetchData = async () => {
    try {
      setLoading1(true);
      const response = await axios.get(`${url}/getstudentodometer`);
      setStudentClass(response.data.info);
      console.log(response.data.info)
      setLoading1(false);
    } catch (error) {
      logoutIfInvalidToken(error.response);
      setLoading1(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const requestUrl = data._id
        ? `${url}/admin/studentodometer`
        : `${url}/admin/studentodometer`;
      var response;
      if (data) {
        response = await axios.post(requestUrl, {
          student: data.student,
          tutor: data.tutor,
          questionSolved: data.questionSolved,
          token: token,
        });
      } else {
        response = await axios.post(requestUrl, {
          student: data.student,
          tutor: data.tutor,
          questionSolved: data.questionSolved,
          token: token,
        });
      }
      if (response.data.status === 1) {
        notify(response.data.message);
        reset({
          student: "",
          tutor: "",
          questionSolved: "",
        });
        fetchData();
      }
    } catch (error) {
      logoutIfInvalidToken(error.response);
      notify(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (coupon) => {
    setIsEditMode(true);
    reset(coupon);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Student Counter</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6> Student</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control me-2"
                                id="hoursInput"
                                name="student"
                                {...register("student", {
                                  required: true,
                                })}
                              />
                              {errors.student && (
                                <p className="error text-right text-danger">
                                  Please Enter a Student Counter
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6> Tutor</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control me-2"
                                id="hoursInput"
                                name="tutor"
                                {...register("tutor", {
                                  required: true,
                                })}
                              />
                              {errors.tutor && (
                                <p className="error text-right text-danger">
                                  Please Enter a Tutor Counter
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6> Question Solved</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control me-2"
                                id="hoursInput"
                                name="questionSolved"
                                {...register("questionSolved", {
                                  required: true,
                                })}
                              />
                              {errors.questionSolved && (
                                <p className="error text-right text-danger">
                                  Please Enter a Question Solved Counter
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-lg-2 col-md-4">
                            <h6>&nbsp;</h6>
                          </div>
                          <div className="col-lg-4 col-md-8 mb-2 text-md-end">
                            <Button
                              variant="primary"
                              type="submit"
                              disabled={loading}>
                              {isEditMode
                                ? loading
                                  ? "Loading..."
                                  : "Update"
                                : loading
                                ? "Loading..."
                                : "Add"}
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <div className="table-container">
                        <Table
                          striped
                          bordered
                          hover
                          responsive
                          className="single-color">
                          <thead>
                            <tr>
                              <th>Sr. No</th>
                              <th>Student </th>
                              <th>Tutor </th>
                              <th>Question Solved </th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          {loading1 ? (
                            <tbody>
                              <tr>
                                <td colSpan="3" className="text-center">
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
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ) : (
                            <tbody>
                              {displayUsers?.length === 0 ? (
                                <tr>
                                  <td
                                    colSpan="3"
                                    className="fw-2 fw-bolder text-center">
                                    {" "}
                                    No class Found{" "}
                                  </td>
                                </tr>
                              ) : (
                                displayUsers.map((data, index, _id) => (
                                  <tr key={data._id}>
                                    <td>
                                      {index +
                                        1 +
                                        (currentPage - 1) * postsPerPage}
                                    </td>
                                    <td>{data.student}</td>
                                    <td>{data.tutor}</td>
                                    <td>{data.questionSolved}</td>
                                    <td>
                                      <Button
                                        variant="success"
                                        onClick={() => handleUpdate(data)}>
                                        Update
                                      </Button>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          )}
                        </Table>
                        <div className="table-pagination float-end">
                          <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handleChange}
                            shape="rounded"
                            variant="outlined"
                            siblingCount={0}
                          />
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

export default Studentcounter;
