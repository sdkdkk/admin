import React, { useState, useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import ReactQuill, { Quill } from "react-quill";
import "../Css/Tutorlist.css";
import { Col } from "react-bootstrap";
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
                            {...register("questionPhoto", { required: true })}
                            multiple
                            accept=".png,.jpg,.jpeg,.tif,.tiff,.bmp,.gif,.ico"
                          />
                          {errors?.questionPhoto && (
                            <p className="error text-danger">
                              Please upload at least one image
                            </p>
                          )}
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
                             onClick={handleChange}
                           >
                            <option value="">Select your questionType</option>
                            {questionTypes.map((type,index) => (
                              <option value={type.value} key={index}  >
                                {type.questionType}
                              </option>
                            ))}
                          </select>
                          {errors.questionType && errors.questionType.type  && (
                            <p className=" text-danger">Please select questionType</p>
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
                            {...register("questionSubject", { required: true })}
                          >
                            <option value="">Select your subject</option>
                            {questionSubject.map((type, index) => (
                              <option value={type.value} key={index}>
                                {type.questionSubject}
                              </option>
                            ))}
                          </select>
                          {errors.questionSubject && (
                            <p className=" text-danger">Please select a subject</p>
                          )}
                        </div>
                         
                        
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
