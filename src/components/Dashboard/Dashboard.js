import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
// import "../Css/Tutorlist.css";
import { BsPaypal, BsFillMenuButtonWideFill } from "react-icons/bs";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import { Button } from "react-bootstrap";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

const Dashboard = () => {
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  let token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let token = localStorage.getItem("token");
    try {
      setLoading1(true);

      const response = await axios.post(
        `https://vaidik-backend.onrender.com/admin/dashboardstats`,
        { token: token }
      );
      setData(response.data.dashboardStats);
      setLoading1(false);
    } catch (error) {
      setLoading1(false);
    }
  };

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row purchace-popup" />
              <div className="row">
                <div className="col-md-12 grid-margin">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="d-sm-flex align-items-baseline report-summary-header">
                            <h5 className="font-weight-semibold">Dashboard</h5>
                          </div>
                        </div>
                      </div>
                      <div className="row report-inner-cards-wrapper">
                        <div className=" col-md -6 col-xl report-inner-card">
                          <div className="inner-card-text">
                            <span className="report-title">Total Earning</span>
                            <h4>Rs.10,234</h4>
                          </div>
                          <Button className="inner-card-icon bg-success">
                            <BsPaypal />
                          </Button>
                        </div>
                        <div className="col-md-6 col-xl report-inner-card">
                          <div className="inner-card-text">
                            <span className="report-title">
                              Total Distrubution
                            </span>
                            <h4>
                              Rs. {data?.totalMoneyDistributed?.[0].total}
                            </h4>
                          </div>
                          <Button className="inner-card-icon bg-primary">
                            <BsFillMenuButtonWideFill />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title mb-0">
                        <Button className="btn mr-2 dash-ico">
                          <Person2OutlinedIcon />
                        </Button>
                        <div className="mt-2 font-weight-bold">
                          Tutor Registration
                        </div>
                      </div>
                      <div className="template-demo">
                        <table className="table mb-0">
                          <thead>
                            <tr>
                              <th className="pl-0">Today</th>
                              <th className="text-right font-weight-bold">
                                {data.tutorRegistrations &&
                                  data.tutorRegistrations.today}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="pl-0">Last 7 Days</td>
                              <td className="text-right font-weight-bold">
                                {data.tutorRegistrations &&
                                  data.tutorRegistrations.last7Days}
                              </td>
                            </tr>
                            <tr>
                              <td className="pl-0">Last 30 Days</td>
                              <td className="text-right font-weight-bold">
                                {data.tutorRegistrations &&
                                  data.tutorRegistrations.last30Days}
                              </td>
                            </tr>
                            <tr>
                              <td className="pl-0">Suspended Tutor</td>
                              <td className="text-right font-weight-bold">
                                {data.tutorRegistrations &&
                                  data.tutorRegistrations.trialTutors}
                              </td>
                            </tr>
                            <tr>
                              <td className="pl-0">Unverified Tutor</td>
                              <td className="text-right font-weight-bold">
                                {data.tutorRegistrations &&
                                  data.tutorRegistrations.unverifiedTutors}
                              </td>
                            </tr>
                            <tr>
                              <td className="pl-0">Working Tutor</td>
                              <td className="text-right font-weight-bold">
                                {data.tutorRegistrations &&
                                  data.tutorRegistrations.verifiedTutors}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title">
                        <Button className="btn mr-2 dash-ico">
                          <Person2OutlinedIcon />
                        </Button>
                        <div className="mt-2 font-weight-bold">
                          Student Registration
                        </div>
                      </div>
                      <div className="template-demo">
                        <table className="table mb-0">
                          <thead>
                            <tr>
                              <th className="pl-0">Today</th>
                              <th className="text-right font-weight-bold">
                                {data.studentRegistrations &&
                                  data.studentRegistrations.today}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="pl-0">Last 7 Days</td>
                              <td className="text-right font-weight-bold">
                                {data.studentRegistrations &&
                                  data.studentRegistrations.last7Days}
                              </td>
                            </tr>
                            <tr>
                              <td className="pl-0">Last 30 Days</td>
                              <td className="text-right font-weight-bold">
                                {data.studentRegistrations &&
                                  data.studentRegistrations.last30Days}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title">
                        <Button className="btn mr-2 dash-ico">
                          <StickyNote2OutlinedIcon />
                        </Button>
                        <div className="mt-2 font-weight-bold">Questions</div>
                      </div>
                      <div className="template-demo">
                        <table className="table mb-0">
                          <thead>
                            <tr>
                              <th className="pl-0">Today</th>
                              <th className="text-right font-weight-bold">
                                {data?.questionsAsked?.today}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="pl-0">Last 7 Days</td>
                              <td className="text-right font-weight-bold">
                                {data?.questionsAsked?.last7Days}
                              </td>
                            </tr>
                            <tr>
                              <td className="pl-0">Last 30 Days</td>
                              <td className="text-right font-weight-bold">
                                {data?.questionsAsked?.last30Days}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title">
                        <Button className="btn mr-2 dash-ico">
                          <StickyNote2OutlinedIcon />
                        </Button>
                        <div className="mt-2 font-weight-bold">
                          Unsolved Questions
                        </div>
                      </div>
                      <div className="template-demo">
                        <table className="table mb-0">
                          <thead>
                            <tr>
                              <th className="pl-0">Today</th>
                              <th className="text-right font-weight-bold">
                                {data?.unsolvedQuestions?.today}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="pl-0">Last 7 Days</td>
                              <td className="text-right font-weight-bold">
                                {data?.unsolvedQuestions?.last7Days}
                              </td>
                            </tr>
                            <tr>
                              <td className="pl-0">Last 30 Days</td>
                              <td className="text-right font-weight-bold">
                                {data?.unsolvedQuestions?.last30Days}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title">
                        <Button className="btn mr-2 dash-ico">
                          <Person2OutlinedIcon />
                        </Button>
                        <div className="mt-2 font-weight-bold">Answer</div>
                      </div>
                      <div className="template-demo">
                        <table className="table mb-0">
                          <thead>
                            <tr>
                              <th className="pl-0">Today</th>
                              <th className="text-right font-weight-bold">
                                {data?.answeredQuestions?.today}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="pl-0">Last 7 Days</td>
                              <td className="text-right font-weight-bold">
                                {data?.answeredQuestions?.last7Days}
                              </td>
                            </tr>
                            <tr>
                              <td className="pl-0">Last 30 Days</td>
                              <td className="text-right font-weight-bold">
                                {data?.answeredQuestions?.last30Days}
                              </td>
                            </tr>
                          </tbody>
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

export default Dashboard;
