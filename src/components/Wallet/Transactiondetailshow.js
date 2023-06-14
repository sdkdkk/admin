import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getTransactionHistory } from "../../Redux/Loginpages/getTransactionHistorySlice";
import { ColorRing } from "react-loader-spinner";

const Transactiondetailshow = () => {
    const getTransactionHistoryState = useSelector((state) => state.getTransactionHistory); 
  const location = useLocation();
  const [isLoading, setIsLoading]=useState(false)
  
     const dispatch = useDispatch();
    
      const getWalletDataApi = (category = "Student") => {
          const params = location.search;
      setIsLoading(true)
         dispatch(getTransactionHistory(params));
          setIsLoading(false)
        };

  useEffect(() => {
    
    getWalletDataApi();
       }, []);
    
    const filterData = getTransactionHistoryState?.data?.transactions?.filter((item) =>item);
 

    
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
                  <div className={`card table ${getTransactionHistoryState?.isLoading && "card-loading"
                                                        }`}>
                    <div className="card-body ">
                         <div>
                     <div className="my-2"><span className="mx-2 fw-6 fw-bolder">Name:</span><span>{filterData?.[0]?.name}</span></div>
                     <div className="my-2"><span className="mx-2 fw-6 fw-bolder">Type:</span><span>{filterData?.[0]?.type}</span></div>
                      <div className="my-2"><span className="mx-2 fw-6 fw-bolder">Category:</span><span>{filterData?.[0]?.category}</span></div>
                     <div className="my-2"><span className="mx-2 fw-6 fw-bolder">Balance:</span><span>{filterData?.[0]?.balance}</span></div>
                      <div className="my-2"><span className="mx-2 fw-6 fw-bolder">Amount:</span><span>{filterData?.[0]?.amount}</span></div>
                      <div className="my-2"><span className="mx-2 fw-6 fw-bolder">Date:</span><span>{filterData?.[0]?.date}</span></div>
                     <div><span className="mx-2 fw-6 fw-bolder">Status:</span><span>{filterData?.[0]?.status}</span></div>
                      <div className="my-2"><span className="mx-2 fw-6 fw-bolder">transactionId:</span><span>{filterData?.[0]?.transactionId}</span></div>
                     <div className="my-2"><span className="mx-2 fw-6 fw-bolder">Description:</span><span>{filterData?.[0]?.description}</span></div>
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

export default Transactiondetailshow;
