import React from 'react'
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Table, Button } from 'react-bootstrap';

const Tutorsubject = () => {

    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">Tutor Subject</h3>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <div className='row mt-4'>
                                                <div className='col-lg-2 col-md-4 mt-2'>
                                                    <h6>Subject</h6>
                                                </div>
                                                <div className='col-lg-4 col-md-8'>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control me-2" id="hoursInput" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-2'>
                                                <div className='col-lg-2 col-md-4'>
                                                    <h6>&nbsp;</h6>
                                                </div>
                                                <div className='col-lg-4 col-md-8 mb-2 text-md-end'>
                                                    <Button variant="primary" type="submit">Add</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <div className="table-container">
                                                <Table striped bordered hover responsive className="single-color">
                                                    <thead>
                                                        <tr>
                                                            <th>Sr. No</th>
                                                            <th>Subject Name</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>Maths</td>
                                                            <td>
                                                                <Button variant="success">Update</Button>
                                                                <Button className='mx-2' variant="danger">Delete</Button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>2</td>
                                                            <td>Physics</td>
                                                            <td>
                                                                <Button variant="success">Update</Button>
                                                                <Button className='mx-2' variant="danger">Delete</Button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>3</td>
                                                            <td>Chemistry</td>
                                                            <td>
                                                                <Button variant="success">Update</Button>
                                                                <Button className='mx-2' variant="danger">Delete</Button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
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

export default Tutorsubject;