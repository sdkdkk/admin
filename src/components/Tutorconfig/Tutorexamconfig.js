import React, { useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tutorexamconfig = () => {
  const {
    register,
    handleSubmit,
    reset,
    formats,
    control,
    modules,
    editorRef,
    formState: { errors },
  } = useForm({});

  const token = localStorage.getItem("token");
  console.log(token);
  const [loading, setLoading] = useState(false);

  const notify = (data) => toast(data);

  const onSubmit = async (data, e) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://vaidik-backend.onrender.com/admin/tutorexamdetail`,
        {
          MCQ: parseInt(data.MCQ),
          theory: parseInt(data.theory),
          token: token,
        }
      );
      if (response.data.status === 1) {
        console.log(response.data.status);
        notify(response.data.message);
        e.target.reset();
      }
    } catch (error) {
      console.log(error.response.data.error);
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
                                  {...register("theory", { required: true })}
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
