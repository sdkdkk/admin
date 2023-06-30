import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";
import { Pagination } from "@mui/material";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import "../Tutors/Tutorlist.css";
import { useLocation } from "react-router";

const url = process.env.REACT_APP_API_BASE_URL;
const Questiontype = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [conversionRate, setConversionRate] = useState([]);
  const token = localStorage.getItem("token");
  const notify = (data) => toast(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers = conversionRate.slice(indexOfFirstPage, indexOfLastPage);
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
  const totalPages = Math.ceil(conversionRate.length / postsPerPage);

  const fetchData = async () => {
    try {
      setLoading1(true);
      const response = await axios.get(`${url}/getquestiontype`, {
        token: token,
      });
      setConversionRate(response.data.data);
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
        ? `${url}/admin/questiontype`
        : `${url}/admin/questiontype`;
      var response;
      if (data._id) {
        response = await axios.post(requestUrl, {
          questionType: data.questionType,
          id: data._id,
          token: token,
        });
      } else {
        response = await axios.post(requestUrl, {
          questionType: data.questionType,
          token: token,
        });
      }
      reset();
      if (response.data.status === 1) {
        notify(response.data.message);
        reset({
          questionType: "",
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
    reset(coupon);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function handleDelet(_id) {
    axios
      .post(`${url}/admin/questiontype/${_id}`, { token: token })
      .then((response) => {
        fetchData();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  }

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Question Type</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6>Question Type</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control me-2"
                                id="hoursInput"
                                name="questionType"
                                {...register("questionType", {
                                  required: true,
                                })}
                              />
                              {errors.questionType && (
                                <p className="error text-right text-danger">
                                  Please Enter a questionType
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
                              {loading ? "Loading..." : "Add"}
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
                              <th>Question Type</th>
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
                                    No Data Found{" "}
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
                                    <td>{data.questionType}</td>
                                    <td>
                                      <Button
                                        variant="success"
                                        onClick={() => handleUpdate(data)}>
                                        Update
                                      </Button>
                                      <Button
                                        className="mx-2"
                                        variant="danger"
                                        onClick={() => handleDelet(data._id)}>
                                        Delete
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

export default Questiontype;
