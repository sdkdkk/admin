import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { Pagination } from "@mui/material";
import { getWalletData } from "../../Redux/Loginpages/getWalletDataSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorRing, RotatingLines } from "react-loader-spinner";

const Wallet = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const getWalletDataState = useSelector((state) => state.getWalletData);
  const walletTransactions = getWalletDataState?.data?.transactions;

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  //const displayUsers = Buttons.slice(indexOfFirstPage, indexOfLastPage);

  const location = useLocation();

  const handleChange = (event, value) => {
    setCurrentPage(value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${searchParams.toString()}`
    );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    const initialPage = pageParam ? parseInt(pageParam) : 1;
    setCurrentPage(initialPage);
  }, [location.search]);

  const getWalletDataApi = (category = "Student") => {
    const params = `?category=${category}&limit=10&skip=${
      (currentPage - 1) * 10
    }`;
    setIsLoading(true);
    dispatch(getWalletData(params))
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleDetailsClick = (data) => {
    const { category, walletId, type } = data;
    history(
      `/transactionDetails?category=${category}&walletId=${walletId}&type=${type}`
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
                <div className="wallet-Earnings">
                  <h3 className="wallet-text">Earnings Total</h3>
                  <span className="wallet-rs">Rs</span>
                  <span className="wallet-rs mx-2">8,000</span>
                </div>
              </div>
              <div className="page-headers">
                <div className="col-md-12">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      onClick={() => getWalletDataApi("Student")}
                      className="btn btn-primary me-md-2"
                      type="button">
                      Student
                    </button>
                    <button
                      onClick={() => getWalletDataApi("Tutor")}
                      className="btn btn-primary"
                      type="button">
                      Tutor
                    </button>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      {isLoading ? (
                         <div className="loader-container">
                          <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="50"
                            visible={true}
                          />
                        </div>
                        
                      ) : (
                        <table
                          className={
                            getWalletDataState.isLoading
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
                            {walletTransactions &&
                              [...walletTransactions].map((value, pos) => {
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
                                    <td>
                                      {value.status === "Success" ? (
                                        <span className="badge text-bg-success">
                                          {value.status}
                                        </span>
                                      ) : (
                                        <span className="badge text-bg-warning">
                                          {value.status}
                                        </span>
                                      )}
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-dark btn-sm"
                                        onClick={() =>
                                          handleDetailsClick(value)
                                        }>
                                        Details
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      )}
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

export default Wallet;
