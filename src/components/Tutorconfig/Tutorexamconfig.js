import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const url = process.env.REACT_APP_API_BASE_URL;

const Tutorexamconfig = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [conversionRate, setConversionRate] = useState([]);
  const [updatedConversionRate, setUpdatedConversionRate] = useState({});

  const notify = (data) => toast(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading1(true);
        const response = await axios.post(
          `${url}/admin/gettutorexamdetail`,
          {
            token: token,
          }
        );
        await setConversionRate(response.data.data);
        setLoading1(false);
      } catch (error) {
        logoutIfInvalidToken(error.response)
        // notify("Invalid refresh token!");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data, e) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${url}/admin/tutorexamdetail`,
        {
          MCQ: parseInt(data.MCQ),
          theory: parseInt(data.theory),
          token: token,
        }
      );
      if (response.data.status === 1) {
        notify(response.data.message);
        setUpdatedConversionRate({
          MCQ: parseInt(data.MCQ),
          theory: parseInt(data.theory),
        });
      }
    } catch (error) {
      logoutIfInvalidToken(error.response)
      notify(error.response.data.error);
    } finally {
      setLoading(false); // set loading to false when API call is complete
    }
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
                <h3 className="page-title">Tutor Exam Configuration</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      {loading1 ? (
                        <p className="loader-container">
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
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row mt-4">
                              <div className="col-lg-2 col-md-4 mt-2">
                                <h6>MCQ</h6>
                              </div>
                              <div className="col-lg-4 col-md-8 mt-2">
                                <div className="mb-3">
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="mcqHoursInput"
                                      name="MCQ"
                                      defaultValue={
                                        updatedConversionRate.MCQ ||
                                        conversionRate.MCQ
                                      }
                                      placeholder={
                                        updatedConversionRate.MCQ ||
                                        conversionRate.MCQ
                                      }
                                      {...register("MCQ", { required: true })}
                                    />
                                    <span className="input-group-text">
                                      Question
                                    </span>
                                  </div>
                                  {errors.MCQ && (
                                    <p className="error text-right text-danger">
                                      Please Enter a mcq{" "}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <ToastContainer />
                            <div className="row mt-4">
                              <div className="col-lg-2 col-md-4 mt-2">
                                <h6>Theory</h6>
                              </div>
                              <div className="col-lg-4 col-md-8 mt-2">
                                <div className="mb-3">
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="theoryHoursInput"
                                      name="theory"
                                      defaultValue={
                                        updatedConversionRate.theory ||
                                        conversionRate.theory
                                      }
                                      placeholder={
                                        updatedConversionRate.theory ||
                                        conversionRate.theory
                                      }
                                      {...register("theory", {
                                        required: true,
                                      })}
                                    />
                                    <span className="input-group-text">
                                      Question
                                    </span>
                                  </div>
                                  {errors.theory && (
                                    <p className="error text-right text-danger">
                                      Please Enter a theory question
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
                                <button
                                  className="btn btn-primary"
                                  type="submit"
                                  disabled={loading}>
                                  {loading ? "Loading..." : "Update"}
                                </button>
                              </div>
                            </div>
                          </form>
                        </>
                      )}
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

export default Tutorexamconfig;
