import React, { useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Addnewq } from "../../Redux/Loginpages/authSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Addnew = () => {



  const [question, setQuestion] = useState('');
  const [questionType, setQuestionType] = useState('');
  const[questionSubject,setQuestionsubject]=useState('');
  const [answer, setAnswer] = useState('');
  const [images, setImages] = useState([]);
  const [explanation, setExplanation] = useState('');


  const [editorHtml, setEditorHtml] = useState("");
  const auth = useSelector((state) => state.auth);
  // const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(auth);

  const {
    register,
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

    dispatch(Addnewq(data));
    setTimeout(() => {
      navigate(" ");
    }, 500);
  };

  const handleChange = (html) => {
    setEditorHtml(html);
    console.log(html);
  };


  const token = localStorage.getItem('token')

  const HandleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('question', question);
    formData.append('questionType', questionType);
    formData.append('questionSubject', questionSubject);
    formData.append('answer', answer);
    formData.append('token', token);

    for (let i = 0; i < images.length; i++) {
      formData.append('questionPhoto', images[i]);
    }
    formData.append('explanation', explanation);



    fetch('http://10.10.10.29:5000/admin/questionpost', {
      method: 'POST',
      body: formData,
      
    })
      .then(response => {
        // handle response
        console.log(response);
      })
      .catch(error => {
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



  const handleExplanationChange = (value) => {
    setExplanation(value);
  };

  const handleAnswerChange=(value)=>{
    setAnswer(value)
  }


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
                      <form onSubmit={HandleSubmit}>

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
                             multiple onChange={handleImageChange}
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
                            value={question} 
                            onChange={(event) => setQuestion(event.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label">
                            Questions Type
                          </label>
                          <input
                            type="text" 
                            value={questionType} 
                            className="form-control"
                            onChange={(event) => setQuestionType(event.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label">
                            Questions Subject
                          </label>
                          <input
                             type="text" 
                             value={questionSubject} 
                             className="form-control"
                             onChange={(event) => setQuestionsubject(event.target.value)}
                          />
                        </div>
                        <Col md={12}>
                          <div>
                            <p className="mx-1">Answer</p>
                                <ReactQuill
                                value={answer || ''}
                                
                                onChange={handleAnswerChange}
                               />
                          </div>
                        </Col>
                        <Col md={12}>
                          <div>
                            <p className="mx-1">Explanation</p>
                                <ReactQuill
                                value={explanation} 
                                onChange={handleExplanationChange}
                                />
                          </div>
                        </Col>
                        <div>
                          {/* <button className="btn btn-primary mx-2">Back</button> */}
                          <button type="submit" className="btn btn-primary mt">
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
