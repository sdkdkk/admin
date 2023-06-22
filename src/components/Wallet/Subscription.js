import React, { useState } from "react";
import { useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Form, Button, Table, FormCheck } from "react-bootstrap";
import { questiontypeApi } from "../../Redux/Loginpages/questiontypeTimeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { ColorRing, RotatingLines } from "react-loader-spinner";
import { questiontypePriceApi } from "../../Redux/Loginpages/questiontypePriceSlice";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const url = process.env.REACT_APP_API_BASE_URL;

const Subscription = () => {
  const { register, handleSubmit, reset, } = useForm({});

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isEditMode] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState();

  let token = localStorage.getItem("token");
  useEffect(() => {
 //   setLoading1(true);
    let token = localStorage.getItem("token");
    dispatch(questiontypeApi(token));
    dispatch(questiontypePriceApi());
    fetchData();
    //setLoading1(false);
  }, []);
  var [isActive, setIsActive] = useState(true);
 
 const activeForm = () => {
  setIsActive((prevFormStatus) => !prevFormStatus); // Toggle the value of formStatus
};

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const requestUrl = `${url}/admin/subscriptionpricechange/${data._id}`;
      var response;
      if (data._id) {
        response = await axios.post(requestUrl, {
          token: token,
          price: data.price,
          status: isActive,
        });
      }
      if (response.data.message) {
        toast.success(response.data.message);
        reset();
        fetchData();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      logoutIfInvalidToken(error.response);
      toast.error(error.response.data.error);
    }

    fetchData();

    setLoading(false);
  };

  const fetchData = async () => {
    try {
      setLoading1(true);
  
      const response = await axios.post(`${url}/admin/getsubscription`, {
        token: token,
      });
      setData(response.data.subscription);
      setLoading1(false);
    } catch (error) {
      logoutIfInvalidToken(error.response);
      setLoading1(false);
    }
  };

  const handleUpdateClick = (data) => {
    reset(data);
    setIsActive(data.isactive);
  };
  // status change api
 

  const changestatus = async (value, id, index,) => {
     var status;

    if (data[index].isactive === true) {
      status = false;
    } else {
      status = true;
    }
    setStatus(status)
    try {
      // setLoading1(true);
      const response = await axios.post(`${url}/admin/subscriptionstatuschange/${id}`, {
        token: token,
        status
      });
      setStatus(response.data)

      if (response.data.message) {
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.error);
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
                <h3 className="page-title">Subscription Plan</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          {/* Form field for duration */}
                          <div className="col-md-4">
                            <label htmlFor="duration" className="form-label">
                              Duration
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="duration"
                              {...register("duration")}
                              readOnly
                            />
                          </div>

                          {/* Form field for price */}
                          <div className="col-md-4">
                            <label htmlFor="price" className="form-label">
                              Price
                            </label>
                            <div className="input-group mb-3">
                              <input
                                type="number"
                                className="form-control"
                                id="price"
                                {...register("price")}
                                required
                              />
                              <span className="input-group-text">INR</span>
                            </div>
                          </div>

                          {/* Switch to activate/deactivate subscription plan */}
                          <div className="col-md-2">
                            <label htmlFor="subscription" className="form-label">
                              Subscription
                            </label>
                            <div className="form-check form-switch mt-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="subscription"
                                onChange={() => activeForm()}
                                checked={isActive}
                              />
                            </div>
                          </div>

                          {/* Submit button */}
                          <div className="col-md-2 d-flex align-items-end">
                            <Button variant="primary" type="submit" disabled={loading}>
                              {isEditMode ? (loading ? "Loading..." : "Update") : loading ? "Loading..." : "Add"}
                            </Button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <Table
                            striped
                            bordered
                            responsive // Make table responsive
                            className="single-color table "
                          >
                            <thead>
                              <tr>
                                <th>Sr.No</th>
                                <th>Duration</th>
                                <th>price</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                             {loading1 ? ( // Condition for displaying loader
                          <tbody>
                            <tr>
                              <td colSpan="5" className="text-center">
                                <div className="loader-container"> {/* Wrap loader code inside this div */}
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
                              {/* Map over subscription plan data and display in table rows */}
                              {data?.map((data, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{data.duration}</td>
                                  <td>{data.price}</td>
                                  <td>
                                    <div className="form-check form-switch">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="flexSwitchCheckChecked"
                                        defaultChecked={data.isactive}
                                        onChange={(e) =>
                                          changestatus(
                                            e.target.value,
                                            data._id,
                                            index
                                          )
                                        }
                                      />
                                    </div>
                                  </td>
                                  {/* Button to edit subscription plan */}
                                  <td>
                                    <Button
                                      variant="success"
                                      onClick={() => handleUpdateClick(data)}
                                    >
                                      Edit
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>}
                          </Table>
                        
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Subscription;
