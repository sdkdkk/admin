import React, { useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Table, Button } from "react-bootstrap";

const Tutorexampopup = () => {


    // const [Loader, setLoader] = useState(true);

    // if (Loader) {
    //     return <h2>Loading....</h2>
    // }


    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">Tutor Exam Popup</h3>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <form>
                                                <div className="row mt-4">
                                                    <div className="col-lg-3 col-md-4 mt-2">
                                                        <h6>Content</h6>
                                                    </div>
                                                    <div className="col-lg-4 col-md-8">
                                                        <div className="mb-3">
                                                            <div className="form-floating">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        id="exampleFormControlInput1"
                                                                        placeholder="Content"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row mt-2">
                                                    <div className="col-lg-3 col-md-4">
                                                        <h6>&nbsp;</h6>
                                                    </div>
                                                    <div className="col-lg-4 col-md-8 mb-2 text-md-end">
                                                        <Button
                                                            variant="primary"
                                                            type="submit"
                                                        >

                                                            Add
                                                        </Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <div className="table-container">
                                                <Table
                                                    striped
                                                    bordered
                                                    hover
                                                    responsive
                                                    className="single-color">
                                                    <thead>
                                                        <tr>
                                                            <th>Sr. No</th>
                                                            <th>Content</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>Content</td>
                                                            <td>
                                                                <Button
                                                                    variant="success"
                                                                >
                                                                    Edit
                                                                </Button>
                                                                <Button
                                                                    className="mx-2"
                                                                    variant="danger"
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                                <div className="table-pagination">
                                                    {/* <Pagination
                                                                count={totalPages}
                                                                page={currentPage}
                                                                onChange={handleChange}
                                                                shape="rounded"
                                                                variant="outlined"
                                                            /> */}
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
    );
};

export default Tutorexampopup;