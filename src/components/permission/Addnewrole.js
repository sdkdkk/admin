import React from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Link } from "react-router-dom";

import './permission.css';
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
                                                    <div className="main-scroll">
                                                        <div className="scroll-table">
                                                            <table className="table-body-cell">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <Link>
                                                                                <img className="table-body-cell" src="./img/WebResource (1).jpg" alt="Collapse Shop" />
                                                                            </Link>
                                                                        </td>
                                                                        <td>
                                                                            <input type="checkbox" />
                                                                            <Link className="box-text">Dashboard</Link>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <div className="table-block">
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <Link><img className="table-body-cell" src="./img/WebResource (1).jpg" alt="Collapse Sarees" /></Link>
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Tutor</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <div className="table-block">
                                                                    <table className="table-body-cell">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><div className="images-box" /></td>
                                                                                <td>
                                                                                    <div className="img-style">
                                                                                        <img src="./img/WebResource2.jpg" alt="img" />
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                                </td>
                                                                                <td>
                                                                                    <input type="checkbox" />
                                                                                    <Link className="box-text">Tutor List </Link>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table className="table-body-cell">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><div className="images-box" /></td>
                                                                                <td>
                                                                                    <div className="img-style">
                                                                                        <img src="./img/WebResource2.jpg" alt="img" />
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <img className="webresource" src="./img/WebResource3.jpg" alt="img" />
                                                                                </td>
                                                                                <td>
                                                                                    <input type="checkbox" />
                                                                                    <Link className="box-text">Tutor Payment</Link>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                   
                                                                </div>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <Link><img className="table-body-cell" src="./img/WebResource (1).jpg" alt="Collapse Salwar Suits" /></Link>
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Student</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <div className="table-block">
                                                                    <table className="table-body-cell">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><div className="images-box" /></td>
                                                                                <td>
                                                                                    <div className="img-style">
                                                                                        <img src="./img/WebResource2.jpg" alt="img" />
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <img className="webresource" src="./img/WebResource3.jpg" alt="img" />
                                                                                </td>
                                                                                <td>
                                                                                    <input type="checkbox" />
                                                                                    <Link className="box-text">Student List</Link>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Wallet</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Question Subject</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Question Type</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Curruncy</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Search Engine</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Question</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Question Timing</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Question Pricing</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Question Reanswer</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Tutor Exam Question</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Tutor Exam Checking</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Tutor Exam Configuration</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Testimonial</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Pages</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Features</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Services</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Coupon</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">User</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Role</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource3.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Profile</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <Link><img className="table-body-cell" src="./img/WebResource (1).jpg" alt="Collapse Sarees" /></Link>
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Tutor</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <div className="table-block">
                                                                    <table className="table-body-cell">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><div className="images-box" /></td>
                                                                                <td>
                                                                                    <div className="img-style">
                                                                                        <img src="./img/WebResource2.jpg" alt="img" />
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <img className="webresource" src="./img/WebResource.jpg" alt="img" />
                                                                                </td>
                                                                                <td>
                                                                                    <input type="checkbox" />
                                                                                    <Link className="box-text">Social Media Setting</Link>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table className="table-body-cell">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><div className="images-box" /></td>
                                                                                <td>
                                                                                    <div className="img-style">
                                                                                        <img src="./img/WebResource2.jpg" alt="img" />
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <img className="webresource" src="./img/WebResource3.jpg" alt="img" />
                                                                                </td>
                                                                                <td>
                                                                                    <input type="checkbox" />
                                                                                    <Link className="box-text">Email Setting</Link>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <table className="table-body-cell">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><div className="images-box" /></td>
                                                                            <td>
                                                                                <img className="webresource" src="./img/WebResource3.jpg" alt="img" />
                                                                            </td>
                                                                            <td>
                                                                                <input type="checkbox" />
                                                                                <Link className="box-text">Sign Out</Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <Link id="ContentPlaceHolder1_tView_SkipLink" href="" />
                                                    </div>
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
