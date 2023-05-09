import React from 'react'
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "./Que.css"
import q01 from "../Image/q01.jpg";
import q02 from "../Image/q02.jpg";


const Matchfollow = () => {

    return (

        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title"> Match the following Question</h3>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div class="card-body">
                                            <div class="col-lg-12">
                                                <div class="rbt-dashboard-content bg-color-white rbt-shadow-box rbt-border mb--30 p--20">
                                                    <div class="content">
                                                        <div class="row">
                                                            <div class="col-md-12 col-lg-12 mb--20">
                                                                <h5>Question</h5>
                                                                <div class="p--20 rbt-border radius-6 bg-primary-opacity">
                                                                    <img src={q01} alt="q01" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12 col-lg-12 mb--20 pl-0">
                                                                <h5>Answer</h5>
                                                                <div class="p-0 rbt-border radius-6 bg-primary-opacity">
                                                                    <div class="container">
                                                                        <div class="row">
                                                                            <div class="col-md-6 mt-3">
                                                                                <div class="multi-field d-flex mb-3 align-items-center">
                                                                                    <input class="mr-2 form-control" placeholder="A" type="text" name="" />
                                                                                    <i class="mr-2 feather feather-arrow-right"></i>
                                                                                    <input class="mr-2 form-control" placeholder="1" type="text" name="" />
                                                                                </div>
                                                                                <div class="multi-field d-flex mb-3 align-items-center">
                                                                                    <input class="mr-2 form-control" placeholder="B" type="text" name="" />
                                                                                    <i class="mr-2 feather feather-arrow-right"></i>
                                                                                    <input class="mr-2 form-control" placeholder="2" type="text" name="" />
                                                                                </div>
                                                                                <div class="multi-field d-flex mb-3 align-items-center">
                                                                                    <input class="mr-2 form-control" placeholder="C" type="text" name="" />
                                                                                    <i class="mr-2 feather feather-arrow-right"></i>
                                                                                    <input class="mr-2 form-control" placeholder="3" type="text" name="" />
                                                                                </div>
                                                                                <form id="multi-field" role="form" action="/wohoo" method="POST">
                                                                                    <div class="multi-field-wrapper mt-3">
                                                                                        <div class="multi-fields">
                                                                                            <div class="multi-field d-flex mb-3 align-items-center">
                                                                                                <input class="mr-2 form-control" type="text" name="stuff[]" />
                                                                                                <i class="mr-2 feather feather-arrow-right"></i>
                                                                                                <input class="mr-2 form-control" type="text" name="stuff[]" />
                                                                                                <button type="button" class="remove-field rbt-btn btn-sm btn-border-gradient">Remove</button>
                                                                                            </div>
                                                                                        </div>
                                                                                        <button type="button" class="rbt-btn btn-sm add-field mt-3 mb-3">Add field</button>
                                                                                    </div>
                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12 col-lg-12 mb--20">
                                                                <h5>Explanation</h5>
                                                                <div class="p--20 rbt-border radius-6 bg-secondary-opacity">
                                                                    <img src={q02} alt="q01" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row mt--20 pt--20 border-top">
                                                            <div class="col-lg-12 col-8 text-end mt-4">
                                                                <button class="btn btn-primary">Answer</button>
                                                            </div>
                                                        </div>
                                                    </div>
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

export default Matchfollow;