import React, { useState, useEffect } from "react";
import axios from 'axios';
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { Button } from "react-bootstrap";
import { tutorspayment } from "../../Redux/Loginpages/tutorspaymentSlice";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";

const Tutorspayment = () => {
  const tutorpayment = useSelector(state => state.tutorpayment.data.info)
  const isLoading = useSelector(state => state.tutorpayment.isLoading);
  const dispatch=useDispatch();
  console.log(tutorpayment)
  //table
  const [clicked, setClicked] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const nbaData = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    setTeamData(response.data);
  };

  useEffect(() => {
    nbaData();
    dispatch(tutorspayment())  
  }, []);

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }
    setClicked(index);
  };

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />  
      {isLoading ? (
        <p style={{marginLeft:"500px"}}><ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["black"]}
      /></p>
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
                  <table className="table v-top">
                    <thead>
                      <tr>
                        <th scope="col">Sr.No.</th>
                        <th scope="col">NAME</th>
                        <th scope="col">BALANCE</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    {tutorpayment && tutorpayment.map((value, index) => {
                      return (
                        <tbody key={index}>
                          <tr
                            onClick={() => toggle(index)}
                            className={
                              clicked === index ? "toggle-close" : "bg-white"
                            }
                          >
                            <td>{index + 1}</td>
                            <td>
                              {value.name}
                              {clicked === index ? (
                                <>
                                  <span className="list-group-item mt-2 ">
                                    <b>Bank Name</b>:{value.bankdetails.bankName}
                                  </span>
                                  <span className="list-group-item mt-2 ">
                                    <b>A/c No</b>.{value.bankdetails.accountNumber}
                                  </span>
                                  <span className="list-group-item mt-2 ">
                                    <b>IFSC Code</b> : {value.bankdetails.IFSCCode}
                                  </span>
                                  <span className="list-group-item mt-2 ">
                                    <b>Account Type</b> :{value.bankdetails.accountType}
                                  </span>
                                  <span className="list-group-item mt-2 ">
                                    <b>Pan Card</b> :{value.bankdetails.panCard}
                                  </span>
                                </>
                              ) : null}
                            </td>
                            <td className="text-success">{value.balance}</td>
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
