import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { useForm } from "react-hook-form";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Pagination } from "@mui/material";

const Tutorsubject = () => {
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

  //table
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers = conversionRate.slice(indexOfFirstPage, indexOfLastPage);
  const totalPages = Math.ceil(conversionRate.length / postsPerPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const fetchData = async () => {
    try {
      setLoading1(true);
      const response = await axios.post(
        `https://vaidik-backend.onrender.com/getquestionsubject`,
        {
          token: token,
        }
      );
      console.log(response.data.data);
      setConversionRate(response.data.data);
      setLoading1(false);
    } catch (error) {
      console.log(error.response.data.error);
      // notify("Invalid refresh token!");
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
        ? `https://vaidik-backend.onrender.com/admin/questionsubject`
        : `https://vaidik-backend.onrender.com/admin/questionsubject`;
      var response;
      if (data._id) {
        response = await axios.post(requestUrl, {
          questionSubject: data.questionSubject,
          id: data._id,
          token: token,
        });
      } else {
        response = await axios.post(requestUrl, {
          questionSubject: data.questionSubject,
          token: token,
        });
      }
      if (response.data.status === 1) {
        notify(response.data.message);
        reset();
        fetchData();
        // setEditCouponId(null);
      }
    } catch (error) {
      notify(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (coupon) => {
    reset(coupon);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  function handleDelet(_id) {
    axios
      .post(
        `https://vaidik-backend.onrender.com/admin/questionsubject/${_id}`,
        {
          token: token,
        }
      )
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
                <h3 className="page-title">Tutor Subject</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6>Subject</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control me-2"
                                id="hoursInput"
                                name="questionSubject"
                                {...register("questionSubject", {
                                  required: true,
                                })}
                              />
                              {errors.questionSubject && (
                                <p className="error text-right text-danger">
                                  Please Enter a Question Subject{" "}
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
                            <Button variant="primary"
                             type="submit"
                             disabled={loading}
                             >
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
                        {loading1 ? (
                          <p style={{ marginLeft: "400px", marginTop: "50px" }}>
                            <ColorRing
                              visible={true}
                              height="80"
                              width="80"
                              ariaLabel="blocks-loading"
                              wrapperStyle={{}}
                              wrapperClass="blocks-wrapper"
                              colors={["black"]}
                            />
                          </p>
                        ) : (
                          <>
                            <Table
                              striped
                              bordered
                              hover
                              responsive
                              className="single-color">
                              <thead>
                                <tr>
                                  <th>Sr. No</th>
                                  <th>Subject Name</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {displayUsers.map((data, index, _id) => (
                                  <tr>
                                    <td>
                                      {index +
                                        1 +
                                        (currentPage - 1) * postsPerPage}
                                    </td>
                                    <td>{data.questionSubject}</td>
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
    </>
  );
};

export default Tutorsubject;
