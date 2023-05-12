import React, { useState } from "react";
import "./Que.css";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const Questionanswer = () => {
  const location = useLocation();
  console.log(location.state.data.allQuestions);

  const [imageSrc, setImageSrc] = useState("");
  const [show, setShow] = useState(false);

  const handleImageClick = (url) => {
    setShow(true);
    setImageSrc(url);
  };

  return (
    <>
      <div className="container-scroller">
        {/* <Navbar /> */}
        <div className="container-fluid page-body-wrapper">
          {/* <Sidebar /> */}
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
            </div>
            <div className="content mt-3">
              <div className="row">
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Question</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    Q 01. {location.state.data.allQuestions.question}?
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
                        className="profile-img mt-3"
                        alt=""
                      />
                    )
                  )}
                </div>
                <div className="col-md-12 col-lg-12 mb--20">
                  <h5>Answer</h5>
                  <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                    {location.state.data.allQuestions.answer}
                  </div>
                </div>
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

export default Questionanswer;
