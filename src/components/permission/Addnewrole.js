import React from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";

const Addnewrole = () => {

    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">Add New Role</h3>
                            </div>

                            <div className="row mt-3 justify-content-center">
                                <div className="col-md-8 col-lg-6 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <form className="user-form">
                                                <div className="form-group">
                                                    <label for="username">Role Name</label>
                                                    <input type="text" className="form-control" id="rolename" placeholder="Enter user name" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="email">Resources</label>
                                                </div>
                                            </form>

                                            <div className="form-group d-flex justify-content-end">
                                                <button type="submit" className="btn btn-primary">Submit</button>
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

export default Addnewrole;
