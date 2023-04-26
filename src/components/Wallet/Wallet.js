import React, { useState} from "react";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { DateObject } from "react-multi-date-picker";
import Wallets from "./Wallet.json";
import { Pagination } from "@mui/material";



const Wallet = () => {

    //date picker
    // const [values, setValues] = useState([
    //     new DateObject().subtract(4, "days"),
    //     new DateObject().add(4, "days"),
    // ]);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    const indexOfLastPage = currentPage * postsPerPage;
    const indexOfFirstPage = indexOfLastPage - postsPerPage;
    //const displayUsers = Buttons.slice(indexOfFirstPage, indexOfLastPage);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="main-text">Wallet</h3>
                            </div>
                            <div className="oneline">
                                <div className="wallet-Earnings">
                                    <h3 className="wallet-text">Earnings Total</h3>
                                    <span className="wallet-rs">Rs</span><span className="wallet-rs mx-2">8,000</span>
                                </div>
                            </div>
                            <div className="page-headers">
                                <div className="col-md-12">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button class="btn btn-primary me-md-2" type="button">Student</button>
                                        <button class="btn btn-primary" type="button">Tutor</button>
                                        {/* <button class="btn btn-primary" type="button">Unverified</button> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sr.No.</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Name</th>
                                                        <th scope='col'>Transaction id</th>
                                                        <th scope='col'>Amount</th>
                                                        <th scope='col'>Amount</th>
                                                        <th scope='col'>Amount</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Wallets.map((value,pos) => {
                                                        return (
                                                            <tr key={pos}>
                                                                <td>{pos+1}</td>
                                                                <td>{value.Date}</td>
                                                                <td>{value.Name}</td>
                                                                <td>{value.Transactionid}</td>
                                                                <td>Rs.{value.Amount}</td>
                                                                <td>Rs.{value.Amount}</td>
                                                                <td>Rs.{value.Amount}</td>
                                                                <td>:</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                count={3}
                                                page={currentPage}
                                                onChange={handleChange}
                                                shape="rounded"
                                                variant="outlined"
                                            //showFirstButton
                                            //showLastButton
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
