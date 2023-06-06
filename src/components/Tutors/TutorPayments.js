import React from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Tutors/Tutorlist.css";

const TutorPayments = () => {


    return (
        <div>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="Title">
                                <h4 className="text">Tutors Payments</h4>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Bank Country</th>
                                                            <th scope="col">Bank Name</th>
                                                            <th scope="col">Ac.Number</th>
                                                            <th scope="col">IFSC Code</th>
                                                            <th scope="col">Account Type</th>
                                                            <th scope="col">PAN Card No.</th>
                                                            <th scope="col">Total Amount</th>
                                                            <th scope="col">Available Amount</th>
                                                            <th scope="col">Pending Amount </th>
                                                            <th scope="col"> Earning Amount </th>
                                                            <th scope="col"> Paid Amount </th>
                                                            <th scope="col"> Amount </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>john.doe@example.com</td>
                                                            <td>John Doe</td>
                                                            <td>United States</td>
                                                            <td>Chase Bank</td>
                                                            <td>1234567890</td>
                                                            <td>CCHQUS33</td>
                                                            <td>Savings</td>
                                                            <td>ABCDE1234F</td>
                                                            <td>10,000</td>
                                                            <td>8,000</td>
                                                            <td>1,500</td>
                                                            <td>500</td>
                                                            <td>6,000</td>
                                                            <td>1,000</td>
                                                        </tr>
                                                        <tr>
                                                            <td>jane.doe@example.com</td>
                                                            <td>Jane Doe</td>
                                                            <td>Canada</td>
                                                            <td>TD Bank</td>
                                                            <td>0987654321</td>
                                                            <td>TDOMCATTTOR</td>
                                                            <td>Checking</td>
                                                            <td>FGHIJ5678K</td>
                                                            <td>5,000</td>
                                                            <td>4,000</td>
                                                            <td>500</td>
                                                            <td>0</td>
                                                            <td>4,500</td>
                                                            <td>500</td>
                                                        </tr>
                                                        <tr>
                                                            <td>james.smith@example.com</td>
                                                            <td>James Smith</td>
                                                            <td>Australia</td>
                                                            <td>ANZ Bank</td>
                                                            <td>55555555</td>
                                                            <td>ANZBAU3M</td>
                                                            <td>Savings</td>
                                                            <td>LMNOP1234Q</td>
                                                            <td>15,000</td>
                                                            <td>12,000</td>
                                                            <td>2,000</td>
                                                            <td>500</td>
                                                            <td>10,000</td>
                                                            <td>1,500</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
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
        </div>
    );
};

export default TutorPayments;
