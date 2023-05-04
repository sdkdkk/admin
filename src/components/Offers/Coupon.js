import React from 'react'
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Table, Button } from 'react-bootstrap';
import "./coupon.css"

const Coupon = () => {

    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">Coupon Code</h3>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <div className='row mt-4'>
                                                <div className='col-lg-2 col-md-4 mt-2'>
                                                    <h6>Coupon Code</h6>
                                                </div>
                                                <div className='col-lg-4 col-md-8'>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control me-2" id="hoursInput" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-lg-2 col-md-4 mt-2'>
                                                    <h6>Discount (Percent) </h6>
                                                </div>
                                                <div className='col-lg-4 col-md-8'>
                                                    <div className="mb-3">
                                                        <input type="number" className="form-control me-2" id="hoursInput" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-lg-2 col-md-4 mt-2'>
                                                    <h6>Validity Date</h6>
                                                </div>
                                                <div className='col-lg-4 col-md-8'>
                                                    <div className="mb-3">
                                                        <input type="date" className="form-control me-2" id="hoursInput" />
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
                                                            <th>Coupon Code</th>
                                                            <th>Discount (Percent) </th>
                                                            <th>Valid Date</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>SAVE10</td>
                                                            <td>10% off</td>
                                                            <td>15/01/2023</td>
                                                            <td>
                                                                <Button variant="success">Update</Button>
                                                                <Button className='mx-2' variant="danger">Delete</Button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>2</td>
                                                            <td>SPRING25</td>
                                                            <td>25% off</td>
                                                            <td>14/03/2023</td>
                                                            <td>
                                                                <Button variant="success">Update</Button>
                                                                <Button className='mx-2' variant="danger">Delete</Button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>3</td>
                                                            <td>SUMMER15</td>
                                                            <td>15% off</td>
                                                            <td>31/08/2023</td>
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

export default Coupon;