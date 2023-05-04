import React from 'react'
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Form, Button } from 'react-bootstrap';


const Questionpricing = () => {

    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">Question Pricing</h3>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col-lg-2 col-md-4 mt-2'>
                                                    <h6>Question Type</h6>
                                                </div>
                                                <div className='col-lg-4 col-md-8'>
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Open this select menu</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-lg-2 col-md-4 mt-2'>
                                                    <h6>Question Pricing</h6>
                                                </div>
                                                <div className='col-lg-4 col-md-8'>
                                                    <div className="input-group mb-3 form-inline">
                                                        <input type="number" className="form-control me-2" id="hoursInput" />
                                                        <span className="input-group-text">INR</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-lg-2 col-md-4 mt-2'>
                                                    <h6>Tutor Pricing</h6>
                                                </div>
                                                <div className='col-lg-4 col-md-8'>
                                                    <div className="input-group mb-3 form-inline">
                                                        <input type="number" className="form-control me-2" id="hoursInput" />
                                                        <span className="input-group-text">INR</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-lg-2 col-md-4 mt-2'>
                                                    <h6>Admin Pricing</h6>
                                                </div>
                                                <div className='col-lg-4 col-md-8'>
                                                    <div className="input-group mb-3 form-inline">
                                                        <input type="number" className="form-control me-2" id="hoursInput" />
                                                        <span className="input-group-text">INR</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-2'>
                                                <div className='col-lg-2 col-md-4'>
                                                    <h6>&nbsp;</h6>
                                                </div>
                                                <div className='col-lg-4 col-md-8 mb-2 text-md-end'>
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

export default Questionpricing;