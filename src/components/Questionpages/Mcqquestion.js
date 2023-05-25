import React, { useState } from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Moment from "react-moment";

const Mcqquestion = () => {
  const location = useLocation();
  console.log(location.state.data);
  const answer = location.state.data.allQuestions.answer; // Get the answer from location

  const [imageSrc, setImageSrc] = useState("");
  const [show, setShow] = useState(false);

  const handleImageClick = (url) => {
    setShow(true);
    setImageSrc(url);
  };

  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <div className="container-fluid">
            <div className="mx-2 text-start">
              <p>
                <span className="text-dark">Question Subject:</span>
                {location.state.data.allQuestions.questionSubject}
              </p>
              <p>
                Question Type:{location.state.data.allQuestions.questionType}
              </p>
              <p>Status:{location.state.data.allQuestions.status}</p>
              {location.state.data.allQuestions.createdAt && (
                <p>
                  Date Of Posted:
                  <Moment format="DD MMM YYYY" withTitle>
                    {location.state.data.createdAt}
                  </Moment>
                </p>
              )}
            </div>
            <div className="content mt-2">
              <div className="row">
                <div className="col-md-12 col-lg-12 mb--20 ">
                  <h5>Question</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    Q 01.{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: location.state.data.allQuestions.question,
                      }}
                    />
                    ?
                  </div>
                </div>
                {answer && (
                  <div className="col-md-12 col-lg-12 mb--20">
                    <h5>Answer</h5>
                    <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="rbt-form-check p--10">
                            <input
                              className="form-check-input "
                              type="radio"
                              name="rbt-radio"
                              id="rbt-radio-1"
                              value="a"
                              checked={answer === "a"} // Set the checked state based on the answer
                            />
                            <label
                              className="form-check-label"
                              htmlFor="rbt-radio-1">
                              {" "}
                              A)
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="rbt-form-check p--10">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="rbt-radio"
                              id="rbt-radio-2"
                              value="b"
                              checked={answer === "b"} // Set the checked state based on the answer
                            />
                            <label
                              className="form-check-label"
                              htmlFor="rbt-radio-2">
                              {" "}
                              B)
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="rbt-form-check p--10">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="rbt-radio"
                              id="rbt-radio-3"
                              value="c"
                              checked={answer === "c"} // Set the checked state based on the answer
                            />
                            <label
                              className="form-check-label"
                              htmlFor="rbt-radio-3">
                              {" "}
                              C)
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="rbt-form-check p--10">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="rbt-radio"
                              id="rbt-radio-4"
                              value="d"
                              checked={answer === "d"} // Set the checked state based on the answer
                            />
                            <label
                              className="form-check-label"
                              htmlFor="rbt-radio-4">
                              {" "}
                              D)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* image show modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="text-center">
          {" "}
          <img
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            src={imageSrc}
            alt="modal-img"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Mcqquestion;
