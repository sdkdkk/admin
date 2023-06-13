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
import { ColorRing } from "react-loader-spinner";

const Testexam = () => {

  const testexam = useSelector((state) => state.admintutorexamverify.data.data);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    dispatch(admintutorexamverify());
    setIsLoading(false);
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

          {isLoading ? (
            <div style={{ marginLeft: "450px", marginTop: "50px" }}>
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperclassName="blocks-wrapper"
                colors={["black"]}
              />
            </div>
          ) : (
            <div className="main-panel">
              <div className="content-wrapper">
                <div className="Title">
                  <h3 className="text">Tutor Exam Checking</h3>
                </div>
                <div className="row">
                  <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
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
                            {testexam?.length === 0 ? (
                              <tr>
                                <td colSpan="5" className="fw-3 fw-bolder text-center">No Question found</td>
                              </tr>) :testexam &&
                            testexam.map((data) => (
                              <tbody>
                                <tr>
                                  <td>
                                    <Moment format="D MMM YYYY" withTitle>
                                      {data.examDate}
                                    </Moment>
                                  </td>
                                  <td>{data.name}</td>
                                  <td>{data.email}</td>
                                  <td>{data.examSubject}</td>
                                  <td>
                                    <button
                                      onClick={() => {
                                        toComponentB(data);
                                      }}>
                                      Check
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            ))}
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
    </>
  );
};

export default Testexam;
