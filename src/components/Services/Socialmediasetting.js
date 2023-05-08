import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
// import { BsInfoCircle } from "react-icons/bs";
import { Form, Button } from 'react-bootstrap';

const Socialmediasetting = () => {

    return (
        <div>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">
                                    Social Media Setting
                                </h3>
                            </div>
                            <div className="row">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <Form>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Form.Group className="mb-3" controlId="facebookLink">
                                                            <Form.Label>FaceBook Link</Form.Label>
                                                            <Form.Control type="link" placeholder="Enter link" />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="linkedinLink">
                                                            <Form.Label>Linkedin Link</Form.Label>
                                                            <Form.Control type="link" placeholder="Enter link" />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="twitterLink">
                                                            <Form.Label>Twitter Link</Form.Label>
                                                            <Form.Control type="link" placeholder="Enter link" />
                                                        </Form.Group>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Form.Group className="mb-3" controlId="youtubeLink">
                                                            <Form.Label>YouTube Link</Form.Label>
                                                            <Form.Control type="link" placeholder="Enter link" />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="instagramLink1">
                                                            <Form.Label>Instagram Link</Form.Label>
                                                            <Form.Control type="link" placeholder="Enter link" />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="instagramLink2">
                                                            <Form.Label>Instagram Link</Form.Label>
                                                            <Form.Control type="link" placeholder="Enter link" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div className='row mt-2'>
                                                    <div className='col-lg-6'>
                                                        <h6>&nbsp;</h6>
                                                    </div>
                                                    <div className='col-lg-6 mb-2 text-end'>
                                                        <Button variant="primary" type="submit">Submit</Button>
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
