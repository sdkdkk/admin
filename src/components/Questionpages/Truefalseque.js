import React from 'react'
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "./Que.css"

const Truefalseque = () => {

    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">True / False Question</h3>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <div className="col-lg-12">
                                                <div className="rbt-dashboard-content bg-color-white rbt-shadow-box rbt-border mb--30 p--20">
                                                    <div className="content">
                                                        <div className="row">
                                                            <div className="col-md-12 col-lg-12 mb--20">
                                                                <h5>Question</h5>
                                                                <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                                                    Q 01. MRP = VMP mean by ‘under conditions of a perfect competition
                                                                    in the product market’?
                                                                    <br />
                                                                    <br />
                                                                    State : True / False
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-lg-12 mb--20">
                                                                <h5>Answer</h5>
                                                                <div className="p--20 rbt-border radius-6 bg-primary-opacity">
                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <div className="rbt-form-check p--10">
                                                                                <input
                                                                                    className="form-check-input"
                                                                                    type="radio"
                                                                                    name="rbt-radio"
                                                                                    id="rbt-radio-1"
                                                                                />
                                                                                <label className="form-check-label" htmlFor="rbt-radio-1">
                                                                                    {" "}
                                                                                    True
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <div className="rbt-form-check p--10">
                                                                                <input
                                                                                    className="form-check-input"
                                                                                    type="radio"
                                                                                    name="rbt-radio"
                                                                                    id="rbt-radio-2"
                                                                                />
                                                                                <label className="form-check-label" htmlFor="rbt-radio-2">
                                                                                    {" "}
                                                                                    False
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-lg-12 mb--20">
                                                                <h5>Explanation</h5>
                                                                <div className="p--20 rbt-border radius-6 bg-secondary-opacity">
                                                                    When there is perfect competition in the product market MR is equal
                                                                    to price (P), Marginal Revenue Product (MRP) also can be found out
                                                                    by multiplying the Col. Ill by Col. IV. Thus under perfect
                                                                    competition value of marginal product (VMP) will be equal to
                                                                    marginal revenue product (MRP).
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

export default Truefalseque;