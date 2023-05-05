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
import { ColorRing } from "react-loader-spinner";

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

  console.log(conversionRate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `https://vaidik-backend.onrender.com/admin/getcurrencyconversion?Currency=USD`,
          {
            token: token,
          }
        );
        await setConversionRate(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.error);
        // notify("Invalid refresh token!");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const token = localStorage.getItem("token");
  const onSubmit = async (data, e) => {
    try {
      setLoadingpost(true);
      const response = await axios.post(
        `https://vaidik-backend.onrender.com/admin/setcurrencyconversion`,
        {
          ConversionToInr: parseFloat(data.ConversionToInr),
          Currency: "USD",
          token: token,
        }
      );
      if (response.data.status === 1) {
        console.log(response.data.status);
        notify("Currency Conversion Rate Updated Successfully");
        reset();
      }
    } catch (error) {
      console.log(error.response.data.error);
      // notify("Invalid refresh token!");
    } finally {
      setLoadingpost(false); // set loading to false when API call is complete
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
                <h3 className="page-title">Curruncy Conversion Rate</h3>
              </div>
              <div class="row mt-3">
                {loading ? (
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={["black"]}
                  />
                ) : (
                  <div class="col-12 grid-margin stretch-card">
                    <div class="card new-table">
                      <div class="card-body">
                        <div class="converter-container">
                          <div class="input-container">
                            <form onSubmit={handleSubmit(onSubmit)}  >
                              <label className="usd" for="usd-input">
                                1 USD ={" "}
                              </label>
                              <input
                                className="mx-2"
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
                                {/* <button id="update-btn">Update</button> */}
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
                                      Please Enter a Curruncy{" "}
                                    </p>
                                  )}
                                </span>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
