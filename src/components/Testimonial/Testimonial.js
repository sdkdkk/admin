import React, { useEffect, useState } from "react";
import { Testimonialdata } from "../Data/Data1";
import { Pagination } from "@mui/material";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import "./Testimonial.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Testimoniald } from "../../Redux/Loginpages/testimonialSlice";
import { Statuschange } from "../../Redux/Loginpages/testimonialStatusSlice";
import { testimonialformapi } from "../../Redux/Loginpages/testimonialFormSlice";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const Testimonial = () => {


  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(auth);

  const testimonial = useSelector((state) => state.testimonial);
  const testimonialstatus = useSelector((state) => state.testimonialstatus);
  const testimonialform = useSelector((state) => state.testimonialform);

  var [isActive, SetisActive] = useState(true);

  const activeForm = () => {
    if (isActive === true) {
      SetisActive(false)
    } else {
      SetisActive(true)
    }
  }


  console.log(testimonialstatus);
  // const notify = () => toast(testimonialstatus.user ? testimonialstatus.user.message : "");
  var tokens = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    // var tokens = localStorage.getItem("token");
    console.log(tokens);
    dispatch(Testimoniald(tokens));
  }, [dispatch])

  const onSubmit = (data) => {
    console.log("data1", data);
    // localStorage.setItem("data", token);
    const formData = new FormData();
    // formData.append("file", data[0]);

    formData.append("sortOrder", data.sortOrder);
    formData.append("profileimage", data.profileimage[0]);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("token", tokens);
    formData.append("status", isActive);

    dispatch(testimonialformapi(formData));

    // setTimeout(() => {
    //   navigate(" ");
    // }, 500);
    reset();
  };

  const changestatus = async (value, id, index) => {
    console.log(value, id, index);
    var st;
    console.log(testimonial.user.testimonial[index]);
    if (testimonial.user.testimonial[index].isactive === true) {
      st = false
    } else {
      st = true
    }
    await dispatch(Statuschange(st, id));
    // notify();
  }

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  //pagenation
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers = Testimonialdata.slice(indexOfFirstPage, indexOfLastPage);



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
                            <th scope="col">Profile Img</th>
                            <th scope="col">User</th>
                            <th scope="col">Action</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        {testimonial.user && testimonial.user.testimonial.map((data, index) => (
                          <tbody key={index}>
                            <tr>
                              <td>{data.sortOrder}</td>
                              <td>
                                {" "}
                                <img
                                  src={data.profileimage}
                                  className="cardresto-img-top mx-4"
                                  alt="..."
                                />
                              </td>
                              <td>{data.name}</td>
                              <td>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckChecked"
                                    defaultChecked={data.isactive}
                                    onChange={(e) => changestatus(e.target.value, data.id, index)}
                                  />
                                </div>
                              </td>
                              <td>:</td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                      <div className="table-pagination">
                        <Pagination
                          count={2}
                          page={currentPage}
                          onChange={handleChange}
                          shape="rounded"
                          variant="outlined"
                        // showFirstButton
                        // showLastButton
                        />
                      </div>
                    </div>
                    <div>
                      {/* <ToastContainer /> */}
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
                                type="number"
                                name="sortOrder"
                                {...register("sortOrder", {
                                  required: "Please Enter A Valid SortOrder!",
                                })}
                                placeholder="Enter SortOrder"
                              />
                              <p className="error-msg">
                                {errors.sortOrder && errors.sortOrder.message}
                              </p>
                            </Form.Group>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label> Profile Image</Form.Label>
                              <Form.Control
                                type="file"
                                name="profileimage"
                                accept=".png,.jpg,.jpeg,.tif,.tiff,.bmp,.gif,.ico"
                                {...register("profileimage", {
                                  required: "Please Enter A Valid image!",
                                })}
                                placeholder="Enter image"
                              />
                              <p className="error-msg">
                                {errors.profileimage && errors.profileimage.message}
                              </p>
                            </Form.Group>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label>User Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="name"
                                {...register("name", {
                                  required: "Please Enter A Valid username!",
                                })}
                                placeholder="Enter User Name"
                              />
                              <p className="error-msg">
                                {errors.name && errors.name.message}
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
                            <div className="row">
                              <div className="col-sm-4">
                                <label htmlFor="flexSwitchCheckChecked" className="form-label">
                                  Is Active
                                </label>
                              </div>
                              <div className="col-sm-8">
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input checkbox"
                                    type="checkbox"
                                    id="flexSwitchCheckChecked"
                                    onChange={() => activeForm()}
                                    defaultChecked
                                  />
                                </div>
                              </div>
                            </div>
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
