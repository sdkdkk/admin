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

const url = process.env.REACT_APP_API_BASE_URL;

const Studentreferral = () => {

  const { register, handleSubmit, reset, formState: { errors }, } = useForm({});

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [extrasum, setExtrasum] = useState([]);
  const token = localStorage.getItem("token");
  const notify = (data) => toast(data);

  //table
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers = extrasum.slice(indexOfFirstPage, indexOfLastPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const totalPages = Math.ceil(extrasum.length / postsPerPage);

  const fetchData = async () => {
    try {
      setLoading1(true);
      const response = await axios.post(`${url}/admin/getstudentreferral`, { token: token, });
      setExtrasum(response.data.document);
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
      const requestUrl = data
        ? `${url}/admin/studentreferral`
        : `${url}/admin/studentreferral`;
      var response;
      response = await axios.post(requestUrl, {
        referralpersonalreward: data.referralpersonalreward,
        referralotherreward: data.referralotherreward,
        paymentcondition: data.paymentcondition,
        token: token,
      });
      reset();
      if (response.data.status === 1) {
        notify(response.data.message);
        reset({
          referralpersonalreward: "",
          referralotherreward: "",
          paymentcondition: "",
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

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Student Referral</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                        <div className="row mt-4">
                          <div className="col-lg-3 col-md-4 mt-2">
                            <h6>Personal Reward</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control me-2"
                                id="hoursInput"
                                name="referralpersonalreward"
                                {...register("referralpersonalreward", {
                                  required: true,
                                })}
                              />
                              {errors.referralpersonalreward && (
                                <p className="error text-right text-danger">
                                  Please Enter a referral personal reward
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-3 col-md-4 mt-2">
                            <h6>Other Reward</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control me-2"
                                id="hoursInput"
                                name="referralotherreward"
                                {...register("referralotherreward", {
                                  required: true,
                                })}
                              />
                              {errors.referralotherreward && (
                                <p className="error text-right text-danger">
                                  Please Enter a referralotherreward
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-3 col-md-4 mt-2">
                            <h6>Payment Condition</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control me-2"
                                id="hoursInput"
                                name="paymentcondition"
                                {...register("paymentcondition", {
                                  required: true,
                                })}
                              />
                              {errors.paymentcondition && (
                                <p className="error text-right text-danger">
                                  Please Enter a paymentcondition
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-lg-3 col-md-4">
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
                                  <th>Personal Reward</th>
                                  <th>Other Reward</th>
                                  <th>Payment Condition</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              {loading1 ? (
                          <tbody>
                            <tr>
                              <td colSpan="5" className="text-center">
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
                        ) : <tbody>
                                {displayUsers?.length === 0 ? (
                                <tr>
                                  <td
                                    colSpan="4"
                                    className="fw-3 fw-bolder text-center">
                                    No Referral found
                                  </td>
                                </tr>
                              ) :displayUsers.map((data, index, _id) => (
                                  <tr key={index}>
                                    <td>
                                      {index +
                                        1 +
                                        (currentPage - 1) * postsPerPage}
                                    </td>
                                    <td>{data.referralpersonalreward}</td>
                                    <td>{data.referralotherreward}</td>
                                    <td>{data.paymentcondition}</td>
                                    <td>
                                      <Button
                                        variant="success"
                                        onClick={() => handleUpdate(data)}>
                                        Update
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>}
                            </Table>
                            <div className="table-pagination">
                              <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handleChange}
                                shape="rounded"
                                variant="outlined"                 
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

export default Studentreferral;
