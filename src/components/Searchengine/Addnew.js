import React, { useState, useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import ReactQuill, { Quill } from "react-quill";
import "../Css/Tutorlist.css";
import { Button, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const url = process.env.REACT_APP_API_BASE_URL;

Quill.register("modules/imageResize", ImageResize);

const Addnew = () => {
  const [images, setImages] = useState([]);

  const [questionTypes, setQuestionTypes] = useState([]);
  const [questionSubject, setQuestionSubject] = useState([]);
  const [editorHtml, setEditorHtml] = useState("");

  const navigate = useNavigate();
  const [optionsArray, setOptionsArray] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isExp, setIsExp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [answerData, setAnswerData] = useState([
    [
      { id: "", value: "" },
      { id: "", value: "" },
    ],
  ]);
  const [fields, setFields] = useState([[{ value: "" }, { value: "" }]]);

  const handleAddField = () => {
    setFields([...fields, { value: "" }]);
  };

  const handleRemoveField = (index) => {
    const valuesCopy = [...fields];
    valuesCopy.splice(index, 1);
    setFields(valuesCopy);
  };

  const addAnswerData = () => {
    setAnswerData([...answerData, { id: "", value: "" }]);
  };

  const removeAnswerData = (index) => {
    const updatedAnswerData = [...answerData];
    updatedAnswerData.splice(index, 6);
    setAnswerData(updatedAnswerData);
  };

  const handleAnswerDataChange = (index, key, value) => {
    const updatedAnswerData = [...answerData];
    updatedAnswerData[index][key] = value;
    setAnswerData(updatedAnswerData);
  };

  const {
    register,
    handleSubmit,
    control,
    editorRef,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questionType: "",
    },
  });

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/getquestiontype`, {
          token: token,
        });

        setQuestionTypes(response.data.data);
        let responseArray = [];
        response.data.data.forEach((element) => {
          let obj = {
            label: "",
            value: "",
          };
          obj.label = element;
          obj.value = element;
          responseArray.push(obj);
        });
        setOptionsArray(responseArray);
      } catch (error) {
        logoutIfInvalidToken(error.response);
        if (error.response) {
        } else if (error.request) {
        } else {
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response1 = await axios.post(`${url}/getquestionsubject`, {
          token: token,
        });

        setQuestionSubject(response1.data.data);
        let responseArray1 = [];
        response1.data.data.forEach((element) => {
          let obj = {
            label: "",
            value: "",
          };
          obj.label = element;
          obj.value = element;
          responseArray1.push(obj);
        });
        setOptionsArray(responseArray1);
      } catch (error) {
        logoutIfInvalidToken(error.response1);
        if (error.response1) {
        } else if (error.request1) {
        } else {
        }
      }
    };

    fetchData1();
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value.endsWith("-exp")) {
      setIsExp(true);
    } else {
      setIsExp(false);
    }
  };

  const token = localStorage.getItem("token");

  const onSubmit = (data) => {
    console.log(data);
    if (
      selectedOption === "MatchTheFollowing-more5" ||
      selectedOption === "MatchTheFollowing-less5"
    ) {
      const formData = new FormData();
      const formattedAnswerData = answerData.map((item) => ({
        id: item.id,
        value: item.value,
      }));
      const files = data.questionPhoto;
      formData.append("question", data.question);
      formData.append("questionType", data.questionType);
      formData.append("questionSubject", data.questionSubject);
      formData.append("answer", JSON.stringify(formattedAnswerData));
      formData.append("token", token);
      for (let i = 0; i < files.length; i++) {
        formData.append(`questionPhoto`, files[i]);
      }
      formData.append("explanation", data.explanation || "");
      setIsLoading(true);
      fetch(`${url}/admin/questionpost`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          setImages([]);
          setEditorHtml("");
          setIsLoading(false);
          reset();
          navigate("/searchengine");
        })
        .catch((error) => {
          setIsLoading(false);
        });
    } else if (
      selectedOption === "FillInBlanks" ||
      selectedOption === "FillInBlanks-exp"
    ) {
      const formData = new FormData();
      const formattedAnswerData = fields.map((item) => ({
        id: item.id,
        value: item.value,
      }));
      const files = data.questionPhoto;
      formData.append("question", data.question);
      formData.append("questionType", data.questionType);
      formData.append("questionSubject", data.questionSubject);
      formData.append("answer", JSON.stringify(formattedAnswerData));
      formData.append("token", token);
      for (let i = 0; i < files.length; i++) {
        formData.append(`questionPhoto`, files[i]);
      }
      formData.append("explanation", data.explanation || "");
      setIsLoading(true);
      fetch(`${url}/admin/questionpost`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          setImages([]);
          setEditorHtml("");
          setIsLoading(false);
          reset();
          navigate("/searchengine");
        })
        .catch((error) => {
          setIsLoading(false);
        });
    } else {
      const formData = new FormData();
      const files = data.questionPhoto;
      formData.append("question", data.question);
      formData.append("questionType", data.questionType);
      formData.append("questionSubject", data.questionSubject);
      formData.append("answer", data.answer);
      formData.append("token", token);
      for (let i = 0; i < files.length; i++) {
        formData.append(`questionPhoto`, files[i]);
      }
      formData.append("explanation", data.explanation || "");
      setIsLoading(true);
      fetch(`${url}/admin/questionpost`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          setImages([]);
          setEditorHtml("");
          setIsLoading(false);
          reset();
          navigate("/searchengine");
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
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
                <h3 className="main-text">Search Engine</h3>
              </div>
              <div className="row  ">
                <div className="col-md-12 grid-margin stretch-card questionanstext">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label">
                            Image
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            name="questionPhoto"
                            {...register("questionPhoto", { required: false })}
                            multiple
                            accept=".png,.jpg,.jpeg,.tif,.tiff,.bmp,.gif,.ico"
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label">
                            Questions
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="question"
                            {...register("question", { required: true })}
                          />
                          {errors.question && (
                            <p className="error text-danger">
                              Please Enter a question
                            </p>
                          )}
                        </div>
                        <div></div>
                        <div className="mb-3 dropdown react-bootstrap-select w-100">
                          <label htmlFor="questionType" className="form-label">
                            Question Type
                          </label>
                          <select
                            id="questionType"
                            className="w-100 form-control"
                            name="questionType"
                            {...register("questionType", { required: true })}
                            onClick={handleChange}>
                            <option value="">Select your questionType</option>
                            {questionTypes.map((type, index) => (
                              <option value={type.value} key={index}>
                                {type.questionType}
                              </option>
                            ))}
                          </select>
                          {errors.questionType && errors.questionType.type && (
                            <p className=" text-danger">
                              Please select questionType
                            </p>
                          )}
                        </div>
                        <div className="mb-3 dropdown react-bootstrap-select w-100">
                          <label
                            htmlFor="questionSubject"
                            className="form-label">
                            Question Subject
                          </label>
                          <select
                            id="questionSubject"
                            className="w-100 form-control"
                            name="questionSubject"
                            {...register("questionSubject", {
                              required: true,
                            })}>
                            <option value="">Select your subject</option>
                            {questionSubject.map((type, index) => (
                              <option value={type.value} key={index}>
                                {type.questionSubject}
                              </option>
                            ))}
                          </select>
                          {errors.questionSubject && (
                            <p className=" text-danger">
                              Please select a subject
                            </p>
                          )}
                        </div>

                        {selectedOption === "ShortAnswer" ||
                        selectedOption === "ShortAnswer-exp" ||
                        selectedOption === "Definations" ||
                        selectedOption === "Writing" ||
                        selectedOption === "LongAnswer" ||
                        selectedOption === "ProblemSolving" ||
                        selectedOption === "Theory" ||
                        selectedOption === "CaseStudy-less3" ||
                        selectedOption === "CaseStudy-more3" ? (
                          <Col md={12}>
                            <div>
                              <p className="mx-1">Answer</p>
                              <Controller
                                name="answer"
                                control={control}
                                defaultValue={editorHtml}
                                render={({ field }) => (
                                  <ReactQuill
                                    theme="snow"
                                    name="answer"
                                    {...register("answer", { required: true })}
                                    modules={modules}
                                    formats={formats}
                                    bounds={"#root"}
                                    placeholder="type Here...."
                                    ref={editorRef}
                                    {...field}
                                  />
                                )}
                              />
                              {errors.answer && (
                                <p className="error text-danger">
                                  Please Enter a answer
                                </p>
                              )}
                            </div>
                          </Col>
                        ) : null}
                        {selectedOption === "MCQ" ||
                        selectedOption === "MCQ-exp" ? (
                          <div className="p--20 rbt-border radius-6 bg-primary-opacity mt-2">
                            <div className="row">
                              <p className="mx-1">Answer</p>

                              <>
                                <div className="col-lg-6">
                                  <div className="rbt-form-check p--10">
                                    <Controller
                                      control={control}
                                      name="answer"
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          className="form-check-input"
                                          type="radio"
                                          id="rbt-radio-1"
                                          value="a"
                                        />
                                      )}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="rbt-radio-1">
                                      A)
                                    </label>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="rbt-form-check p--10">
                                    <Controller
                                      control={control}
                                      name="answer"
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          className="form-check-input"
                                          type="radio"
                                          id="rbt-radio-2"
                                          value="b"
                                        />
                                      )}
                                    />
                                    <label className="form-check-label">
                                      {/* htmlFor="rbt-radio-2" */}B)
                                    </label>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="rbt-form-check p--10">
                                    <Controller
                                      control={control}
                                      name="answer"
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          className="form-check-input"
                                          type="radio"
                                          id="rbt-radio-3"
                                          value="c"
                                        />
                                      )}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="rbt-radio-1">
                                      C)
                                    </label>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="rbt-form-check p--10">
                                    <Controller
                                      control={control}
                                      name="answer"
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          className="form-check-input"
                                          type="radio"
                                          id="rbt-radio-4"
                                          value="d"
                                        />
                                      )}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="rbt-radio-1">
                                      D)
                                    </label>
                                  </div>
                                </div>
                              </>
                            </div>
                          </div>
                        ) : null}

                        {selectedOption === "TrueFalse" ? (
                          <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                            <div className="row">
                              <p className="mx-1">Answer</p>
                              <div className="col-lg-6">
                                <div className="rbt-form-check p--10">
                                  <Controller
                                    control={control}
                                    name="answer"
                                    render={({ field }) => (
                                      <>
                                        <input
                                          type="radio"
                                          {...field}
                                          id="true"
                                          value="true"
                                          checked={field.value === "true"}
                                        />
                                        <label
                                          className="form-check-label mx-2"
                                          htmlFor="rbt-radio-1">
                                          True
                                        </label>
                                      </>
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="rbt-form-check p--10">
                                  <Controller
                                    control={control}
                                    name="answer"
                                    render={({ field }) => (
                                      <>
                                        <input
                                          type="radio"
                                          {...field}
                                          id="false"
                                          value="false"
                                          checked={field.value === "false"}
                                        />
                                        <label
                                          className="form-check-label mx-2"
                                          htmlFor="rbt-radio-2">
                                          False
                                        </label>
                                      </>
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {selectedOption === "MatchTheFollowing-more5" ||
                        selectedOption === "MatchTheFollowing-less5" ? (
                          <div className="col-12 col-md-6 col-lg-8 mb-4">
                            <h5>Answer</h5>
                            {answerData.map((data, index) => (
                              <div
                                key={index}
                                className="d-flex align-items-center">
                                <input
                                  className="mr-2 mt-2 form-control"
                                  type="text"
                                  value={data.id}
                                  onChange={(e) =>
                                    handleAnswerDataChange(
                                      index,
                                      "id",
                                      e.target.value
                                    )
                                  }
                                />
                                =
                                <input
                                  className="ml-2 form-control"
                                  type="text"
                                  value={data.value}
                                  onChange={(e) =>
                                    handleAnswerDataChange(
                                      index,
                                      "value",
                                      e.target.value
                                    )
                                  }
                                />
                                <button
                                  className="btn btn-danger ml-auto mx-2"
                                  onClick={() => removeAnswerData(index)}>
                                  Remove
                                </button>
                              </div>
                            ))}
                            <button
                              className="btn btn-primary mt-2"
                              onClick={addAnswerData}>
                              Add Answer
                            </button>
                          </div>
                        ) : null}

                        {selectedOption === "FillInBlanks" ||
                        selectedOption === "FillInBlanks-exp" ? (
                          <div className="multi-field-wrapper">
                            <h5>Answer</h5>
                            <div className="d-flex">
                              <div className="multi-fields ">
                                {fields.map((field, index) => (
                                  <div key={index}>
                                    <input
                                      className="my-2"
                                      type="text"
                                      value={field.value}
                                      onChange={(e) => {
                                        const valuesCopy = [...fields];
                                        valuesCopy[index].value =
                                          e.target.value;
                                        setFields(valuesCopy);
                                      }}
                                    />
                                    {index !== 0 && (
                                      <Button
                                        className="btn-danger mx-2"
                                        type="button"
                                        onClick={() =>
                                          handleRemoveField(index)
                                        }>
                                        Remove Field
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <button
                              type="button"
                              className="rbt-btn btn-sm add-field mt-2"
                              onClick={handleAddField}>
                              Add field
                            </button>
                          </div>
                        ) : null}

                        {isExp ? (
                          <Col md={12}>
                            <div>
                              <p className="mx-1">Explanation</p>
                              <Controller
                                name="explanation"
                                control={control}
                                defaultValue={editorHtml}
                                render={({ field }) => (
                                  <ReactQuill
                                    theme="snow"
                                    name="explanation"
                                    {...register("explanation", {
                                      required: true,
                                    })}
                                    modules={modules}
                                    formats={formats}
                                    bounds={"#root"}
                                    placeholder="type Here...."
                                    ref={editorRef}
                                    {...field}
                                  />
                                )}
                              />
                              {errors.explanation && (
                                <p className="error text-danger">
                                  Please Enter a explanation
                                </p>
                              )}
                            </div>
                          </Col>
                        ) : null}

                        <div className="mt-4">
                          <Link to="/searchengine">
                            <button
                              disabled={isLoading}
                              className="btn btn-primary mx-2">
                              Back
                            </button>
                          </Link>
                          <button
                            disabled={isLoading}
                            type="submit"
                            className="btn btn-primary">
                            {isLoading ? "Posting..." : "Add"}
                          </button>
                        </div>
                      </form>
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

export default Addnew;
