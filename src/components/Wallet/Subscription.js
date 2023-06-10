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
import { ColorRing } from "react-loader-spinner";
import { questiontypePriceApi } from "../../Redux/Loginpages/questiontypePriceSlice";
import { logoutIfInvalidToken } from "../../helpers/handleError";


const url = process.env.REACT_APP_API_BASE_URL;

const Subscription = () => {
  const { register, handleSubmit, reset, } = useForm({});

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState();
  let token = localStorage.getItem("token");
  useEffect(() => {
    setLoading1(true);
    let token = localStorage.getItem("token");
    dispatch(questiontypeApi(token));
    dispatch(questiontypePriceApi());

    fetchData();
    setLoading1(false);
  }, []);

  const onSubmit = async (data) => {
    const id = data._id;
    try {
      setLoading(true);
      const requestUrl = `${url}/admin/subscriptionpricechange/${data._id}`;
      var response;
      if (data._id) {
        response = await axios.post(requestUrl, {
          token: token,
          price: data.price,
          status: data.status,
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
    SetisActive(data.isactive);
  };
  // status change api
  var [isActive, SetisActive] = useState(true);
  const activeForm = () => {
    SetisActive((prevIsActive) => !prevIsActive); // Toggle the value of isActive
  };


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
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 ">
                            <input
                              type="text"
                              className="form-control me-2"
                              {...register("duration")}
                              readOnly
                            />
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="input-group mb-3 form-inline">
                              <input
                                type="number"
                                className="form-control me-2"
                                id="hoursInput"
                                required
                                {...register("price")}
                              />
                              <span className="input-group-text">INR</span>
                            </div>
                          </div>{" "}
                          <div className="col-lg-2 col-md-8 my-2 d-flex form-switch">
                            <input
                              // className="form-check-input"
                              // type="checkbox"
                              // id="flexSwitchCheckChecked"
                              // {...register("status")}
                              // onChange={() => activeForm()}
                              // defaultChecked={isActive}
                              className="form-check-input checkbox"
                              type="checkbox"
                              id="flexSwitchCheckChecked"
                              onChange={() => activeForm()}
                              checked={isActive}
                            />
                          </div>
                        </div>

                        <div className="row mt-2">
                          <div className="col-lg-2 col-md-4">
                            <h6>&nbsp;</h6>
                          </div>
                          <div className="col-lg-4 col-md-8 mb-2 text-md-end">
                            <Button
                              variant="primary"
                              type="submit"
                              disabled={loading}
                            >
                              {isEditMode
                                ? loading
                                  ? "Loading..."
                                  : "Update"
                                : loading
                                  ? "Loading..."
                                  : "Add"}
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
                      {loading1 ? (
                        <p style={{ marginLeft: "400px", marginTop: "50px" }}>
                          <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperclassName="blocks-wrapper"
                            colors={["black"]}
                          />
                        </p>
                      ) : (
                        <>
                          <Table
                            striped
                            bordered
                            // hover
                            responsive
                            className="single-color table "
                          >
                            <thead>
                              <tr>
                                <th>Sr.No</th>
                                <th>Duration</th>
                                <th>price</th>
                                <th>Status </th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.map((data, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{data.duration}</td>
                                  <td>{data.price}</td>
                                  <td>
                                    <span className="form-switch text-center">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="flexSwitchCheckChecked"
                                        defaultChecked={data.isactive}
                                        onChange={(e) =>
                                          changestatus(
                                            e.target.checked,
                                            data._id,
                                            index
                                          )
                                        }
                                      />
                                    </span>
                                  </td>
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
                            </tbody>
                          </Table>
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
      <ToastContainer />
    </>
  );
};

export default Subscription;
