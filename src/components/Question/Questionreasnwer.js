import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const url = process.env.REACT_APP_API_BASE_URL;

const Questionreasnwer = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm({});

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [conversionRate, setConversionRate] = useState([]);
  const [reanswer, setReanswer] = useState("");
  const notify = (data) => toast(data);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading1(true);
        const response = await axios.post(`${url}/admin/getreanswer`, {
          token: token,
        });
        setConversionRate(response.data.data);
        setLoading1(false);
      } catch (error) {
        logoutIfInvalidToken(error.response);
        // notify("Invalid refresh token!");
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (conversionRate.choice !== undefined) {
      setReanswer(conversionRate.choice ? "yes" : "no");
    }
  }, [conversionRate.choice]);

  const onSubmit = async (data, e) => {
    try {
      setLoading(true);
      const hours = data.hours ? parseInt(data.hours) : 0;
      const minutes = data.minutes ? parseInt(data.minutes) : 0;
      const reanswerTime = hours * 60 + minutes;
      //   const { hours, minutes } = data.reanswer_time;
      const response = await axios.post(`${url}/admin/setreanswer`, {
        choice: reanswer === "yes",
        reanswer_time: parseInt(reanswerTime),
        token: token,
      });
      if (response.data.status === 1) {
        notify(response.data.message);
        e.target.reset();
      }
    } catch (error) {
      logoutIfInvalidToken(error.response);
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
                <h3 className="page-title"> Question Reanswer Choice </h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                        <div className="row">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6> Reanswer </h6>
                          </div>
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
                              label="no"
                              name="noNoRadio"
                              value="no"
                              checked={reanswer === "no"}
                              onChange={() => setReanswer("no")}
                            />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6> Reanswer Time </h6>
                          </div>
                          <div className="col-lg-3 col-md-8">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label">

                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                                name="hours"
                                defaultValue={
                                  loading1 || conversionRate.length === 0
                                    ? ""
                                    : String(
                                      Math.floor(
                                        conversionRate.reanswer_time / 60
                                      )
                                    )
                                }
                                {...register("hours")}
                              />
                              {errors.hours && (
                                <p className="error text-right text-danger">
                                  Please enter the hours.
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-8 mt-3 mt-md-0">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label">

                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minutesInput"
                                name="minutes"
                                {...register("minutes")}
                                defaultValue={
                                  loading1 || conversionRate.length === 0
                                    ? ""
                                    : String(conversionRate.reanswer_time % 60)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-lg-2 col-md-4">
                            {/* <h6> & nbsp; </h6> */}
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
