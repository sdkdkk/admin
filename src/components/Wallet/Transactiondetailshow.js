import React, { useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionHistory } from "../../Redux/Loginpages/getTransactionHistorySlice";
import { RotatingLines } from "react-loader-spinner";
import { Button } from "react-bootstrap";

const Transactiondetailshow = () => {
  const getTransactionHistoryState = useSelector(
    (state) => state.getTransactionHistory
  );
  const isLoading = useSelector(
    (state) => state.getTransactionHistory.isLoading
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const getWalletDataApi = (category = "Student") => {
    const params = location.search;
    dispatch(getTransactionHistory(params));
  };

  useEffect(() => {
    getWalletDataApi();
  }, []);

  const filterData = getTransactionHistoryState?.data?.transactions?.filter(
    (item) => item
  );

  return (
    <div>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="oneline">
                <h3 className="main-text">Transaction Details </h3>
              </div>
              <div className="row  ">
                <div className="col-md-12 grid-margin stretch-card questionanstext">
                  <div className="card">
                    {isLoading ? (
                      <div className="loader-container">
                        <RotatingLines
                          strokeColor="#d63384"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="50"
                          visible={true}
                        />
                      </div>
                    ) : (
                      <div className="card-body ">
                        <div className="my-2">
                          <span className="mx-2 fw-6 fw-bolder">Name:</span>
                          <span>{filterData?.[0]?.name}</span>
                        </div>
                        <div className="my-2">
                          <span className="mx-2 fw-6 fw-bolder">Type:</span>
                          <span>{filterData?.[0]?.type}</span>
                        </div>
                        <div className="my-2">
                          <span className="mx-2 fw-6 fw-bolder">Category:</span>
                          <span>{filterData?.[0]?.category}</span>
                        </div>
                        <div className="my-2">
                          <span className="mx-2 fw-6 fw-bolder">Balance:</span>
                          <span>{filterData?.[0]?.balance}</span>
                        </div>
                        <div className="my-2">
                          <span className="mx-2 fw-6 fw-bolder">Amount:</span>
                          <span>{filterData?.[0]?.amount}</span>
                        </div>
                        <div className="my-2">
                          <span className="mx-2 fw-6 fw-bolder">Date:</span>
                          <span>{filterData?.[0]?.date}</span>
                        </div>
                        <div>
                          <span className="mx-2 fw-6 fw-bolder">Status:</span>
                          <span>{filterData?.[0]?.status}</span>
                        </div>
                        <div className="my-2">
                          <span className="mx-2 fw-6 fw-bolder">
                            transactionId:
                          </span>
                          <span>{filterData?.[0]?.transactionId}</span>
                        </div>
                        <div className="my-2">
                          <span className="mx-2 fw-6 fw-bolder">
                            Description:
                          </span>
                          <span>{filterData?.[0]?.description}</span>
                        </div>
                        <div>
                          <div className="text-end">
                            <Link to={`/wallet`}>
                              <Button
                                className="btn-primary btn-sm "
                                style={{ width: "70px", height: "40px" }}
                                type="button">
                                Back
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
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

export default Transactiondetailshow;
