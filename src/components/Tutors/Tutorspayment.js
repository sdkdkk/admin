import React, { useState, useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { Button } from "react-bootstrap";
import { tutorspayment } from "../../Redux/Loginpages/tutorspaymentSlice";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { FaCopy } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { BsFillPatchCheckFill } from "react-icons/bs"
import { tutorpaynowApi } from "../../Redux/Loginpages/tutorpaynowSlice";

const url = process.env.REACT_APP_API_BASE_URL;

const Tutorspayment = () => {
  const tutorpayment = useSelector((state) => state.tutorpayment.data.transaction);

  const isLoading = useSelector((state) => state.tutorpayment.isLoading);
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
 const [selectedFilter, setSelectedFilter] = useState('');
 let token = localStorage.getItem("token")
  const [selectedPayment, setSelectedPayment] = useState(null);
 

  const tutorId = selectedPayment?.transaction?.[0]?.tutorId
  
  const onClickPayment = () => {
   const paymentId = {
      token: token,
      balance: selectedPayment?.transaction?.[0].amount,
      paymentId:selectedPayment?._id
    }
  
   dispatch(tutorpaynowApi(paymentId,tutorId))
  
  }

  useEffect(() => {
       dispatch(tutorspayment({ token }));
     }, []);

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };
  const handleCopy = (name) => {
    navigator.clipboard.writeText(name);
  };

const [filteredData, setFilteredData] = useState(tutorpayment);
   const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = Math.min(currentPage * postsPerPage, tutorpayment?.length);
  const indexOfFirstPage = (currentPage - 1) * postsPerPage;
  const displayUsers = tutorpayment?.slice(indexOfFirstPage, indexOfLastPage);
  const pageCount = Math.ceil(tutorpayment?.length / postsPerPage);
 
  const location = useLocation();


   const handleChange = (event, value) => {
    setCurrentPage(value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    window.history.replaceState({}, "", `${location.pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    const initialPage = pageParam ? parseInt(pageParam) : 1;
    setCurrentPage(initialPage);
  }, [location.search]);


  const handleFilter = (e) => {
    setSelectedFilter(e.target.value)
   
  if (selectedFilter === '') {
   
    setFilteredData(displayUsers);
  } else {
      const filteredData = displayUsers?.filter((value) => value.date === e.target.value);
    setFilteredData(filteredData);
  
  }
  };
  useEffect(() => {
  if (selectedFilter === '') {
    setFilteredData(tutorpayment); // Show all data when "All" option is selected
  } else {
    const filteredData = tutorpayment.filter((value) => value.date === selectedFilter);
    setFilteredData(filteredData);
    }
}, [selectedFilter, tutorpayment]);

  return (
    <>
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
         
     
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Tutors Payment</h3>
                </div>
                   <div className="row">
                  <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                         
                          
                        <div className="col-6">
                            <div className="filter-select rbt-modern-select ">
                              <div className="dropdown react-bootstrap-select w-100">
                         <select
                              className="w-100 form-select mt-1"
                              id="displayname"
                              value={selectedFilter}
                              onChange={handleFilter}>
                              <option value="">All</option>
                              {tutorpayment?.map((value, index) => (
                                <option key={index} value={value.date}>
                                  {value.date}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                        </div></div>
                         <div className="text-end col-6">
                          <Button className="mx-2 btn-success"onClick={() => dispatch(tutorspayment({ isPaymentDone: 1 }))}>Paid</Button>
                           <Button className="btn-warning" onClick={() => dispatch(tutorspayment({ isPaymentDone: 0 }))}> Pending</Button>

                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div className="row">
                <div className="col-md-12 grid-margin">
                  <div className="card new-table">
                        {isLoading ? (
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}>
            <div className="loader-container">
              <RotatingLines
                strokeColor="pink"
                strokeWidth="5"
                animationDuration="0.75"
                width="50"
                visible={true}
              />
            </div>
          </div>
        ) : ( <div className="card-body">
                        
                      
                      <table className="table v-top">
                        <thead>
                          <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">NAME</th>
                            <th scope="col">BALANCE</th>
                            <th scope="col">ACTION</th>
                          </tr>
                          </thead>
                        

                     { filteredData?.map((value, index) => {
                        
                            return (
                              <tbody key={index}>
                                <tr>
                                  <td>{index + 1}</td>
                                  <td    onClick={() => toggle(index)}
                                  className={
                                    clicked === index
                                      ? "toggle-close"
                                      : "bg-white"
                                  }>
                                   <b>{value.transaction[0].name}</b>
                                    {clicked === index ? (
                                      <>
                                        <span className="list-group-item mt-2 ">
                                          <b>Bank Name</b>:
                                          {value.transaction?.[0]?.bankdetails?.[0].bankName || ""}
                                          <Button
                                            style={{ border: "none" }}
                                            variant="outline-primary"
                                            size="sm"
                                            className="ml-2"
                                            onClick={() =>
                                              handleCopy(
                                               value.transaction?.[0]?.bankdetails?.[0].bankName || ""
                                              )
                                            }>
                                            <FaCopy />
                                          </Button>
                                        </span>
                                         <span className="list-group-item mt-2 ">
                                          <b>Bank country</b>:
                                          {value.transaction?.[0]?.bankdetails?.[0]?.bankcountry || ""}
                                          <Button
                                            style={{ border: "none" }}
                                            variant="outline-primary"
                                            size="sm"
                                            className="ml-2"
                                            onClick={() =>
                                              handleCopy(
                                                value.transaction?.[0]?.bankdetails?.[0]?.bankcountry || ""
                                              )
                                            }>
                                            <FaCopy />
                                          </Button>
                                        </span>
                                        <span className="list-group-item mt-2 ">
                                          <b>A/c No</b>.
                                          { value.transaction?.[0]?.bankdetails?.[0]?.accountNumber ||
                                            ""}
                                          <Button
                                            style={{ border: "none" }}
                                            variant="outline-primary"
                                            size="sm"
                                            className="ml-2"
                                            onClick={() =>
                                              handleCopy(
                                                 value.transaction?.[0]?.bankdetails?.[0]?.accountNumber || ""
                                              )
                                            }>
                                            <FaCopy />
                                          </Button>
                                        </span>
                                        <span className="list-group-item mt-2 ">
                                          <b>IFSC Code</b> :
                                          { value.transaction?.[0]?.bankdetails?.[0]?.IFSCCode || ""}
                                          <Button
                                            style={{ border: "none" }}
                                            variant="outline-primary"
                                            size="sm"
                                            className="ml-2"
                                            onClick={() =>
                                              handleCopy(
                                                 value.transaction?.[0]?.bankdetails?.[0]?.IFSCCode || ""
                                              )
                                            }>
                                            <FaCopy />
                                          </Button>
                                        </span>
                                        <span className="list-group-item mt-2 ">
                                          <b>Account Type</b> :
                                          { value.transaction?.[0]?.bankdetails?.[0]?.accountType || ""}
                                          <Button
                                            style={{ border: "none" }}
                                            variant="outline-primary"
                                            size="sm"
                                            className="ml-2"
                                            onClick={() =>
                                              handleCopy(
                                                value.transaction?.[0]?.bankdetails?.[0]?.accountType || ""
                                              )
                                            }>
                                            <FaCopy />
                                          </Button>
                                        </span>
                                        <span className="list-group-item mt-2 ">
                                          <b>Pan Card</b> :
                                          { value.transaction?.[0]?.bankdetails?.[0]?.panCard || ""}
                                          <Button
                                            style={{ border: "none" }}
                                            variant="outline-primary"
                                            size="sm"
                                            className="ml-2"
                                            onClick={() =>
                                              handleCopy(
                                                 value.transaction?.[0]?.bankdetails?.[0]?.panCard || ""
                                              )
                                            }>
                                            <FaCopy />
                                          </Button>
                                        </span>
                                      </>
                                    ) : null}
                                  </td>
                                  <td className="text-success">
                                    {value.transaction[0].amount || ""}
                                  </td>
                                  <td>
                                    <Button className="bg-white bg-opacity-25 text-primary border border-primary btn-sm " data-bs-toggle="modal"
                                      disabled={value.transaction[0].isPaymentDone === 1}
                                data-bs-target="#thankyoupopup"   onClick={() => (setSelectedPayment(value))}>
                                      Pay Now
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}   

                        </table>
                        
                         <div className="table-pagination my-4 float-end">
                           <Pagination
                                count={pageCount}
                                page={currentPage}
                                onChange={handleChange}
                                shape="rounded"
                                variant="outlined"
                               
                              />
                 
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

    {/* modal become a tutor */}
   
      <div
        className="modal fade"
        id="thankyoupopup"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="re-answerpopup"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">
            
              <div className="modal-header border-bottom-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
             />
            </div>
            <div className="modal-body">
              <div className="text-center">
                <h1 className="mt-0 mb-3 text-success">
                  <BsFillPatchCheckFill /></h1>
               
                <h4 className="mt--20 mb--20">Confirm Payment</h4>
                <p className="mb--20">You are about to make a payment of <span className="text-primary">Rs.{selectedPayment?.transaction?.[0].amount}/-</span>
                </p>
                  <p className="mb--20"> Are you sure you want to proceed?
                  </p>
                  <div className="d-flex justify-content-center">
                  <Button
                   onClick={onClickPayment}
                    to="#"
                    className="rbt-btn bg-success btn-sm mr--10 mr_sm--0 mb_sm--10">
                    YES
                  </Button>
                  <button
                    // onClick={() => alert(setSelectedItemId(_id))}
                    to="#"
                    className="rbt-btn bg-danger hover-icon-reverse btn-sm"
                    data-bs-dismiss="modal"
                     
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">NO</span>
                     
                     
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></>
  );
};

export default Tutorspayment;
