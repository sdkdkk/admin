import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const Socialmediasetting = () => {
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  let token = localStorage.getItem("token");
  const notify = (data) => toast(data);
  const socialmedia = useSelector((state) => state.socialmedia);
  const dispatch = useDispatch();
  console.log(socialmedia);

  const { register, handleSubmit, reset } = useForm({});

  const onSubmit = async (data) => {
    setLoading(true);
    let token = localStorage.getItem("token");
    console.log(data);
    let mediaObjData = {
      token: token,
      Facebook: data.Facebook,
      LinkedIn: data.LinkedIn,
      Twitter: data.Twitter,
      YouTube: data.YouTube,
      Instagram: data.Instagram,
    };
    console.log(mediaObjData);

    try {
      const { data } = await axios.post(
        `https://vaidik-backend.onrender.com/admin/socialmedia`,
        mediaObjData
      );
      if (data.status === 1) {
        notify(data.message);
        fetchData();
      } else {
        notify(data.error);
      }
    } catch (error) {
      logoutIfInvalidToken(error.response)
      console.log("error - ", error);
      notify(error.response.data.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    reset(data);
  }, [reset]);

  const fetchData = async () => {
    try {
      setLoading1(true);

      const response = await axios.post(
        `https://vaidik-backend.onrender.com/admin/getsocialmedia`,
        {
          token: token,
        }
      );
      console.log(response.data.data);
      setData(response.data.data);
      reset(response.data.data);
      setLoading1(false);
    } catch (error) {
      logoutIfInvalidToken(error.response)
      console.log(error.response.data.error);
      setLoading1(false);
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
              <div className="page-header">
                <h3 className="page-title">Social Media Setting</h3>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        {loading1 ? (
                          <p style={{ marginLeft: "400px", marginTop: "50px" }}>
                            <ColorRing
                              visible={true}
                              height="80"
                              width="80"
                              ariaLabel="blocks-loading"
                              wrapperStyle={{}}
                              wrapperClass="blocks-wrapper"
                              colors={["black"]}
                            />
                          </p>
                        ) : (
                          <>
                            {" "}
                            <div className="row">
                              <div className="col-md-6">
                                <Form.Group
                                  className="mb-3"
                                  controlId="facebookLink">
                                  <Form.Label>FaceBook Link</Form.Label>
                                  <Form.Control
                                    type="link"
                                    placeholder="Enter link"
                                    required
                                    {...register("Facebook")}
                                  />
                                </Form.Group>
                                <Form.Group
                                  className="mb-3"
                                  controlId="linkedinLink">
                                  <Form.Label>Linkedin Link</Form.Label>
                                  <Form.Control
                                    type="link"
                                    placeholder="Enter link"
                                    required
                                    {...register("LinkedIn")}
                                  />
                                </Form.Group>
                                <Form.Group
                                  className="mb-3"
                                  controlId="twitterLink">
                                  <Form.Label>Twitter Link</Form.Label>
                                  <Form.Control
                                    type="link"
                                    placeholder="Enter link"
                                    required
                                    {...register("Twitter")}
                                  />
                                </Form.Group>
                              </div>
                              <div className="col-md-6">
                                <Form.Group
                                  className="mb-3"
                                  controlId="youtubeLink">
                                  <Form.Label>YouTube Link</Form.Label>
                                  <Form.Control
                                    type="link"
                                    placeholder="Enter link"
                                    required
                                    {...register("YouTube")}
                                  />
                                </Form.Group>
                                <Form.Group
                                  className="mb-3"
                                  controlId="instagramLink1">
                                  <Form.Label>Instagram Link</Form.Label>
                                  <Form.Control
                                    type="link"
                                    placeholder="Enter link"
                                    required
                                    {...register("Instagram")}
                                  />
                                </Form.Group>
                              </div>
                            </div>
                          </>
                        )}
                        <div className="row mt-2">
                          <div className="col-lg-6">
                            <h6>&nbsp;</h6>
                          </div>
                          <div className="col-lg-6 mb-2 text-end">
                            <Button
                              variant="primary"
                              type="submit"
                              disabled={loading}>
                              {loading ? "Loading..." : "Update"}
                            </Button>{" "}
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
    </div>
  );
};

export default Socialmediasetting;
