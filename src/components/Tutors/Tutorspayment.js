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

const url = process.env.REACT_APP_API_BASE_URL;

const Tutorspayment = () => {
  const tutorpayment = useSelector((state) => state.tutorpayment.data.transaction);
console.log(tutorpayment);
  const isLoading = useSelector((state) => state.tutorpayment.isLoading);
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
const [data, setData]= useState([])
  useEffect(() => {
    let token =localStorage.getItem("token")
    dispatch(tutorspayment());
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

  // const isPaymentDone = async () => {
   
  //   let token= localStorage.getItem("token")
  
  //   const tutorsObjData = {
  //     token: token,
  //     isPaymentDone: 0,
  //   };

  //   dispatch(tutorspayment(tutorsObjData))
   
  // };


  // const isPaymentDone = async () => {
  //   let token = localStorage.getItem("token")
  //   console.log(token)
  //   try {
  //     const { data } = await axios.post(
  //       `${url}/admin/tutorspayment?isPaymentDone=${1}`,
  //       {token}
  //     );
  //     console.log(data)
  //     setData(data)
  //     if (data.message) {
  //       toast.success(data.message);
  //     } else {
  //       toast.error(data.error);
  //     }
  //   } catch (error) {
  //     toast.error(error.response.data.error);
  //   }
  // };

   let token = localStorage.getItem("token")
// const isPaymentpending = async () => {
   
//     let token = localStorage.getItem("token")
//     console.log(token)
//     try {
//       const { data } = await axios.post(
//         `${url}/admin/tutorspayment?isPaymentDone=${0}`,
//         {token}
//       );
//       console.log(data)
//        setData(data)
//       if (data.message) {
//         toast.success(data.message);
//       } else {
//         toast.error(data.error);
//       }
//     } catch (error) {
//       toast.error(error.response.data.error);
//     }
   
//   };
//  console.log(data)
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
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
        ) : (
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Tutors Payment</h3>
              </div>
              <div className="row">
                <div className="col-md-12 grid-margin">
                  <div className="card new-table">
                      <div className="card-body">
                        
                        <div className="my-5 text-end">
                          <Button className="mx-2 btn-success ">Paid</Button>
                           <Button className="btn-warning"> Pending</Button>

                        </div>
                      <table className="table v-top">
                        <thead>
                          <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">NAME</th>
                            <th scope="col">BALANCE</th>
                            <th scope="col">ACTION</th>
                          </tr>
                          </thead>
                        

                     {
                          tutorpayment?.map((value, index) => {
                            console.log(value.transaction?.[0]?.bankdetails?.[0])
                            return (
                              <tbody key={index}>
                                <tr
                                  onClick={() => toggle(index)}
                                  className={
                                    clicked === index
                                      ? "toggle-close"
                                      : "bg-white"
                                  }>
                                  <td>{index + 1}</td>
                                  <td>
                                    {value.transaction[0].name}
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
                                    <Button className="bg-white bg-opacity-25 text-primary border border-primary btn-sm">
                                      Pay Now
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}   

                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutorspayment;
