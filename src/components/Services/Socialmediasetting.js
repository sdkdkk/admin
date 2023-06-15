import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import {RotatingLines } from "react-loader-spinner";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const url = process.env.REACT_APP_API_BASE_URL;

const Socialmediasetting = () => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  let token = localStorage.getItem("token");
  const notify = (data) => toast(data);
  const { register, handleSubmit, reset } = useForm({});
  const onSubmit = async (data) => {
    setLoading(true);
    let token = localStorage.getItem("token");
    let mediaObjData = {
      token: token,
      Facebook: data.Facebook,
      LinkedIn: data.LinkedIn,
      Twitter: data.Twitter,
      YouTube: data.YouTube,
      Instagram: data.Instagram,
    };

    try {
      const { data } = await axios.post(
        `${url}/admin/socialmedia`,
        mediaObjData
      );
      if (data.status === 1) {
        notify(data.message);
        fetchData();
      } else {
        notify(data.error);
      }
    } catch (error) {
      logoutIfInvalidToken(error.response);
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

      const response = await axios.post(`${url}/admin/getsocialmedia`, {
        token: token,
      });
      setData(response.data.data);
      reset(response.data.data);
      setLoading1(false);
    } catch (error) {
      logoutIfInvalidToken(error.response);
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
                          <p className="loader-container">
                            <RotatingLines
                              strokeColor="grey"
                              strokeWidth="5"
                              animationDuration="0.75"
                              width="50"
                              visible={true}
                            />
                          </p>
                        ) : (
                          <>
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
    </div>
  );
};

export default Socialmediasetting;
