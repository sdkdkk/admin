import React, { useState } from "react";
import { Testimonialdata } from "../Data/Data1";
import { Pagination } from "@mui/material";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Testimoniald } from "../../Redux/Loginpages/authSlice";

const Testimonial = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers = Testimonialdata.slice(indexOfFirstPage, indexOfLastPage);

  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    console.log("data1", data);
    localStorage.setItem("data", token);
    const formData = new FormData();
    formData.append("file", data[0]);
    dispatch(Testimoniald(data));
    setTimeout(() => {
      navigate(" ");
    }, 500);
    reset();
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Testimonial</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Sort Order</th>
                            <th scope="col">PROFILE IMG</th>
                            <th scope="col">USER</th>
                            <th scope="col">ACTION</th>
                          </tr>
                        </thead>
                        {displayUsers.map((data, index) => (
                          <tbody key={index}>
                            <tr>
                              <td>{data.sortorder}</td>
                              <td>
                                {" "}
                                <img
                                  src={data.profileimg}
                                  className="cardresto-img-top mx-4"
                                  alt="..."
                                />
                              </td>
                              <td>{data.user}</td>
                              <td>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckChecked"
                                    defaultChecked
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                      <div className="table-pagination">
                        <Pagination
                          count={4}
                          page={currentPage}
                          onChange={handleChange}
                          shape="rounded"
                          variant="outlined"
                          showFirstButton
                          showLastButton
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label>SortOrder</Form.Label>
                              <Form.Control
                                type="text"
                                name="sort"
                                {...register("sort", {
                                  required: "Please Enter A Valid SortOrder!",
                                })}
                                placeholder="Enter SortOrder"
                              />
                              <p className="error-msg">
                                {errors.sort && errors.sort.message}
                              </p>
                            </Form.Group>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label> Profile Image</Form.Label>
                              <Form.Control
                                type="file"
                                name="image"
                                {...register("file", {
                                  required: "Please Enter A Valid image!",
                                })}
                                placeholder="Enter image"
                              />
                              <p className="error-msg">
                                {errors.image && errors.image.message}
                              </p>
                            </Form.Group>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label>User Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="username"
                                {...register("username", {
                                  required: "Please Enter A Valid username!",
                                })}
                                placeholder="Enter User Name"
                              />
                              <p className="error-msg">
                                {errors.username && errors.username.message}
                              </p>
                            </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Label>Description</Form.Label>
                            <FloatingLabel controlId="floatingTextarea2">
                              <Form.Control
                                type="text"
                                name="description"
                                {...register("description", {
                                  required: "Please Enter A Valid description!",
                                })}
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: "200px" }}
                              />
                              <p className="error-msg">
                                {errors.description &&
                                  errors.description.message}
                              </p>
                            </FloatingLabel>
                            <div className="testmonial-btn mt-4">
                              <button
                                type="submit"
                                className="btn btn-primary mx-2">
                                Back
                              </button>
                              <button
                                type="submit"
                                className="btn btn-primary mx-2">
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
