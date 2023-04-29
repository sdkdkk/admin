import React from "react";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import Form from 'react-bootstrap/Form';


const Searchquestion = () => {

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
                            <div className="row">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <Form>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Questions</Form.Label>
                                                            <Form.Control type="email" placeholder="Enter Questions" />
                                                        </Form.Group>
                                                    </div>
                                                    <div className="col-md-12 mt-4">
                                                    <Link to="/searchengine">
                                                    <button className="btn btn-primary mx-2">
                                                                Back
                                                    </button>
                                                    </Link>
                                                    <button type="submit" className="btn btn-primary">
                                                            Search
                                                    </button>
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

export default Searchquestion;
