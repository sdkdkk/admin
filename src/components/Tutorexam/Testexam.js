import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Table, Thead, Tbody, Tr, th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { admintutorexamverify } from "../../Redux/Loginpages/admintutorexamverifySlice";
import Moment from "react-moment";
import {  RotatingLines } from "react-loader-spinner";

const Testexam = () => {

  const testexam = useSelector((state) => state.admintutorexamverify.data.data);
  const isLoading = useSelector((state) => state.admintutorexamverify.isLoading);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  
  useEffect(() => {
      dispatch(admintutorexamverify());
    }, [dispatch]);

  const toComponentB = (data) => {

    navigate("/examdetails", { state: { data } });
   
  };

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />

         
            <div className="main-panel">
              <div className="content-wrapper">
                <div className="Title">
                  <h3 className="text">Tutor Exam Checking</h3>
                </div>
                <div className="row">
                  <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                       <div className="table-responsive">
                          <table className="table v-top">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Tutor Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            {isLoading ? (
                              <tbody>
                                <tr>
                                  <td colSpan="5" className="text-center">
                                
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
                                      <div className="mobile-loader-text ml-5 mr-5"></div>
                                    </div>
                                
                                  </td>
                                </tr>
                              </tbody>
                            ) : (
                              <tbody>
                                {testexam?.length === 0 ? (
                                  <tr>
                                    <td colSpan="5" className="fw-3 fw-bolder text-center">
                                      No Question found
                                    </td>
                                  </tr>
                                ) : (
                                  testexam &&
                                  testexam.map((data, id) => (
                                    <tr key={id}>
                                      <td>
                                        <Moment format="D MMM YYYY" withTitle>
                                          {data.examDate}
                                        </Moment>
                                      </td>
                                      <td>{data.name}</td>
                                      <td>{data.email}</td>
                                      <td>{data.examSubject}</td>
                                      <td>
                                        <button onClick={() => toComponentB(data)}>Check</button>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            )}
                          </table>
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
    </>
  );
};

export default Testexam;
