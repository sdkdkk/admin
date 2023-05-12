import React from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import './permission.css';
import { Link } from "react-router-dom";

const Users = () => {

    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">User</h3>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <Link to="/addnewuser">
                                                    <button className="add-user-btn">Add New User</button>
                                                    </Link>
                                                </div>
                                                <div className="col-lg-12 mt-4">
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sr.No</th>
                                                                    <th>User Name</th>
                                                                    <th>Email</th>
                                                                    <th>Status</th>
                                                                    <th>Role</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>John Doe</td>
                                                                    <td>johndoe@example.com</td>
                                                                    <td>Active</td>
                                                                    <td>Admin</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>Jane Doe</td>
                                                                    <td>janedoe@example.com</td>
                                                                    <td>Inactive</td>
                                                                    <td>User</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
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
    );
};

export default Users;
