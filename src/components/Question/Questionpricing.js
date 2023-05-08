import React from "react";
import { useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Form, Button } from "react-bootstrap";
import { questiontypeApi } from "../../Redux/Loginpages/questiontypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { questionpricingApi } from "../../Redux/Loginpages/questionPricingSlice";

const Questionpricing = () => {
  const { register, handleSubmit } = useForm({});

  const dispatch = useDispatch();
  const questiontype = useSelector((state) => state.questiontype);
  console.log(questiontype);

  useEffect(() => {
    let token = localStorage.getItem("token");
    dispatch(questiontypeApi(token));
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    let token = localStorage.getItem("token");
    const pricingData = {
      token: token,
      Type: data.Type,
      question_price: data.question_price,
      tutor_price: data.tutor_price,
      admin_price: data.admin_price,
    };

    dispatch(questionpricingApi(pricingData));
  };

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Question Pricing</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6>Question Type</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <Form.Select
                              aria-label="Default select example"
                              {...register("Type")}
                            >
                              <option>Open this select menu</option>
                              {questiontype.user &&
                                questiontype.user.data.map((item) => (
                                  <option
                                    key={item._id}
                                    value={item.questionType}
                                  >
                                    {item.questionType}
                                  </option>
                                ))}
                            </Form.Select>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6>Question Pricing</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="input-group mb-3 form-inline">
                              <input
                                type="number"
                                className="form-control me-2"
                                id="hoursInput"
                                {...register("question_price")}
                              />
                              <span className="input-group-text">INR</span>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6>Tutor Pricing</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="input-group mb-3 form-inline">
                              <input
                                type="number"
                                className="form-control me-2"
                                id="hoursInput"
                                {...register("tutor_price")}
                              />
                              <span className="input-group-text">INR</span>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6>Admin Pricing</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="input-group mb-3 form-inline">
                              <input
                                type="number"
                                className="form-control me-2"
                                id="hoursInput"
                                {...register("admin_price")}
                              />
                              <span className="input-group-text">INR</span>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-lg-2 col-md-4">
                            <h6>&nbsp;</h6>
                          </div>
                          <div className="col-lg-4 col-md-8 mb-2 text-md-end">
                            <Button variant="primary" type="submit">
                              Submit
                            </Button>
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
    </>
  );
};

export default Questionpricing;
