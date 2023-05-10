import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Button } from "react-bootstrap";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Tutors/Tutorlist.css";
import { Pagination } from "@mui/material";

const Tutorlist = () => {


    return (
        <div>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="oneline">
                                <h3 className="main-text">Question </h3>
                            </div>
                            <div className="page-header">
                                <div className="col-md-12">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button
                                            // className="btn btn-primary me-md-2 active"
                                            type="button"
                                            style={{ borderRadius: "4px" }}>
                                            Tutor
                                        </button>
                                        <button
                                            // className="btn btn-primary"
                                            type="button"
                                            style={{ borderRadius: "4px" }}>
                                            Admin
                                        </button>
                                        <button
                                            // className="btn btn-primary"
                                            type="button"
                                            style={{ borderRadius: "4px" }}>
                                            Reanswer
                                        </button>
                                        <button
                                            // className="btn btn-primary"
                                            type="button"
                                            style={{ borderRadius: "4px" }}>
                                            Unsolved
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-end">
                                <div className="col-lg-4">
                                    <div className="filter-select rbt-modern-select mb--10">
                                        <label>Question Subject :</label>
                                        <div className="dropdown react-bootstrap-select w-100">
                                            <select className="w-100 form-select" id="displayname">
                                                <option value="Maths">Maths</option>
                                                <option value="English">English</option>
                                                <option value="Computer">Computer</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="filter-select rbt-modern-select mb--10">
                                        <label>Question Type :</label>
                                        <div className="dropdown react-bootstrap-select w-100">
                                            <select className="w-100 form-select" id="displayname">
                                                <option value="MCQ">MCQ</option>
                                                <option value="MCQ-exp">MCQ-exp</option>
                                                <option value="TrueFalse">True / False</option>
                                                <option value="TrueFalse-exp">True / False-exp</option>
                                                <option value="FillInBlanks">Fill In the Blanks</option>
                                                <option value="FillInBlanks-exp">Fill In the Blanks-exp</option>
                                                <option value="ShortAnswer">Short Answer</option>
                                                <option value="MatchTheFollowing-less5">
                                                    Match The Following-less5
                                                </option>
                                                <option value="MatchTheFollowing-more5">
                                                    Match The Following-more5
                                                </option>
                                                <option value="ProblemSolving">Problem Solving</option>
                                                <option value="LongAnswer">Long Answer</option>
                                                <option value="Writing">Writing</option>
                                                <option value="CaseStudy-more3">CaseStudy-more3</option>
                                                <option value="CaseStudy-less3">CaseStudy-less3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row mt-4">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Sr.No</th>
                                                            <th scope="col">Question</th>
                                                            <th scope="col">Question Type</th>
                                                            <th scope="col">Question Subject</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>.....</td>
                                                            <td>Multiple Choice</td>
                                                            <td>Mathematics</td>
                                                            <td>Active</td>
                                                            <td>
                                                               :
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>2</td>
                                                            <td>.....</td>
                                                            <td>Multiple Choice</td>
                                                            <td>Mathematics</td>
                                                            <td>Active</td>
                                                            <td>
                                                                :
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>3</td>
                                                            <td>.....</td>
                                                            <td>Multiple Choice</td>
                                                            <td>Mathematics</td>
                                                            <td>Active</td>
                                                            <td>
                                                                :
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="table-pagination">
                                                <Pagination count={4} shape="rounded" variant="outlined" />
                                            </div>
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

export default Tutorlist;
