import React from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";

const Addnewuser = () => {

    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">Add newu ser</h3>
                            </div>

                            <div className="row mt-3 justify-content-center">
                                <div className="col-md-8 col-lg-6 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <form className="user-form">
                                                <div className="form-group">
                                                    <label for="username">User Name</label>
                                                    <input type="text" className="form-control" id="username" placeholder="Enter user name" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="email">Email</label>
                                                    <input type="email" className="form-control" id="email" placeholder="Enter email" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="password">Password</label>
                                                    <input type="password" className="form-control" id="password" placeholder="Enter password" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="confirm-password">Confirm Password</label>
                                                    <input type="password" className="form-control" id="confirm-password" placeholder="Confirm password" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="user-role">User Role</label>
                                                    <select className="form-control" id="user-role">
                                                        <option>Admin</option>
                                                        <option>User</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label for="account-status">This Account Is</label>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="account-status" id="active" value="active" checked />
                                                        <label className="form-check-label" for="active">
                                                            Active
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="account-status" id="disabled" value="disabled" />
                                                        <label className="form-check-label" for="disabled">
                                                            Disabled
                                                        </label>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="text-title mt-4">
                                                <h5>Current User Identity Verification</h5>
                                                <div class="form-group">
                                                    <label for="Your-password">Your Password</label>
                                                    <input type="password" className="form-control" id="Your-password" placeholder="Confirm password" />
                                                </div>
                                            </div>
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

export default Addnewuser;
