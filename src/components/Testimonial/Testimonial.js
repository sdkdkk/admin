import React, { useEffect, useRef, useState } from "react";
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

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import {
  testimonialUserDelete,
  reset as resetTestimonialUserDelete,
} from "../../Redux/Loginpages/testimonialUserDeleteSlice";
import { ColorRing } from "react-loader-spinner";



const Testimonial = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [defaultValues, setDefaultValues] = useState({});
  const testimonial = useSelector((state) => state.testimonial);
  const testimonialform = useSelector((state) => state.testimonialform);
  const testimonialstatus = useSelector((state) => state.testimonialstatus);
  const testimonialUserDeleteState = useSelector((state) => state.testimonialUserDelete);

  var [isActive, SetisActive] = useState(true);

  const [isOpen, setIsOpen] = useState("");

  const handleDropdownClick = (id) => {
    setIsOpen(isOpen === id ? "" : id);
  };

  // const activeForm = () => {
  //   if (isActive === true) {
  //     SetisActive(false);
  //   } else {
  //     SetisActive(true);
  //   }
  // };

  const activeForm = () => {
    SetisActive((prevIsActive) => !prevIsActive); // Toggle the value of isActive
  };
  var tokens = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ values: defaultValues });

  useEffect(() => {
    dispatch(Testimoniald(tokens));
  }, []);

  useEffect(() => {
    if (
      testimonialUserDeleteState?.isSuccess ||
      testimonialform?.isAuthenticated
    ) {
      reset();
      setDefaultValues({});
      dispatch(Testimoniald(tokens));
      dispatch(resetTestimonialUserDelete());
    }
  }, [
    testimonialUserDeleteState?.isSuccess || testimonialform?.isAuthenticated,
  ]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);
  
  const onSubmit = (data) => {
    const formData = new FormData();
   
    formData.append("sortOrder", data.sortOrder);
    formData.append("profileimage", data.profileimage[0]);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("token", tokens);
    formData.append("status", isActive);
    if (defaultValues?.id) {
      formData.append("id", defaultValues?.id);
    }

    dispatch(testimonialformapi(formData));
    setTimeout(() => {
      setDefaultValues({});
      reset({});
    }, [500]);
  };

  const changestatus = async (value, id, index) => {
    var st;
    if (testimonial.user?.testimonial[index].isactive === true) {
      st = false;
    } else {
      st = true;
    }
    await dispatch(Statuschange(st, id));
    // notify();
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleEditClick = (data) => {
    setIsOpen(false);
    setDefaultValues(data);
    SetisActive(data.isactive);
  };

  const handleDeleteClick = (id) => {
    dispatch(testimonialUserDelete(id));
  };

  //pagenation

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
                      <table
                        className={`table ${
                          (testimonial.loading ||
                            testimonialstatus.loading ||
                            testimonialform.loading ||
                            testimonialUserDeleteState.isLoading) &&
                          "table-loading"
                        }`}
                      >
                        <thead>
                          <tr>
                            <th scope="col">Sort Order</th>
                            <th scope="col">Profile Img</th>
                            <th scope="col">User</th>
                            <th scope="col">Action</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            {testimonial.user &&
                              testimonial.user?.testimonial
                                .slice((currentPage - 1) * 5, currentPage * 5)
                                .map((data, index) => (
                                  <tr key={data.id}>
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
                                          onChange={(e) =>
                                            changestatus(
                                              e.target.value,
                                              data.id,
                                              index
                                            )
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="dropdown">
                                        <button
                                          className="dropdown__button"
                                          onClick={() =>
                                            handleDropdownClick(data.id)
                                          }
                                        >
                                          ...
                                        </button>
                                        {data.id === isOpen && (
                                          <div className="dropdown__popup">
                                            <ul className="dropdown__list">
                                              <li
                                                onClick={() =>
                                                  handleEditClick(data)
                                                }
                                              >
                                                Edit
                                              </li>
                                              <li
                                                onClick={() =>
                                                  handleDeleteClick(data.id)
                                                }
                                              >
                                                Delete
                                              </li>
                                            </ul>
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                          </>
                        </tbody>
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
                    <div>{/* <ToastContainer /> */}</div>
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
                              controlId="formBasicEmail"
                            >
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
                              controlId="formBasicEmail"
                            >
                              <Form.Label> Profile Image</Form.Label>
                              <Form.Control
                                type="file"
                                name="profileimage"
                                accept=".png,.jpg,.jpeg,.tif,.tiff,.bmp,.gif,.ico"
                                {...register("profileimage", { 
                                  required: (defaultValues.id? '' : "Please Enter A Valid image!"),
                                })}
                                placeholder="Enter image"
                              />
                              <p className="error-msg">
                                {errors.profileimage &&
                                  errors.profileimage.message}
                              </p>
                            </Form.Group>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
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
                                <label
                                  htmlFor="flexSwitchCheckChecked"
                                  className="form-label"
                                >
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
                                    checked={isActive} // Use the isActive value as the checked state of the checkbox
                                    // disabled={
                                    //   Object.keys(defaultValues).length !== 0
                                    // } // Disable the checkbox during edit
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="testmonial-btn mt-4">
                              <button
                                type="submit"
                                className="btn btn-primary mx-2"
                              >
                                Back
                              </button>
                              <button
                                type="submit"
                                className="btn btn-primary mx-2"
                              >
                                {Object.keys(defaultValues).length === 0
                                  ? "Submit"
                                  : "Update"}
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
