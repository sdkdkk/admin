import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { Pagination } from "@mui/material";
import { Studentdata } from "../Data/Data1";
import { Badge, Button } from "react-bootstrap";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { TutorExam } from "../../Redux/Loginpages/authSlice";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="Answer">
      {isReadMore ? text.slice(0, 150) : text}
      <span
        onClick={toggleReadMore}
        className="read-or-hide"
        style={{ color: "blue" }}>
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

const Tutorexam = () => {
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers = Studentdata.slice(indexOfFirstPage, indexOfLastPage);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(auth);

  const {
    register,
    handleSubmit,
    reset,
    formats,
    control,
    modules,
    editorRef,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    console.log("data1", data);
    // localStorage.setItem("data", token);
    dispatch(TutorExam(data));
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
              <div className="oneline">
                <h3 className="main-text">Tutor Exam</h3>
              </div>
              <div className="page-header mt-4">
                <div className="mb-2 mt-2">
                  <Link to="/tutorexam">
                    <Button variant="primary" size="lg">
                      Add New
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="dropdown">
                            <Form.Select
                              aria-label="Default select example"
                              name="options"
                              {...register("options")}>
                              <option>Select Subject</option>
                              <option value="Maths">Maths</option>
                              <option value="Biology">Biology</option>
                              <option value="Physics">Physics </option>
                            </Form.Select>
                            {errors.options && (
                              <p className="text-danger">
                                Please select a Class
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row pt-4">
                          <div className="col-md-12">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label>Questions</Form.Label>
                              <Form.Control
                                type="text"
                                name="question"
                                placeholder="Enter Questions"
                                {...register("question", {
                                  required: "Please Enter A Valid Question!",
                                })}
                              />
                              <p className="error-msg">
                                {errors.question && errors.question.message}
                              </p>
                            </Form.Group>
                          </div>
                          <div className="col-md-12">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label>Questions</Form.Label>
                              <Form.Control
                                type="text"
                                name="question"
                                placeholder="Enter Questions"
                                {...register("question", {
                                  required: "Please Enter A Valid Question!",
                                })}
                              />
                              <p className="error-msg">
                                {errors.question && errors.question.message}
                              </p>
                            </Form.Group>
                          </div>
                          <Col md={12}>
                            <div>
                              <p className="mx-1">Answer</p>
                              <Controller
                                name="Answer"
                                control={control}
                                // defaultValue={editorHtml}
                                render={({ field }) => (
                                  <ReactQuill
                                    theme="snow"
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
                          <div className="col-md-12 mt-4">
                            <Link to="#">
                              <button className="btn btn-primary mx-2">
                                Back
                              </button>
                            </Link>
                            <button type="submit" className="btn btn-primary">
                              Add
                            </button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <table className="table">
                        <thead className="text-uppercase">
                          <tr>
                            <th scope="col">questions</th>
                            <th scope="col">action</th>
                          </tr>
                        </thead>
                        <tbody className="text-capitalize text-sm-start">
                          {displayUsers.map((data, id) => {
                            return (
                              <tr className="" key={id}>
                                <td className="d-flex flex-column">
                                  <small className="text-muted">
                                    <Badge
                                      pill
                                      color="primary"
                                      className="bg-opacity-25 text-primary">
                                      Maths
                                    </Badge>
                                    {data.time}
                                  </small>
                                  <small>
                                    <p className="question">{data.Question}</p>
                                  </small>
                                  <small>
                                    <ReadMore>{data.Answer}</ReadMore>
                                  </small>
                                </td>
                                <td className="text-center">
                                  <BiDotsVerticalRounded />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <Pagination
                        count={3}
                        page={currentPage}
                        onChange={handleChange}
                        shape="rounded"
                        variant="outlined"
                        //showFirstButton
                        //showLastButton
                      />
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

export default Tutorexam;
