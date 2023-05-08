import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import "./Exam.css";
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
import { getTutorQuestionsListApi } from "../../Redux/Loginpages/getTutorQuestionListSlice";
import {
  postTutorQuestionApi,
  reset as resetPostTutorQuestionApi,
} from "../../Redux/Loginpages/postTutorQuestionListSlice";
import {
  deleteTutorQuestion,
  reset as resetDeleteTutorQuestion,
} from "../../Redux/Loginpages/deleteTutorQuestionSlice";
import { updateTutorQuestionApi } from "../../Redux/Loginpages/updateTutorQuestionSlice";

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
        style={{ color: "blue" }}
      >
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

const Tutorexam = () => {
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [isOpen, setIsOpen] = useState("");
  const [questionSubject, setQuestionSubject] = useState("Maths");
  const [questionType, setQuestionType] = useState("MCQ");
  const [mcqoptions, setMcqoptions] = useState([]);
  const [editQuestionData, setEditQuestionData] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers = Studentdata.slice(indexOfFirstPage, indexOfLastPage);
  const getTutorQuestionsListData = useSelector(
    (state) => state.getTutorQuestionsList
  );
  const postTutorQuestionData = useSelector((state) => state.postTutorQuestion);
  const updateTutorQuestionData = useSelector((state) => state.updateTutorQuestion);
  const deleteTutorQuestionData = useSelector(
    (state) => state.deleteTutorQuestion
  );


  const { tutorexamquestion = [] } = getTutorQuestionsListData.data || [];
  const tutorexamquestionData = tutorexamquestion || [];
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(auth);



  useEffect(() => {
    const payload = {
      questionSubject,
      questionType,
      limit: 6,
      skip: (currentPage - 1) * 6,
    };

    dispatch(getTutorQuestionsListApi(payload));
  }, [questionSubject, questionType, currentPage]);

  useEffect(() => {
    const payload = {
      questionSubject,
      questionType,
      limit: 6,
      skip: (currentPage - 1) * 6,
    };
    if (deleteTutorQuestionData?.isSuccess) {
      dispatch(getTutorQuestionsListApi(payload));
      dispatch(resetDeleteTutorQuestion());
    }
  }, [deleteTutorQuestionData?.isSuccess]);

  const handleDropdownClick = (id) => {
    setIsOpen(isOpen === id ? "" : id);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteTutorQuestion(id));
  };

  const handleUpdateClick = (data) => {
    if (data?.mcqoptions) {
      setMcqoptions(data.mcqoptions);
    }
    setDefaultValues({
      answer: data.answer,
      questionSubject: data.questionSubject,
      question: data.question,
      questionType: data.questionType,
      id: data._id,
    });
    setEditQuestionData(true);
    setIsOpen("");
  
  };

  const {
    register,
    handleSubmit,
    reset,
    formats,
    control,
    values,
    modules,
    editorRef,
    formState: { errors },
  } = useForm({ values: defaultValues });

  useEffect(() => {
    const payload = {
      questionSubject,
      questionType,
      limit: 6,
      skip: (currentPage - 1) * 6,
    };
    if (postTutorQuestionData?.isSuccess || updateTutorQuestionData?.isSuccess) {
      reset();
      setMcqoptions([]);
      dispatch(getTutorQuestionsListApi(payload));
      dispatch(resetPostTutorQuestionApi());
    }
  }, [postTutorQuestionData?.isSuccess || updateTutorQuestionData?.isSuccess]);


  const onSubmit = (data) => {
    const rest = data.questionType === "MCQ" ? { mcqoptions: mcqoptions } : {};
    if (editQuestionData) {
      dispatch(
        updateTutorQuestionApi({ ...data, ...rest, id: defaultValues.id })
      );
    } else {
      dispatch(postTutorQuestionApi({ ...data, ...rest }));
    }
    setTimeout(() => {
      navigate(" ");
    }, 500);
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
                <h3 className="main-text">Tutor Exam Question</h3>
              </div>
              <div className="page-header mt-4">
                <div className="mb-2 mt-2">
                  <Link to="/addnew">
                    <Button variant="primary" size="lg">
                      Add New
                    </Button>
                  </Link>
                  <Link to="/tutorsearch">
                    <Button
                      className="search-btn mx-2"
                      variant="secondary"
                      size="lg"
                    >
                      Search Question
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
                            <Form.Label>Select Subject</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              name="questionSubject"
                              {...register("questionSubject")}
                            >
                              <option>Select Subject</option>
                              <option value="Maths">Maths</option>
                              <option value="Biology">Biology</option>
                              <option value="Physics">Physics </option>
                            </Form.Select>
                            {errors.questionSubject && (
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
                              controlId="formBasicEmail"
                            >
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
                            <div className="dropdown">
                              <Form.Label>Select Question Type</Form.Label>
                              <Form.Select
                                aria-label="Default select example"
                                name="questionType"
                                {...register("questionType")}
                              >
                                <option>Select Subject</option>
                                <option value="MCQ">MCQ</option>
                                <option value="Theory">Theory</option>
                              </Form.Select>
                              {errors.questionType && (
                                <p className="text-danger">
                                  Please select a Class
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-12 mb--20 mt-4">
                            <h5>MCQ</h5>
                            <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="rbt-form-check p--10">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="rbt-radio"
                                      id="rbt-radio-1"
                                    />
                                    <input
                                      className="form-check-label"
                                      htmlFor="rbt-radio-1"
                                      onChange={(e) => {
                                        const tempmcqoptions = mcqoptions;
                                        tempmcqoptions[0] = e.target.value;
                                        setMcqoptions(tempmcqoptions);
                                      }}
                                      value={mcqoptions[0]}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="rbt-form-check p--10">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="rbt-radio"
                                      id="rbt-radio-2"
                                    />
                                    <input
                                      className="form-check-label"
                                      htmlFor="rbt-radio-1"
                                      onChange={(e) => {
                                        const tempmcqoptions = mcqoptions;
                                        tempmcqoptions[1] = e.target.value;
                                        setMcqoptions(tempmcqoptions);
                                      }}
                                      value={mcqoptions[1]}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="rbt-form-check p--10">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="rbt-radio"
                                      id="rbt-radio-3"
                                    />
                                    <input
                                      className="form-check-label"
                                      htmlFor="rbt-radio-1"
                                      onChange={(e) => {
                                        const tempmcqoptions = mcqoptions;
                                        tempmcqoptions[2] = e.target.value;
                                        setMcqoptions(tempmcqoptions);
                                      }}
                                      value={mcqoptions[2]}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="rbt-form-check p--10">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="rbt-radio"
                                      id="rbt-radio-4"
                                    />
                                    <input
                                      className="form-check-label"
                                      htmlFor="rbt-radio-1"
                                      onChange={(e) => {
                                        const tempmcqoptions = mcqoptions;
                                        tempmcqoptions[3] = e.target.value;
                                        setMcqoptions(tempmcqoptions);
                                      }}
                                      value={mcqoptions[3]}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Col md={12}>
                            <div>
                              <p className="mx-1 mt-2">Answer</p>
                              <Controller
                                name="answer"
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
                              <button
                                disabled={postTutorQuestionData?.isLoading || updateTutorQuestionData?.isLoading}
                                className="btn btn-primary mx-2"
                              >
                                Back
                              </button>
                            </Link>
                            <button
                              disabled={postTutorQuestionData?.isLoading || updateTutorQuestionData?.isLoading}
                              type="submit"
                              className="btn btn-primary"
                            >
                              {editQuestionData ? (
                                <>{updateTutorQuestionData?.isLoading ? "Updating..." : "Update"}</>
                              ) : (
                                <>
                                  {postTutorQuestionData?.isLoading
                                    ? "Posting..."
                                    : "Add"}
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row justify-content-end">
                <div className="col-lg-4">
                  <div className="filter-select rbt-modern-select mb--10">
                    <label>Question Subject :</label>
                    <div className="dropdown react-bootstrap-select w-100">
                      <select
                        className="w-100 form-select"
                        value={questionSubject}
                        onChange={(e) => setQuestionSubject(e.target.value)}
                        id="displayname"
                      >
                        <option value="Maths">Maths</option>
                        <option value="English">English</option>
                        <option value="Computer">Computer</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="filter-select rbt-modern-select mb--10">
                    <label>Question Type :</label>
                    <div className="dropdown react-bootstrap-select w-100">
                      <select
                        className="w-100 form-select"
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value)}
                        id="displayname"
                      >
                        <option value="MCQ">MCQ</option>
                        <option value="MCQ-exp">MCQ-exp</option>
                        <option value="TrueFalse">True / False</option>
                        <option value="TrueFalse-exp">True / False-exp</option>
                        <option value="FillInBlanks">Fill In the Blanks</option>
                        <option value="FillInBlanks-exp">
                          Fill In the Blanks-exp
                        </option>
                        <option value="ShortAnswer">Short Answer</option>
                        <option value="MatchTheFollowing-less5">
                          Match The Following-less5
                        </option>
                        <option value="MatchTheFollowing-more5">
                          Match The Following-more5
                        </option>
                        <option value="ProblemSolving">Problem Solving</option>
                        <option value="LongAnswer">Long Answer</option>
                        <option value="Writing">Writing</option>
                        <option value="CaseStudy-more3">CaseStudy-more3</option>
                        <option value="CaseStudy-less3">CaseStudy-less3</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead class="text-uppercase">
                            <tr>
                              <th scope="col">Question</th>
                              <th scope="col">Question Type</th>
                              <th scope="col">Question Subject</th>
                              {/* <th scope="col">Action</th> */}
                            </tr>
                          </thead>
                          <tbody class="text-capitalize text-sm-start">
                            {[...tutorexamquestionData].map((data, id) => {
                              return (
                                <tr class="" key={data._id}>
                                  <td class="d-flex flex-column">
                                    <small class="text-muted">
                                      <Badge
                                        pill
                                        color="primary"
                                        class="bg-opacity-25 text-primary"
                                      >
                                        {data.questionType}
                                      </Badge>
                                      {data.questionSubject}
                                    </small>
                                    <small>
                                      <p class="question">{data.question}</p>
                                    </small>
                                    <small>
                                      <ReadMore>{data.answer}</ReadMore>
                                    </small>
                                  </td>
                                  <td>{data.questionType}</td>
                                  <td>{data.questionSubject}</td>
                                  <td class="text-center">
                                    <div className="dropdown">
                                      <button
                                        className="dropdown__button"
                                        onClick={() =>
                                          handleDropdownClick(data._id)
                                        }
                                      >
                                        <BiDotsVerticalRounded />
                                      </button>
                                      {data._id === isOpen && (
                                        <div
                                          style={{ left: "-44px" }}
                                          className="dropdown__popup"
                                        >
                                          <ul className="dropdown__list">
                                            <li
                                              onClick={() =>
                                                handleUpdateClick(data)
                                              }
                                            >
                                              Edit
                                            </li>
                                            <li
                                              onClick={() =>
                                                handleDeleteClick(data._id)
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
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
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
