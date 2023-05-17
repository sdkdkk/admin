import React, { useState } from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Moment from "react-moment";

const Fillups = () => {
  const location = useLocation();
  const answerData = location.state?.data?.allQuestions?.answer
    ? JSON.parse(location.state.data.allQuestions.answer)
    : [];
  console.log(location.state.data.allQuestions.answer);

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
              {location.state.data.allQuestions.dateOfPosted && (
                <p>
                  Date Of Posted:
                  <Moment format="DD MMM YYYY" withTitle>
                    {location.state.data.allQuestions.dateOfPosted}
                  </Moment>
                </p>
              )}
            </div>
            <div className="content mt-2">
              <div className="row">
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Question</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    Q 01. {location.state.data.allQuestions.question}
                    <br />
                  </div>
                </div>
                {location.state.data.allQuestions.questionPhoto.map(
                  (photoUrl) => (
                    <img
                      key={photoUrl}
                      src={photoUrl}
                      style={{
                        width: "200px",
                        height: "200px",
                      }}
                      onClick={() => handleImageClick(photoUrl)}
                      className="profile-img"
                      alt=""
                    />
                  )
                )}
                {answerData.length > 0 && (
                  <div className="col-md-12 col-lg-12 mb--20">
                    <h5>Answer</h5>
                    <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                      {answerData.map((data, id) => (
                        <p key={id}>
                          <span className="mx-3 fw-bolder">{id + 1})</span>{" "}
                          {data}
                        </p>
                      ))}
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

export default Fillups;
