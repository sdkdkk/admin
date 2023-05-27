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
import { ColorRing } from "react-loader-spinner";
import { Pagination } from "@mui/material";
import { questiontypePriceApi } from "../../Redux/Loginpages/questiontypePriceSlice";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const url = process.env.REACT_APP_API_BASE_URL;

const Questionpricing = () => {
  const notify = (data) => toast(data);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const dispatch = useDispatch();
  const questiontypeTime = useSelector((state) => state.questiontypetime);
  const questiontypePrice = useSelector((state) => state.questiontypeprice);

  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
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
    try {
      setLoading(true);
      const requestUrl = `${url}/admin/setquestionpricing`;
      var response;
      if (data._id) {
        response = await axios.post(requestUrl, {
          token: token,
          Type: data.Type,
          question_price: data.question_price,
          tutor_price: data.tutor_price,
          admin_price: data.admin_price,
          id: data._id,
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
      if (response.data.message) {
        notify(response.data.message);
        reset();
        fetchData();
      } else {
        notify(data.error);
      }
    } catch (error) {
      logoutIfInvalidToken(error.response)
      notify(error.response.data.error);
    }

    fetchData();

    setLoading(false);
  };

  const fetchData = async () => {
    try {
      setLoading1(true);

      const response = await axios.post(
        `${url}/admin/getquestionpricing`,
        {
          token: token,
        }
      );
      setData(response.data.data);
      setLoading1(false);
    } catch (error) {
      logoutIfInvalidToken(error.response)
      setLoading1(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPage = Math.min(currentPage * postsPerPage, data.length);
  const indexOfFirstPage = (currentPage - 1) * postsPerPage;
  const displayUsers = data.slice(indexOfFirstPage, indexOfLastPage);
  const pageCount = Math.ceil(data.length / postsPerPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleUpdateClick = (data) => {
    setIsEditMode(true);
    reset(data);
  };

  function handleDeleteClick(_id) {
    axios
      .post(
        `${url}/admin/questionpricing/${_id}`,
        {
          token: token,
        }
      )
      .then((response) => {
        fetchData();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.data.message);
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
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6>Question Type</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <Form.Select
                              {...register("Type", { required: true })}>
                              <option value="">
                                Please Select Question Type
                              </option>
                              {questiontypePrice.user &&
                                questiontypePrice.user.data.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                            </Form.Select>
                            {errors.Type && (
                              <span className="text-danger">
                                Please select an option
                              </span>
                            )}
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
                            <Button
                              variant="primary"
                              type="submit"
                              disabled={loading}>
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
              {loading1 ? (
                <p style={{ marginLeft: "400px", marginTop: "50px" }}>
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
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
                    <tbody>
                      {displayUsers.map((data, index, _id) => (
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
                              onClick={() => handleDeleteClick(data._id)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="table-pagination">
                    <Pagination
                      count={pageCount}
                      page={currentPage}
                      onChange={handleChange}
                      shape="rounded"
                      variant="outlined"
                    />
                  </div>
                </>
              )}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Questionpricing;
