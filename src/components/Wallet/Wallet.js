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
import { RotatingLines } from "react-loader-spinner";

const Wallet = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const getWalletDataState = useSelector((state) => state.getWalletData);
  const walletTransactions = getWalletDataState?.data?.transactions;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("Student");
  const [postsPerPage] = useState(8);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const [activeButton, setActiveButton] = useState(1);
  const location = useLocation();
  const handleChange = (event, value) => {
    setCurrentPage(value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    searchParams.set("category", type); // Add the category parameter
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

  useEffect(() => {
    getWalletDataApi();
  }, [currentPage]);

  const getWalletDataApi = (category) => {
    setType(category);
    if (category === "Student") {
      setActiveButton(1);
    } else if (category === "Tutor") {
      setActiveButton(2);
    }
    const cat = category || type;
    const params = `?page=${currentPage}&category=${cat}&limit=10&skip=${
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

    // Update the URL query parameter
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", currentPage); // Update currentPage
    searchParams.set("category", cat);
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${searchParams.toString()}`
    );
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
                      className={
                        activeButton === 1
                          ? "btn btn-primary active"
                          : "btn btn-light"
                      }
                      type="button">
                      Student
                    </button>
                    <button
                      onClick={() => getWalletDataApi("Tutor")}
                      className={
                        activeButton === 2
                          ? "btn btn-primary active"
                          : "btn btn-light"
                      }
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
                        {getWalletDataState.isLoading ? (
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
                                  colSpan="8"
                                  className="fw-2 fw-bolder text-center">
                                  No Data Found
                                </td>
                              </tr>
                            ) : (
                              walletTransactions &&
                              [...walletTransactions].map((value, pos) => {
                                return (
                                  <tr key={value._id}>
                                    <td>{pos + indexOfFirstPage + 1}</td>
                                    <td>
                                      {moment(value?.date).format("DD-MM-YYYY")}
                                    </td>
                                    <td>{value.name}</td>
                                    <td>{value.transactionId}</td>
                                    <td>
                                      {value.category === "Tutor"
                                        ? `Rs ${value.amount} `
                                        : `$ ${value.amount} `}
                                    </td>
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
                              })
                            )}
                          </tbody>
                        )}
                      </table>
                      <div className="table-pagination float-end">
                        <Pagination
                          count={3}
                          page={currentPage}
                          onChange={handleChange}
                          shape="rounded"
                          variant="outlined"
                          siblingCount={0}
                        />
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

export default Wallet;
