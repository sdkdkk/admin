import React, { useState} from "react";
import Data from "./Pages.json";
import { Pagination } from "@mui/material";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
// import "../Css/Tutorlist.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Pagesd } from "../../Redux/Loginpages/authSlice";
import { Col } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Pages = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  console.log(auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const {
    register,
    reset,
    handleSubmit,
    formats,
    control,
    modules,
    editorRef,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    console.log("data1", data);
    localStorage.setItem("data", token);

    dispatch(Pagesd(data));
    setTimeout(() => {
      navigate(" ");
    }, 500);
    reset();
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
                <h3 className="page-title">All Pages</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Sort Order</th>
                            <th scope="col">Page Name</th>
                            <th scope="col">ACTION</th>
                          </tr>
                        </thead>
                        {Data.map((data, index) => (
                          <tbody key={index}>
                            <tr>
                              <td>{data.sortorder}</td>
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
                              <td>:</td>
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
                          <div className="col-md-12">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label>SortOrder</Form.Label>
                              <Form.Control
                                type="text"
                                name="sort"
                                {...register("sort", {
                                  required: "Please Enter A Valid sort!",
                                })}
                                placeholder="Enter SortOrder"
                              />
                              <p className="error-msg">
                                {errors.sort && errors.sort.message}
                              </p>
                            </Form.Group>
                          </div>
                          <div className="col-md-12">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label>Page Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="name"
                                {...register("name", {
                                  required: "Please Enter A Valid name!",
                                })}
                                placeholder="Enter Page Name"
                              />
                              <p className="error-msg">
                                {errors.name && errors.name.message}
                              </p>
                            </Form.Group>
                          </div>
                          <Col md={12}>
                            <div>
                              <p className="mx-1">Answer</p>
                              <Controller
                                name="answer"
                                control={control}
                                // defaultValue={editorHtml}
                                render={({ field }) => (
                                  <ReactQuill
                                    theme="snow"
                                    name="answer"
                                    onChange={handleChange}
                                    //onChange={(value) => setEditorHtml(value)}
                                    value={field.value}
                                    modules={modules}
                                    formats={formats}
                                    bounds={"#root"}
                                    placeholder="type Here...."
                                    ref={editorRef}
                                    {...field}
                                  />
                                )}
                              />
                              <p className="error-msg">
                                {errors.answer && errors.answer.message}
                              </p>
                            </div>
                          </Col>
                          <div className="col-md-6 mt-4">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label>Meta Title</Form.Label>
                              <Form.Control
                                type="text"
                                name="metatitle"
                                {...register("metatitle", {
                                  required: "Please Enter A Valid metatitle!",
                                })}
                              />
                              <p className="error-msg">
                                {errors.metatitle && errors.metatitle.message}
                              </p>
                            </Form.Group>
                          </div>
                          <div className="col-md-6 mt-4">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label>Meta Keyword</Form.Label>
                              <Form.Control
                                type="text"
                                name="metakeyword"
                                {...register("metakeyword", {
                                  required: "Please Enter A Valid metakeyword!",
                                })}
                                placeholder="Enter Meta Keyword"
                              />
                              <p className="error-msg">
                                {errors.metakeyword &&
                                  errors.metakeyword.message}
                              </p>
                            </Form.Group>
                          </div>
                          <div className="col-md-12">
                            <Form.Label> Meta Description</Form.Label>
                            <FloatingLabel controlId="floatingTextarea2">
                              <Form.Control
                                as="textarea"
                                type="text"
                                name="metadescription"
                                {...register("metadescription", {
                                  required:
                                    "Please Enter A Valid metadescription!",
                                })}
                                placeholder="Leave a comment here"
                                style={{ height: "130px" }}
                              />
                              <p className="error-msg">
                                {errors.metadescription &&
                                  errors.metadescription.message}
                              </p>
                            </FloatingLabel>
                          </div>
                          <div className="pages-btn mt-4">
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

export default Pages;
