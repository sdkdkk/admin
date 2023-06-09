import React, { useState } from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Moment from "react-moment";
import DOMPurify from "dompurify";

const McqquestionSearchengine = () => {
  const location = useLocation();
  const answer = DOMPurify.sanitize(location.state.data.answer, {
    ALLOWED_TAGS: [],
  });

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
            <div className="text-start">
              <p>
                <span className="text-dark">Question Subject: </span>
                {location.state.data.questionSubject}
              </p>
              <p>Question Type: {location.state.data.questionType}</p>
              <p>Status: {location.state.data.status}</p>
              {location.state.data.createdAt && (
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
                    Q 01.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: location.state.data.question,
                      }}
                    />
                    ?
                  </div>
                  {location.state.data.questionPhoto.map((photoUrl) => (
                    <img
                      key={photoUrl}
                      src={photoUrl}
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                      onClick={() => handleImageClick(photoUrl)}
                      className="profile-img mt-2"
                      alt=""
                    />
                  ))}
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
                              checked={answer === "a"} 
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
                            <input
                              className="form-check-input"
                              type="radio"
                              name="rbt-radio"
                              id="rbt-radio-2"
                              value="b"
                              checked={answer === "b"} 
                            />
                            <label
                              className="form-check-label"
                              htmlFor="rbt-radio-2">
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
                              checked={answer === "c"} 
                            />
                            <label
                              className="form-check-label"
                              htmlFor="rbt-radio-3">
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
                              checked={answer === "d"} 
                            />
                            <label
                              className="form-check-label"
                              htmlFor="rbt-radio-4">
                              D)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {location.state.data.explanation && (
                  <div className="col-md-12 col-lg-12 mb--20 ">
                    <h5>Explanation</h5>
                    <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: location.state.data.explanation,
                        }}
                      />
                      <br />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="text-center">
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

export default McqquestionSearchengine;
