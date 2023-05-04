import React, { useState, useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const Addnew = () => {
  // const [question, setQuestion] = useState('');
  // const [questionType, setQuestionType] = useState("");
  // const [questionSubject, setQuestionsubject] = useState('');
  // const [answer, setAnswer] = useState("");
  const [images, setImages] = useState([]);
  // const [explanation, setExplanation] = useState("");
  const [questionTypes, setQuestionTypes] = useState([]);
  const [editorHtml, setEditorHtml] = useState("");
  const [optionsArray, setOptionsArray] = useState([])
  const [selectedOption, setSelectedOption] = useState("");
  const [isExp, setIsExp] = useState(false);

  const {
    register,
    handleSubmit,
    formats,
    control,
    modules,
    editorRef,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vaidik-backend.onrender.com/getquestiontype`,
          {
            token: token,
          }
        );

        setQuestionTypes(response.data.data);
        let responseArray = []
        response.data.data.forEach(element => {
          let obj = {
            label: '',
            value: ''
          }
          obj.label = element
          obj.value = element
          responseArray.push(obj)
        })
        setOptionsArray(responseArray)
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if(event.target.value.endsWith('-exp')){
      setIsExp(true)
    }
    // setQuestionType(event.target.value);
  };

  const token = localStorage.getItem("token");
  const onSubmit = (data) => {
    console.log("---> ",selectedOption)
    const formData = new FormData();
    formData.append("question", data.question);
    formData.append("questionType", selectedOption);
    formData.append("questionSubject", data.questionSubject);
    formData.append("answer", data.answer);
    formData.append("token", token);
    for (let i = 0; i < images.length; i++) {
      formData.append("questionPhoto", data.images[i]);
    }
    formData.append("explanation", data.explanation);

    fetch("https://vaidik-backend.onrender.com/admin/questionpost", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // handle error
      });
  };
  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length && i < 4; i++) {
      imagesArray.push(files[i]);
    }
    setImages(imagesArray);
  };

  // const handleExplanationChange = (value) => {
  //   setExplanation(value);
  // };

  // const handleAnswerChange = (value) => {
  //   setAnswer(value);
  // };

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
                            className="form-control"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            {...register("images", { required: true })}
                          />
                          {errors.images && (
                            <p className="error">
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
                            // value={question}
                            // onChange={(event) => setQuestion(event.target.value)}
                            {...register("question", { required: true })}
                          />
                          {errors.question && (
                            <p className="error">Please Enter a question</p>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="questionType" className="form-label">
                            Question Type
                          </label>
                          {console.log(selectedOption)}
                          <select
                            id="questionType"
                            className="form-control"
                            name="questionType"
                            value={selectedOption}
                            onChange={(e)=> handleChange(e)}
                            // {...register("questionType", { required: true })}
                            >
                            <option value="">Select question type</option>
                            {optionsArray.map((type) => (
                              <option value={type.value} key={type.value}>{type.label}</option>
                            ))}
                          </select>
                          {errors.questionType && (
                            <p className="error">
                              Please select a type of question
                            </p>
                          )}
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label">
                            Questions Subject
                          </label>
                          <input
                            type="text"
                            // value={questionSubject}
                            className="form-control"
                            name="questionSubject"
                            {...register("questionSubject", { required: true })}
                            // onChange={(event) => setQuestionsubject(event.target.value)}
                          />
                          {errors.questionSubject && (
                            <p className="error">Please Enter a Subject</p>
                          )}
                        </div>
                        {/* <Col md={12}>
                          <div>
                            <p className="mx-1">Answer</p>
                            <ReactQuill
                            type="answer"
                              // value={answer || ''}
                              name="answer"
                              {...register("answer", { required: true })}
                              // onChange={handleAnswerChange}
                            />
                           {errors.answer && <p className="error">Please upload at least one image</p>}
                          </div>
                        </Col> */}
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
                                  //onChange={(value) => setEditorHtml(value)}
                                  // value={answer || ""}
                                  modules={modules}
                                  formats={formats}
                                  // onChange={handleAnswerChange}
                                  bounds={"#root"}
                                  placeholder="type Here...."
                                  ref={editorRef}
                                  {...field}
                                />
                              )}
                            />
                            {errors.answer && (
                              <p className="error">Please Enter a answer</p>
                            )}
                          </div>
                        </Col>
                        {/* <Col md={12}>
                          <div>
                            <p className="mx-1">Explanation</p>
                            <ReactQuill
                              type="explanation"
                              name="explanation"
                              // value={explanation}
                              
                              // onChange={handleExplanationChange}
                              {...register("explanation", { required: true })}
                              
                            />
                           {errors.explanation && <p className="error">Please upload at least one image</p>}
                       
                          </div>
                          
                        </Col> */}
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
                                  //onChange={(value) => setEditorHtml(value)}
                                  // value={answer || ""}
                                  modules={modules}
                                  formats={formats}
                                  // onChange={handleExplanationChange}
                                  bounds={"#root"}
                                  placeholder="type Here...."
                                  ref={editorRef}
                                  {...field}
                                />
                              )}
                            />
                            {errors.explanation && (
                              <p className="error">
                                Please Enter a explanation
                              </p>
                            )}
                          </div>
                        </Col>
                        ): null}
                        <div className="mt-4">
                          <Link to="/searchengine">
                            <button className="btn btn-primary mx-2">
                              Back
                            </button>
                          </Link>
                          <button type="submit" className="btn btn-primary">
                            Add
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