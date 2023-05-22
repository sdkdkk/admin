import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { DateObject } from "react-multi-date-picker";
import Wallets from "./Wallet.json";
import { Pagination } from "@mui/material";
import { getWalletData } from "../../Redux/Loginpages/getWalletDataSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getTransactionHistory } from "../../Redux/Loginpages/getTransactionHistorySlice";
import { useLocation } from "react-router-dom";

const TransactionDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getTransactionHistoryState = useSelector(
    (state) => state.getTransactionHistory
  );
  const walletTransactions = getTransactionHistoryState?.data?.transactions;

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

  const getWalletDataApi = (category = "Student") => {
    const params = location.search;
    dispatch(getTransactionHistory(params));
  };

  useEffect(() => {
    getWalletDataApi();
  }, [currentPage]);

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
                <div className="wallet-Earnings"></div>
              </div>
              <div className="page-headers">
                <div className="col-md-12">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end"></div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <table
                        className={
                          getTransactionHistoryState.isLoading
                            ? `table table-loading`
                            : "table"
                        }>
                        <thead>
                          <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Date</th>
                            <th scope="col">Name</th>
                            <th scope="col">Transaction id</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Category</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...walletTransactions].map((value, pos) => {
                            return (
                              <tr key={value._id}>
                                <td>{pos + 1}</td>
                                <td>
                                  {moment(value?.date).format("DD-MM-YYYY")}
                                </td>
                                <td>{value.name}</td>
                                <td>{value.transactionId}</td>
                                <td>Rs.{value.amount}</td>
                                <td>{value.category}</td>
                                <td>{value.status}</td>
                                <td>
                                  <button>Details</button>{" "}
                                </td>
                              </tr>
                            );
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

export default TransactionDetails;
