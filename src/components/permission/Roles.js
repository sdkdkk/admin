import React  from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Link } from "react-router-dom";

const Roles = () => {

    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">Role</h3>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                        <div className="row">
                                                <div className="col-lg-12">
                                                    <Link to="/addnewrole">
                                                    <button className="add-user-btn">Add New Role</button>
                                                    </Link>
                                                </div>
                                                <div className="col-lg-12 mt-4">
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sr.No</th>
                                                                    <th>Role</th>
                                                                    <th>Allowed Scope</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>John Doe</td>
                                                                    <td>Admin</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>Jane Doe</td>
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

export default Roles;
