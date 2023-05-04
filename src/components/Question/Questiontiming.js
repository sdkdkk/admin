import React, { useState } from 'react';
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Form, Button } from 'react-bootstrap';

const Questiontiming = () => {

    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');

    const convertToMinutes = (value) => {
        setHours(value);
        setMinutes(value * 60);
    }

    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">Question Timing</h3>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col-lg-2 mt-2'>
                                                    <h6>Question Type</h6>
                                                </div>
                                                <div className='col-lg-6'>
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Open this select menu</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-lg-2 mt-2'>
                                                    <h6>Question Time</h6>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <div className="mb-3">
                                                        <label htmlFor="hoursInput" className="form-label">Hours:</label>
                                                        <input type="number" className="form-control" id="hoursInput" />
                                                    </div>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <div className="mb-3">
                                                        <label htmlFor="minutesOutput" className="form-label">Minutes:</label>
                                                        <input type="number" className="form-control" id="minutesOutput" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-lg-2 mt-2'>
                                                    <h6>Second Time</h6>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <div className="mb-3">
                                                        <label htmlFor="hoursInput" className="form-label">Hours:</label>
                                                        <input type="number" className="form-control" id="hoursInput" />
                                                    </div>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <div className="mb-3">
                                                        <label htmlFor="minutesOutput" className="form-label">Minutes:</label>
                                                        <input type="number" className="form-control" id="minutesOutput" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-lg-2 mt-2'>
                                                    <h6>Skip Time</h6>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <div className="mb-3">
                                                        <label htmlFor="hoursInput" className="form-label">Hours:</label>
                                                        <input type="number" className="form-control" id="hoursInput" />
                                                    </div>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <div className="mb-3">
                                                        <label htmlFor="minutesOutput" className="form-label">Minutes:</label>
                                                        <input type="number" className="form-control" id="minutesOutput" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-lg-2 mt-2'>
                                                    <h6>Total Time</h6>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <div className="mb-3">
                                                        <label htmlFor="hoursInput" className="form-label">Hours:</label>
                                                        <input type="number" className="form-control" id="hoursInput" />
                                                    </div>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <div className="mb-3">
                                                        <label htmlFor="minutesOutput" className="form-label">Minutes:</label>
                                                        <input type="number" className="form-control" id="minutesOutput" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-lg-2 mt-2'>
                                                    <h6>Tutor Time</h6>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <div className="mb-3">
                                                        <label htmlFor="hoursInput" className="form-label">Hours:</label>
                                                        <input type="number" className="form-control" id="hoursInput" />
                                                    </div>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <div className="mb-3">
                                                        <label htmlFor="minutesOutput" className="form-label">Minutes:</label>
                                                        <input type="number" className="form-control" id="minutesOutput" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-lg-2 mt-2'>
                                                    <h6>Admin Time</h6>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <div className="mb-3">
                                                        <label htmlFor="hoursInput" className="form-label">Hours:</label>
                                                        <input type="number" className="form-control" id="hoursInput" />
                                                    </div>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <div className="mb-3">
                                                        <label htmlFor="minutesOutput" className="form-label">Minutes:</label>
                                                        <input type="number" className="form-control" id="minutesOutput" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-lg-2 mt-2'>
                                                    <h6>Unsolved Time</h6>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <div className="mb-3">
                                                        <label htmlFor="hoursInput" className="form-label">Hours:</label>
                                                        <input type="number" className="form-control" id="hoursInput" />
                                                    </div>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <div className="mb-3">
                                                        <label htmlFor="minutesOutput" className="form-label">Minutes:</label>
                                                        <input type="number" className="form-control" id="minutesOutput" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-2'>
                                                <div className='col-lg-2'>
                                                    <h6>&nbsp;</h6>
                                                </div>
                                                <div className='col-lg-6 mb-2 text-end'>
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

export default Questiontiming;