import React from 'react'
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Table, Button } from 'react-bootstrap';

const Tutorexamconfig = () => {

    return (

        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">Tutor Exam Configuration</h3>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div class="card-body">
                                            <div class="row mt-4">
                                                <div class="col-lg-2 col-md-4 mt-2">
                                                    <h6>MCQ</h6>
                                                </div>
                                                <div class="col-lg-4 col-md-8 mt-2">
                                                    <div class="mb-3">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" id="mcqHoursInput"/>
                                                                <span class="input-group-text">Question</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mt-4">
                                                <div class="col-lg-2 col-md-4 mt-2">
                                                    <h6>Theory</h6>
                                                </div>
                                                <div class="col-lg-4 col-md-8 mt-2">
                                                    <div class="mb-3">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" id="theoryHoursInput"/>
                                                                <span class="input-group-text">Question</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-lg-2 col-md-4">
                                                    <h6>&nbsp;</h6>
                                                </div>
                                                <div class="col-lg-4 col-md-8 mb-2 text-md-end">
                                                    <button class="btn btn-primary" type="submit">Update</button>
                                                </div>
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
        </>

    )

}

export default Tutorexamconfig;