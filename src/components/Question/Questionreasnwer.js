import React from 'react'
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Form, Button } from 'react-bootstrap';

const Questionreasnwer = () => {

    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">Question Reanswer Choice</h3>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-2 col-md-4 mt-2">
                                                    <h6>Reanswer</h6>
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        type="radio"
                                                        id="yesRadio"
                                                        label="Yes"
                                                        name="yesNoRadio"
                                                        value="yes"
                                                    />
                                                    <Form.Check 
                                                        type="radio"
                                                        id="noRadio"
                                                        label="No"
                                                        name="yesNoRadio"
                                                        value="no"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-lg-2 col-md-4 mt-2">
                                                    <h6>Reanswer Time</h6>
                                                </div>
                                                <div className="col-lg-3 col-md-8">
                                                    <div className="mb-3">
                                                        <label htmlFor="hoursInput" className="form-label">Hours:</label>
                                                        <input type="number" className="form-control" id="hoursInput" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-8 mt-3 mt-md-0">
                                                    <div className="mb-3">
                                                        <label htmlFor="minutesOutput" className="form-label">Minutes:</label>
                                                        <input type="number" className="form-control" id="minutesOutput" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-lg-2 col-md-4">
                                                    <h6>&nbsp;</h6>
                                                </div>
                                                <div className="col-lg-4 col-md-8 mb-2 text-md-end">
                                                    <Button variant="primary" type="submit">Submit</Button>
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

export default Questionreasnwer;