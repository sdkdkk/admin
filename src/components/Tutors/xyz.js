import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Table, Button } from "react-bootstrap";
import "./coupon.css";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const Coupon = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const [loading, setLoading] = useState(false);
  const [editCouponId, setEditCouponId] = useState(null);
  const token = localStorage.getItem("token");
  const notify = (data) => toast(data);
  const [conversionRate, setConversionRate] = useState([]);

  const fetchData = async () => {
    try {
      // setLoading(true);
      const response = await axios.post(
        `https://vaidik-backend.onrender.com/api/v1/admin/getcoupons`,
        {
          token: token,
        }
      );
      setConversionRate(response.data.data);
      // setLoading(false);
    } catch (error) {
      logoutIfInvalidToken(error.response)
      // notify("Invalid refresh token!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const requestUrl = data._id
        ? `https://vaidik-backend.onrender.com/api/v1/admin/couponcode`
        : `https://vaidik-backend.onrender.com/api/v1/admin/couponcode`;
      const response = await axios.post(requestUrl, {
        couponCode: data.couponCode,
        validityDate: data.validityDate,
        discount: parseInt(data.discount),
        token: token,
      });
      if (response.data.status === 1) {
        notify(response.data.message);
        reset();
        // setEditCouponId(null);
      }
    } catch (error) {
      logoutIfInvalidToken(error.response)
      notify(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (coupon) => {
    let date = new Date(coupon.validityDate);
    coupon.validityDate = null;
    coupon.validityDate = date.toISOString().substring(0, 10);
    reset(coupon);
  };

  function handleDelet(_id) {
    const response = axios
      .post(
        `https://vaidik-backend.onrender.com/api/v1/admin/deletecouponcode/${_id}`,
        {
          token: token,
        }
      )
      .then(() => {
        fetchData();
      });
    if (response.data.status === 1) {
      notify(response.data.message);
      reset();
    }
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
                <h3 className="page-title"> Coupon Code </h3>{" "}
              </div>{" "}
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6> Coupon Code </h6>{" "}
                          </div>{" "}
                          <div className="col-lg-4 col-md-8">
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control me-2"
                                id="hoursInput"
                                name="couponCode"
                                {...register("couponCode", { required: true })}
                              />{" "}
                              {errors.couponCode && (
                                <p className="error text-right text-danger">
                                  Please Enter a couponCode{" "}
                                </p>
                              )}{" "}
                            </div>{" "}
                          </div>{" "}
                        </div>{" "}
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6> Discount(Percent) </h6>{" "}
                          </div>{" "}
                          <div className="col-lg-4 col-md-8">
                            <div className="mb-3">
                              <input
                                type="number"
                                className="form-control me-2"
                                id="hoursInput"
                                name="discount"
                                {...register("discount", { required: true })}
                              />{" "}
                              {errors.discount && (
                                <p className="error text-right text-danger">
                                  Please Enter a discount{" "}
                                </p>
                              )}{" "}
                            </div>{" "}
                          </div>{" "}
                        </div>{" "}
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6> Validity Date </h6>{" "}
                          </div>{" "}
                          <div className="col-lg-4 col-md-8">
                            <div className="mb-3">
                              <input
                                type="date"
                                className="form-control me-2"
                                id="hoursInput"
                                name="validityDate"
                                {...register("validityDate", {
                                  required: true,
                                })}
                              />{" "}
                              {errors.validityDate && (
                                <p className="error text-right text-danger">
                                  Please Enter a Validity Date{" "}
                                </p>
                              )}{" "}
                            </div>{" "}
                          </div>{" "}
                        </div>{" "}
                        <div className="row mt-2">
                          <div className="col-lg-2 col-md-4">
                            <h6> & nbsp; </h6>{" "}
                          </div>{" "}
                          <div className="col-lg-4 col-md-8 mb-2 text-md-end">
                            <Button
                              variant="primary"
                              type="submit"
                              disabled={loading}>
                              {" "}
                              {loading ? "Loading..." : "Add"}{" "}
                            </Button>{" "}
                          </div>{" "}
                        </div>{" "}
                      </form>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
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
                              <th> Sr.No </th> <th> Coupon Code </th>{" "}
                              <th> Discount(Percent) </th> <th> Valid Date </th>{" "}
                              <th> Action </th>{" "}
                            </tr>{" "}
                          </thead>{" "}
                          <tbody>
                            {" "}
                            {conversionRate.map((data, index) => (
                              <tr key={data._id}>
                                <td> {index + 1} </td>{" "}
                                <td> {data.couponCode} </td>{" "}
                                <td> {data.discount} </td>{" "}
                                <td>
                                  {" "}
                                  {data.validityDate
                                    ? new Date(data.validityDate)
                                        .toISOString()
                                        .substring(0, 10)
                                    : "-"}{" "}
                                </td>{" "}
                                <td>
                                  <Button
                                    variant="success"
                                    onClick={() => handleUpdate(data)}>
                                    Update{" "}
                                  </Button>{" "}
                                  <Button
                                    className="mx-2"
                                    variant="danger"
                                    onClick={() => handleDelet(data._id)}>
                                    Delete{" "}
                                  </Button>{" "}
                                </td>{" "}
                              </tr>
                            ))}{" "}
                          </tbody>{" "}
                        </Table>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <Footer />
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};
export default Coupon;
