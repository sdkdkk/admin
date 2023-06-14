import React, { useState, useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import ReactQuill, { Quill } from "react-quill";
import "../Css/Tutorlist.css";
import { Button, Col, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { postAdminQuestionsApi } from "../../Redux/Loginpages/postAdminQuestionSlice";
import { getAdminQuestions } from "../../Redux/Loginpages/getAdminQuestionSlice";
import { ColorRing } from "react-loader-spinner";


Quill.register("modules/imageResize", ImageResize);

const QuestionAnswerAll = () => {
    const { id,  } = useParams()
const navigate =useNavigate()
  const postAdminQuestions = useSelector((state) => state.postAdminQuestions)
  console.log(postAdminQuestions)
  
 const [showModal, setShowModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const handleImageClick = (src) => {
    setModalImageSrc(src);
    setShowModal(true);
  };
  const [editorHtml, setEditorHtml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 const [answerData, setAnswerData] = useState([{ id: "", value: "" }, { id: "", value: "" }]);
  const dispatch =useDispatch()
    const token = localStorage.getItem("token");
     const [fields, setFields] = useState([{  value: "" },{  value: "" }]);
  console.log(fields);

  const handleAddField = () => {
    setFields([...fields, {  value: "" }]);
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
  const { register, handleSubmit, control, editorRef,reset,formState: { errors }} = useForm({});

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
  const getAdminQuestionsState = useSelector((state) => state.getAdminQuestions);
  const filterData = getAdminQuestionsState?.data?.transactions?.filter((item) =>item._id === id);
  console.log(filterData?.[0])
 
  const questionPhoto = filterData?.[0]?.questionPhoto
  const selectType = filterData?.[0]?.questionType
 

  const [whomtoAsk, setWhomtoAsk] = useState("tutor" ||"admin" || "reanswer" || "unsolved");
 
    const [questionSubject, setQuestionSubject] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

   const getQuestionList = () => {

     const payload = { questionType, questionSubject, whomto_ask :whomtoAsk, limit: 5, skip: (currentPage - 1) * 5, };
  setIsLoading(true)
     dispatch(getAdminQuestions(payload));
       setIsLoading(false)
    };
  
  useEffect(() => {
     setIsLoading(true)
    getQuestionList();
      setIsLoading(false)
   }, [questionSubject, questionType, whomtoAsk]);
  
   
  useEffect(() => {
        setIsLoading(true);
        reset(filterData?.[0])
        setIsLoading(false);
        }, [filterData?.[0]])

    const onSubmit = (data) => {
        
      console.log(data);
      

      const formattedAnswerData = answerData.map((item) => ({
        id: item.id,
        value: item.value,
      }));
      const formDataObj = {
            token: token,
            questionId:id,
            answer: (selectType === "FillInBlanks" || selectType === "FillInBlanks-exp" || selectType === "MatchTheFollowing-more5" || selectType === "MatchTheFollowing-less5")
                ? JSON.stringify(formattedAnswerData)
                 : data.answer,
            explanation:data.explanation || ""
      }
    
        setIsLoading(true);
        dispatch(postAdminQuestionsApi(formDataObj))
      setIsLoading(false);

        if (postAdminQuestions?.data?.message ==="Answer Submitted Successfully." )  {
          navigate(data.whomto_ask === "tutor" ? "/tutorque" :filterData?.[0]?.whomto_ask  === "admin"?"/adminque" : filterData?.[0]?.whomto_ask  === "reanswer"?"/reanswer": filterData?.[0]?.whomto_ask  === "unsolved"? "/unsolved":"")
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
                  <div className={`card-body card table ${getAdminQuestions?.isLoading || postAdminQuestions?.isLoading ? "card-loading" : ""}`}
>
                    <div className="card-body">
                     <form onSubmit={handleSubmit(onSubmit)} >
                        
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
                            {...register("question")}
                            readOnly
                          />
                          <div>
                            <img src={questionPhoto?.[0]} onClick={() => handleImageClick(questionPhoto[0])} alt="" className="my-3" />
                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                              <Modal.Body className="text-center">
                                <img src={modalImageSrc} alt="modal-img" />
                              </Modal.Body>
                            </Modal>
                          </div>
                        </div>
                        <div></div>
                        <div className="mb-3  dropdown react-bootstrap-select w-100">
                          <label htmlFor="questionType" className="form-label">
                            Question Type
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="questionType"
                            {...register("questionType")}
                            readOnly
                          />
                                            
                        </div>
                        <div className="mb-3 dropdown react-bootstrap-select w-100">
                          <label
                            htmlFor="questionSubject"
                            className="form-label">
                            Question Subject
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="questionSubject"
                            {...register("questionSubject")}
                            readOnly
                          />
                        </div>

                          {selectType === "ShortAnswer" ||
                           selectType ==="CaseStudy-less3"||
                          selectType === "ShortAnswer-exp" ||
                          selectType === "Definations" ||
                          selectType === "Writing" ||
                          selectType === "LongAnswer" ||
                          selectType === "ProblemSolving" ||
                          selectType === "CaseStudy-more3" ||
                          selectType === "Theory" ? (
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

                        {selectType === "MCQ" ||
                          selectType === "MCQ-exp" ? (
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
                                      B)
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

                        {selectType === "TrueFalse" || selectType === "TrueFalse-exp" ? (
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
                                          checked={field.value === "true"} // Set the checked state based on the field value
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
                                          checked={field.value === "false"} // Set the checked state based on the field value
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

                        {selectType === "MatchTheFollowing-more5" ||
                          selectType === "MatchTheFollowing-less5" ? (
                          <div className="col-md-12 col-lg-12 mb--20">
                            <h5>Answer</h5>
                            {answerData?.map((data, index) => (
                              <div key={index}>
                                <input
                                  className="mr-2"
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
                                  className="ml-2"
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
                                <Button className="btn-danger my-3 mx-2 p-2 mt-2" onClick={() => removeAnswerData(index)}>
                                  Remove
                                </Button>
                              </div>
                            ))}
                            <Button className="btn-primary" onClick={addAnswerData}>Add Answer</Button>
                          </div>
                        ) : null}

                        {selectType === "FillInBlanks" ||
                          selectType === "FillInBlanks-exp" ? (
                          <div className="multi-field-wrapper">
                            <h5>Answer</h5>
                            <div className="d-flex">
                              <div className="multi-fields ">
                                {fields.map((field, index) => (
                                  <div key={index} >
                                    <input
                                      className="my-2"
                                      type="text"
                                      value={field.value}
                                      onChange={(e) => {
                                        const valuesCopy = [...fields];
                                        valuesCopy[index].value = e.target.value;
                                        setFields(valuesCopy);
                                      }}
                                    />
                                    {index !== 0 && (
                                      <Button className="btn-danger mx-2"
                                        type="button"
                                        onClick={() => handleRemoveField(index)}>
                                        Remove Field
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <button
                              type="button"
                              className="rbt-btn btn-sm add-field my-3"
                              onClick={handleAddField}>
                              Add field
                            </button>
                          </div>
                        ) : null}
                        

                        {selectType === "MCQ-exp" || selectType === "FillInBlanks-exp" || selectType === "ShortAnswer-exp" || selectType === "TrueFalse-exp" ? (
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

export default QuestionAnswerAll;
