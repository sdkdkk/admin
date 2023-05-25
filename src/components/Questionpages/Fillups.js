import React, { useState } from "react";
import "./Que.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Moment from "react-moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import Footer from "../shared/Footer";

const Fillups = () => {
  const history = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const notify = (data) => toast(data);
  const errorToast = (data) => toast.error(data);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [show, setShow] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const getAdminQuestionsState = useSelector(
    (state) => state.getAdminQuestions
  );
  const { transactions = [] } = getAdminQuestionsState?.data || {};
  const questionDetails = transactions?.find((a) => a._id === id) || {};

  const {
    questionSubject,
    questionType,
    status,
    questionPhoto = [],
    createdAt,
    question,
  } = questionDetails || {};

  const postAnswer = async () => {
     
    setLoading(true);
    try {
      const response = await axios.post(
        `https://vaidik-backend.onrender.com/api/v1/admin/sendanswer`,
        {
          token: token,
          questionId: id,
          answer: answer,
          explanation: "",
        }
      );
      if (response) {
        notify(response.data.message);
        history(`/questions`);
      }
    } catch (error) {
      logoutIfInvalidToken(error.response);
      errorToast(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (url) => {
    setShow(true);
    setImageSrc(url);
  };
  const [updatedQuestion, setUpdatedQuestion] = useState(question);

  const handleQuestionChange = (e) => {
    setUpdatedQuestion(e.target.value);
  };
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="mx-2 text-start">
                <p>
                  <span className="text-dark">Question Subject:</span>
                  {questionSubject}
                </p>
                <p>Question Type:{questionType}</p>
                <p>Status:{status}</p>
                {createdAt && (
                  <p>
                    Date Of Posted:
                    <Moment format="DD MMM YYYY" withTitle>
                      {createdAt}
                    </Moment>
                  </p>
                )}
              </div>
              <div className="content mt-2">
                <div className="row">
                  <div className="col-md-12 col-lg-12 mb--20">
                    <h5>Question</h5>
                    <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                      Q 01. {question}?
                      <br />
                    </div>
                  </div>
                  {questionPhoto.map((photoUrl) => (
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
                  ))}
                  {true && (
                    <div className="col-md-12 col-lg-12 mb--20">
                      <h5>Answer</h5>
                      <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                        <textarea
                          onChange={(e) => setAnswer(e.target.value)}
                          style={{ width: "100%" }}
                        ></textarea>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  className="mt-4"
                >
                  <span></span>
                  <button
                    disabled={loading}
                    type="submit"
                    className="btn btn-primary"
                    onClick={postAnswer}
                  >
                    {loading ? "Posting..." : "Answer"}
                  </button>
                </div>
              </div>
              <Footer />
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
