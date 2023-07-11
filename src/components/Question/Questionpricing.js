import React, { useState } from "react";
import { useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Form, Button, Table } from "react-bootstrap";
import { questiontypeApi } from "../../Redux/Loginpages/questiontypeTimeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Pagination } from "@mui/material";
import { questiontypePriceApi } from "../../Redux/Loginpages/questiontypePriceSlice";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import { useLocation } from "react-router";

const url = process.env.REACT_APP_API_BASE_URL;

const Questionpricing = () => {
  const notify = (data) => toast(data);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({});
  const [typeValue, setTypeValue] = useState("");
  const dispatch = useDispatch();
  const questiontypePrice = useSelector((state) => state.questiontypeprice);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState([]);
  let token = localStorage.getItem("token");

  useEffect(() => {
    let token = localStorage.getItem("token");
    dispatch(questiontypeApi(token));
    setLoading(true)
    dispatch(questiontypePriceApi());
       fetchData();  
     setLoading(false)
  }, []);

  const onSubmit = async (data) => {
    try {
     
      const requestUrl = `${url}/admin/setquestionpricing`;
      var response;
      if (data._id) {
        response = await axios.post(requestUrl, {
          token: token,
          Type: data.Type,
          question_price: data.question_price,
          tutor_price: data.tutor_price,
          admin_price: data.admin_price,
          id: data.id,
        });
      } else {
        response = await axios.post(requestUrl, {
          token: token,
          Type: data.Type,
          question_price: data.question_price,
          tutor_price: data.tutor_price,
          admin_price: data.admin_price,
        });
      }
    setLoading(true);
      if (response.data.message) {
        notify(response.data.message);
        reset();
        fetchData();
         setLoading(false);
      } else {
        notify(data.error);
      }
    } catch (error) {
      logoutIfInvalidToken(error.response);
      notify(error.response.data.error);
    }
    fetchData();
   setLoading(false)
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${url}/admin/getquestionpricing`, {
        token: token,
      });
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      logoutIfInvalidToken(error.response);
      setLoading(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPage = Math.min(currentPage * postsPerPage, data.length);
  const indexOfFirstPage = (currentPage - 1) * postsPerPage;
  const displayUsers = data.slice(indexOfFirstPage, indexOfLastPage);
  const pageCount = Math.ceil(data.length / postsPerPage);
  const location = useLocation();
  const handleChange = (event, value) => {
    setCurrentPage(value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${searchParams.toString()}`
    );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    const initialPage = pageParam ? parseInt(pageParam) : 1;
    setCurrentPage(initialPage);
  }, [location.search]);

  const handleUpdateClick = (data) => {
    setIsEditMode(true);
    reset(data);
    setTypeValue(data.Type);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setValue("Type", typeValue);
  }, [typeValue]);

  function handleDeleteClick(_id) {
    axios
      .post(`${url}/admin/questionpricing/${_id}`, { token: token })
      .then((response) => {
        fetchData();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
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
                <h3 className="page-title">Question Pricing</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                        {loading ?
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
                                    <div className="mobile-loader-text"></div>
                                  </div>
                              :<Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6>Question Type</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                              {loading ?
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
                                    <div className="mobile-loader-text"></div>
                                  </div>
                              :<Form.Select
                              {...register("Type", {
                                required: !isEditMode ? true : false,
                              })}>
                              <option value={typeValue}>
                                {!isEditMode
                                  ? "Please Select Question Type"
                                  : typeValue}
                              </option>
                              {questiontypePrice.user &&
                                questiontypePrice.user.data.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                            </Form.Select>}
                            {!isEditMode
                              ? errors.Type && (
                                  <span className="text-danger">
                                    Please select an option
                                  </span>
                                )
                              : ""}
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6>Question Pricing</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="input-group mb-3 form-inline">
                              <input
                                type="number"
                                className="form-control me-2"
                                id="hoursInput"
                                required
                                {...register("question_price")}
                              />
                              <span className="input-group-text">INR</span>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6>Tutor Pricing</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="input-group mb-3 form-inline">
                              <input
                                type="number"
                                className="form-control me-2"
                                id="hoursInput"
                                required
                                {...register("tutor_price")}
                              />
                              <span className="input-group-text">INR</span>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6>Admin Pricing</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="input-group mb-3 form-inline">
                              <input
                                type="number"
                                className="form-control me-2"
                                id="hoursInput"
                                required
                                {...register("admin_price")}
                              />
                              <span className="input-group-text">INR</span>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-lg-2 col-md-4">
                            <h6>&nbsp;</h6>
                          </div>
                          <div className="col-lg-4 col-md-8 mb-2 text-md-end">
                            <Button variant="primary" type="submit">
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
                      </Form>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <Table
                        striped
                        bordered
                        responsive
                        className="single-color table ">
                        <thead>
                          <tr>
                            <th>Sr.No</th>
                            <th>Question Type</th>
                            <th>Question Pricing</th>
                            <th>Tutor Pricing</th>
                            <th>Admin Pricing</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {loading ? (
                          <tbody>
                            <tr>
                              <td colSpan="6" className="text-center">
                                <div className="d-flex justify-content-center align-items-center">
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
                                    <div className="mobile-loader-text"></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ) : (
                          <tbody>
                            {displayUsers.length === 0 ? (
                              <tr>
                                <td
                                  colSpan="6"
                                  className="fw-3 fw-bolder text-center">
                                  No Price found
                                </td>
                              </tr>
                            ) : (
                              displayUsers.map((data, index, _id) => (
                                <tr key={index}>
                                  <td>{index + indexOfFirstPage + 1}</td>
                                  <td>{data.Type}</td>
                                  <td>{data.question_price}</td>
                                  <td>{data.tutor_price}</td>
                                  <td>{data.admin_price}</td>
                                  <td>
                                    <Button
                                      variant="success"
                                      onClick={() => handleUpdateClick(data)}>
                                      Edit
                                    </Button>
                                    <Button
                                      className="mx-2"
                                      variant="danger"
                                      onClick={() =>
                                        handleDeleteClick(data._id)
                                      }>
                                      Delete
                                    </Button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        )}
                      </Table>
                      <div className="table-pagination float-end">
                        <Pagination
                          count={pageCount}
                          page={currentPage}
                          onChange={handleChange}
                          shape="rounded"
                          variant="outlined"
                          siblingCount={0}
                        />
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

export default Questionpricing;
