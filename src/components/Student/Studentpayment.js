import React, { useState, useEffect } from "react";
import axios from 'axios';
//import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
// import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
// import { Pagination } from "@mui/material";
import { Button } from "react-bootstrap";



const Studentpayment = () => {

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
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Tutors Payment</h3>
              {/* <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="#">UI Elements</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Typography
                  </li>
                </ol>
              </nav> */}
            </div>
            <div className="row">
              <div className="col-md-12 grid-margin">
                <div className="card new-table">
                  <div className="card-body">
                    <table className="table v-top">
                      <thead>
                        <tr>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Email</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      {teamData.map((value, index) => {
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
                                      <b>Bank Name</b>:{value.name}
                                    </span>
                                    <span className="list-group-item mt-2 ">
                                      <b>A/c No</b>.{value.username}
                                    </span>
                                    <span className="list-group-item mt-2 ">
                                      <b>IFSC Code</b> : {value.address.zipcode}
                                    </span>
                                    <span className="list-group-item mt-2 ">
                                      <b>Account Type</b> :{value.address.city}
                                    </span>
                                    <span className="list-group-item mt-2 ">
                                      <b>Pan Card</b> :{value.address.city}
                                    </span>
                                  </>
                                ) : null}
                              </td>
                              <td className="text-success">{value.phone}</td>
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
      </div>
    </div>
  );
};

export default Studentpayment;
