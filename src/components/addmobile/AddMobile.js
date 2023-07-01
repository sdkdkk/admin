import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";
import { Pagination } from "@mui/material";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import "../Css/Tutorlist.css";

const url = process.env.REACT_APP_API_BASE_URL;

const AddMobile = () => {
  const { handleSubmit, reset, control, formState: { errors }, } = useForm({});
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const notify = (data) => toast(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers = data?.slice(indexOfFirstPage, indexOfLastPage);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const totalPages = Math.ceil(data?.length / postsPerPage);
  const fetchData = async () => {
    try {
      setLoading1(true);
      const response = await axios.post(`${url}/admin/getmobileno`, {
        token: token,
      });
      setData(response.data.document);
      setLoading1(false);
    } catch (error) {
      logoutIfInvalidToken(error.response);
      setLoading1(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const requestUrl = data._id
        ? `${url}/admin/mobileno`
        : `${url}/admin/mobileno`;
      var response;
      response = await axios.post(requestUrl, {
        mobileNo: data.mobileNo,
        token: token,
      });
      if (response.data.status === 1) {
        notify(response.data.message);
        fetchData();
      }
    } catch (error) {
      logoutIfInvalidToken(error.response);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (coupon) => {
    reset(coupon);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function handleDelet() {
    axios
      .post(`${url}/admin/mobileno`, {
        token: token,
      })
      .then((response) => {
        fetchData();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  }

  const formatPhoneNumber = (phoneNumber) => {
    const countryCode = phoneNumber.slice(0, 2);
    const firstPart = phoneNumber.slice(2, 7);
    const secondPart = phoneNumber.slice(7, 12);
    return `${countryCode} ${firstPart}-${secondPart}`;
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
                <h3 className="page-title">Add Mobile No</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6>Mobile No</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="mb-3">
                              <div className="rbt-form-groups">
                                <div className="d-flex flex-row-reverse">
                                  <div className="flex-grow-1">
                                    <Controller
                                      name="mobileNo"
                                      control={control}
                                      rules={{
                                        required: "Mobile number is required",
                                        pattern: {
                                          message: "Invalid phone number",
                                        },
                                      }}
                                      render={({
                                        field: {
                                          onChange,
                                          onBlur,
                                          value,
                                          name,
                                          ref,
                                        },
                                      }) => (
                                        <PhoneInput
                                          className="mb-4"
                                          international
                                          defaultCountry="US"
                                          value={value}
                                          onChange={onChange}
                                          onBlur={onBlur}
                                          style={{ width: 'auto' }}
                                        />
                                      )}
                                    />
                                    {errors.mobileNo && (
                                      <p className="error-msg text-danger">
                                        {errors.mobileNo.message}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-4 mt-0  align-items-center">
                            <Button
                              variant="primary"
                              type="submit"
                              disabled={loading}>
                              {loading ? "Loading..." : "Add"}
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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
                                  <th>Sr. No</th>
                                  <th>Question Type</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                                {loading1 ? ( 
                          <tbody>
                            <tr>
                              <td colSpan="3" className="text-center">
                                <div className="loader-container"> 
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
                                {displayUsers?.map((data, index, _id) => (
                                  <tr key={index}>
                                    <td>
                                      {index +
                                        1 +
                                        (currentPage - 1) * postsPerPage}
                                    </td>
                                    <td>{formatPhoneNumber(data.mobileNo)}</td>
                                    <td>
                                      <Button
                                        variant="success"
                                        onClick={() => handleUpdate(data)}>
                                        Update
                                      </Button>
                                      <Button
                                        className="mx-2"
                                        variant="danger"
                                        onClick={() => handleDelet(data._id)}>
                                        Delete
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>}
                            </Table>
                            <div className="table-pagination">
                              <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handleChange}
                                shape="rounded"
                                variant="outlined"
                              />
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
      <ToastContainer />
    </>
  );
};

export default AddMobile;
