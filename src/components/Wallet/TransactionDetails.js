import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getTransactionHistory } from "../../Redux/Loginpages/getTransactionHistorySlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";

const TransactionDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getTransactionHistoryState = useSelector(
    (state) => state.getTransactionHistory
  );
  const walletTransactions = getTransactionHistoryState?.data?.transactions;
  const walletTransactionsFilter = walletTransactions?.filter(
    (item) => item._id
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;

  const handleChange = (value) => {
    setCurrentPage(value);
  };
  
  const getWalletDataApi = (category = "Student") => {
    const params = location.search;
    setIsLoading(true);
    dispatch(getTransactionHistory(params))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    getWalletDataApi();
  }, [currentPage]);
  const history = useNavigate();

  const handleDetailsClick = (data) => {
    const { category, walletId, type } = data;
    history(
      `/transactiondetailshow?category=${category}&walletId=${walletId}&type=${type}`
    );
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
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end"></div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table mt-4">
                    <div className="card-body">
                      <table className="table">
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
                        {getTransactionHistoryState.isLoading ? (
                          <tbody>
                            <tr>
                              <td colSpan="8" className="text-center">
                                <div className="loader-container">
                                  <div className="loader">
                                    <RotatingLines
                                      strokeColor="#d63384"
                                      strokeWidth="5"
                                      animationDuration="0.75"
                                      width="50"
                                      visible={true}
                                    />
                                  </div>
                                  <div className="mobile-loader-text"></div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ) : (
                          <tbody>
                            {walletTransactions?.length === 0 ? (
                              <tr>
                                <td
                                  colSpan="4"
                                  className="fw-2 fw-bolder text-center">
                                  {" "}
                                  No Data Found{" "}
                                </td>
                              </tr>
                            ) : (
                              walletTransactions &&
                              [...walletTransactions].map((value, pos) => {
                                return (
                                  <tr key={value._id}>
                                    <td>{pos + 1}</td>
                                    <td>
                                      {moment(value?.date).format("DD-MM-YYYY")}
                                    </td>
                                    <td>{value.name}</td>
                                    <td>{value.transactionId}</td>
                                    <td>{value.amount}</td>
                                    <td>{value.category}</td>
                                    <td>{value.status}</td>
                                    <td>
                                      <Button
                                        className="btn btn-dark btn-sm"
                                        onClick={() =>
                                          handleDetailsClick(value)
                                        }>
                                        Details
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        )}
                      </table>
                      <Pagination
                        count={3}
                        page={currentPage}
                        onChange={handleChange}
                        shape="rounded"
                        variant="outlined"
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
