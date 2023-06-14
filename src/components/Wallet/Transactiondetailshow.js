import React, { useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getTransactionHistory } from "../../Redux/Loginpages/getTransactionHistorySlice";

const Transactiondetailshow = () => {
    const getTransactionHistoryState = useSelector((state) => state.getTransactionHistory); 
    const location = useLocation();
 
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    const walletId = queryParams.get("walletId");
    const type = queryParams.get("type");
    console.log(walletId);


    console.log(category, type)
    console.log(getTransactionHistoryState);
    console.log(location);
    const dispatch = useDispatch();
    
      const getWalletDataApi = (category = "Student") => {
    const params = location.search;
    console.log(params)
    dispatch(getTransactionHistory(walletId));
  };

  useEffect(() => {
    getWalletDataApi();
  }, []);
    
    const filterData = getTransactionHistoryState?.data?.transactions?.filter((item) =>item._id === walletId);
    console.log(filterData);
//     const { id } = useParams()

//   const {reset}=useForm()
    
//     const dispatch=useDispatch()
    
   
//     const filterData = getTransactionHistoryState?.data?.transactions?.filter((item) =>item.walletId === id);
//     console.log(filterData?.[0]);
    
//   useEffect(() => {
//     dispatch(getTransactionHistory()); // Dispatch the action to fetch transaction history data

//     return () => {
//       dispatch(reset()); // Reset the form when the component is unmounted
//     };
//   }, [dispatch]);
    
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
                    {/* <div className="card-body ">
                     <div className="my-2"><span className="mx-2 fw-6 fw-bolder">Name:</span><span>{filterData?.[0]?.name}</span></div>
                     <div className="my-2"><span className="mx-2 fw-6 fw-bolder">Type:</span><span>{filterData?.[0]?.type}</span></div>
                      <div className="my-2"><span className="mx-2 fw-6 fw-bolder">Category:</span><span>{filterData?.[0]?.category}</span></div>
                     <div className="my-2"><span className="mx-2 fw-6 fw-bolder">Balance:</span><span>{filterData?.[0]?.balance}</span></div>
                      <div className="my-2"><span className="mx-2 fw-6 fw-bolder">Amount:</span><span>{filterData?.[0]?.amount}</span></div>
                      <div className="my-2"><span className="mx-2 fw-6 fw-bolder">Date:</span><span>{filterData?.[0]?.date}</span></div>
                     <div><span className="mx-2 fw-6 fw-bolder">Status:</span><span>{filterData?.[0]?.status}</span></div>
                      <div className="my-2"><span className="mx-2 fw-6 fw-bolder">transactionId:</span><span>{filterData?.[0]?.transactionId}</span></div>
                     <div className="my-2"><span className="mx-2 fw-6 fw-bolder">Description:</span><span>{filterData?.[0]?.description}</span></div>
                    </div> */}
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
