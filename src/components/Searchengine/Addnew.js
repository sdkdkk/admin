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
  const [editorHtml, setEditorHtml] = useState("");
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(auth);

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
                            Questions
                          </label>
                          <input
                            type="text"
                            name="question"
                            {...register("question", {
                              required: "Please Enter A Valid Question!",
                            })}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                          />
                          <p className="error-msg">
                            {errors.question && errors.question.message}
                          </p>
                        </div>
                        <Col md={12}>
                          <div>
                            <p className="mx-1">Answer</p>
                            <Controller
                              name="Answer"
                              control={control}
                              defaultValue={editorHtml}
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
                            <p className="error-msg" >
                              {errors.answer && errors.answer.message}
                            </p>
                          </div>
                        </Col>
                        <div>
                          <button className="btn btn-primary mx-2">Back</button>
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
