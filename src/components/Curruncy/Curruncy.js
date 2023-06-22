import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./Curruncy.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const url = process.env.REACT_APP_API_BASE_URL;

const Curruncy = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const [loading, setLoading] = useState(false);
  const [loadingpost, setLoadingpost] = useState(false);
  const notify = (data) => toast(data);
  const [conversionRate, setConversionRate] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${url}/admin/getcurrencyconversion?Currency=USD`,
        { token: token }
      );
      await setConversionRate(response.data);
      setLoading(false);
    } catch (error) {
      logoutIfInvalidToken(error.response);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const token = localStorage.getItem("token");
  const onSubmit = async (data, e) => {
    try {
      setLoadingpost(true);
      const response = await axios.post(`${url}/admin/setcurrencyconversion`, {
        ConversionToInr: parseFloat(data.ConversionToInr),
        Currency: "USD",
        token: token,
      });
      if (response.data.status === 1) {
        fetchData();
        notify("Currency Conversion Rate Updated Successfully");

        reset();
      }
    } catch (error) {
      logoutIfInvalidToken(error.response);
    } finally {
      setLoadingpost(false);
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
                <h3 className="page-title"> Curruncy Conversion Rate </h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <div className="converter-container">
                        <div className="input-container">
                          {loading ? (
                            <div className="loader-container">
                              <RotatingLines
                                strokeColor="#d63384"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="50"
                                visible={true}
                              />
                            </div>
                          ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <label className="usd" htmlFor="usd-input">
                                1 USD =
                              </label>
                              <input
                                className="col-form-label mx-2 p-2"
                                type="number"
                                id="usd-input"
                                min="0"
                                step="0.01"
                                defaultValue={conversionRate.rate}
                                placeholder={conversionRate.rate}
                                name="ConversionToInr"
                                {...register("ConversionToInr", {
                                  required: true,
                                })}
                              />
                              <div style={{ display: "inline" }}>
                                INR
                                <span>
                                  <Button
                                    className="mx-2"
                                    id="update-btn"
                                    variant="primary"
                                    type="submit"
                                    disabled={loadingpost}>
                                    {loadingpost ? "Loading..." : "Update"}
                                  </Button>
                                  {errors.ConversionToInr && (
                                    <p className="error text-danger">
                                      Please Enter a Curruncy
                                    </p>
                                  )}
                                </span>
                              </div>
                            </form>
                          )}
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
export default Curruncy;
