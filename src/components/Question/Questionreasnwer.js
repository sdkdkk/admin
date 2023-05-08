import React, { useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const Questionreasnwer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [loading, setLoading] = useState(false);
  const [reanswer, setReanswer] = useState("yes");
  const notify = (data) => toast(data);
  const token = localStorage.getItem("token");

  const onSubmit = async (data, e) => {
    try {
      setLoading(true);
      const hours = data.hours ? parseInt(data.hours) : 0;
      const minutes = data.minutes ? parseInt(data.minutes) : 0;
      const reanswerTime = hours + minutes / 60;
      //   const { hours, minutes } = data.reanswer_time;
      const response = await axios.post(
        `https://vaidik-backend.onrender.com/admin/setreanswer`,
        {
          choice: reanswer === "yes",
          reanswer_time: reanswerTime.toFixed(2),
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
                <h3 className="page-title"> Question Reanswer Choice </h3>{" "}
              </div>{" "}
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                        <div className="row">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6> Reanswer </h6>{" "}
                          </div>{" "}
                          <div className="col-md-4">
                            <Form.Check
                              type="radio"
                              id="yesRadio"
                              label="Yes"
                              name="yesNoRadio"
                              value="yes"
                              checked={reanswer === "yes"}
                              onChange={() => setReanswer("yes")}
                            />
                            <Form.Check
                              type="radio"
                              id="noRadio"
                              label="No"
                              name="yesNoRadio"
                              value="no"
                              checked={reanswer === "no"}
                              onChange={() => setReanswer("no")}
                            />
                          </div>{" "}
                        </div>{" "}
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6> Reanswer Time </h6>{" "}
                          </div>{" "}
                          <div className="col-lg-3 col-md-8">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label">
                                {" "}
                                Hours:{" "}
                              </label>{" "}
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                                name="hours"
                                {...register("hours")}
                              />
                              {errors.hours && (
                                <p className="error text-right text-danger">
                                  Please enter the hours.
                                </p>
                              )}
                            </div>{" "}
                          </div>{" "}
                          <div className="col-lg-3 col-md-8 mt-3 mt-md-0">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label">
                                {" "}
                                Minutes:{" "}
                              </label>{" "}
                              <input
                                type="number"
                                className="form-control"
                                id="minutesInput"
                                name="minutes"
                                {...register("minutes")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-lg-2 col-md-4">
                            {/* <h6> & nbsp; </h6>{" "} */}
                          </div>
                          <div className="col-lg-4 col-md-8 mb-2 text-md-end">
                            <Button variant="primary" type="submit">
                              Submit
                            </Button>
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

export default Questionreasnwer;
