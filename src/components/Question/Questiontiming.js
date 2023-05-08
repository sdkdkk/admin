import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { questiontypeApi } from "../../Redux/Loginpages/questiontypeSlice";
import { questiontimingApi } from "../../Redux/Loginpages/questionTimingSlice";

const Questiontiming = () => {
  const dispatch = useDispatch();
  const questiontype = useSelector((state) => state.questiontype);
  console.log(questiontype);

  useEffect(() => {
    let token = localStorage.getItem("token");
    dispatch(questiontypeApi(token));
  }, []);
  const {
    register,
    handleSubmit,
   watch, setValue,

  } = useForm({});
  const hours = watch('first_time');

  useEffect(() => {
    if (hours) {
      const minutes = parseInt(hours) * 60 || 0;
      setValue('minutesOutput', minutes);
    }
  }, [hours, setValue]);
  const onSubmit = (data) => {
    let token = localStorage.getItem("token");
    console.log(data);
    let timingObjData = {
      token: token,
      Type: data.Type,
      first_time: data.first_time,
      second_time: data.second_time,
      skip_time: data.skip_time,
      total_time: data.total_time,
      tutor_time: data.tutor_time,
      admin_time: data.admin_time,
      unsolved_time: data.unsolved_time,
    };
    console.log(timingObjData);
    dispatch(questiontimingApi(timingObjData));
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
                <h3 className="page-title">Question Timing</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-lg-2 mt-2">
                            <h6>Question Type</h6>
                          </div>
                          <div className="col-lg-6">
                            <Form.Select
                              aria-label="Default select example"
                              {...register("Type")}
                            >
                              <option>Open this select menu</option>
                              {questiontype.user &&
                                questiontype.user.data.map((item) => (
                                  <option
                                    key={item._id}
                                    value={item.questionType}
                                  >
                                    {item.questionType}
                                  </option>
                                ))}
                            </Form.Select>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 mt-2">
                            <h6>Question Time</h6>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label"
                              >
                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                                {...register("first_time")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label"
                              >
                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                                              id="minutesOutput"
                                                              value={watch('minutesOutput')}
                                                              readOnly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 mt-2">
                            <h6>Second Time</h6>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label"
                                {...register("second_time")}
                              >
                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label"
                              >
                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minutesOutput"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 mt-2">
                            <h6>Skip Time</h6>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label"
                              >
                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                                {...register("skip_time")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label"
                              >
                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minutesOutput"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 mt-2">
                            <h6>Total Time</h6>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label"
                              >
                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                                {...register("total_time")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label"
                              >
                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minutesOutput"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 mt-2">
                            <h6>Tutor Time</h6>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label"
                              >
                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                                {...register("tutor_time")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label"
                              >
                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minutesOutput"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 mt-2">
                            <h6>Admin Time</h6>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label"
                              >
                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                                {...register("admin_time")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label"
                              >
                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minutesOutput"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 mt-2">
                            <h6>Unsolved Time</h6>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label"
                                {...register("unsolved_time")}
                              >
                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label"
                              >
                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minutesOutput"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-lg-2">
                            <h6>&nbsp;</h6>
                          </div>
                          <div className="col-lg-6 mb-2 text-end">
                            <Button variant="primary" type="submit">
                              Submit
                            </Button>
                          </div>
                        </div>
                      </Form>
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

export default Questiontiming;
