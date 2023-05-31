import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Button } from "react-bootstrap";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Tutors/Tutorlist.css";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import { getstudentcontact } from "../../Redux/Loginpages/getstudentcontactSlice";
import { gettutorcontact } from "../../Redux/Loginpages/gettutorcontactSlice";
import { useNavigate } from "react-router-dom";

const Contactus = () => {
  const studentcontact = useSelector(
    (state) => state.studentcontact.data.document
  );
  const tutorcontact = useSelector((state) => state.tutorcontact.data.document);
  const isLoadinguser = useSelector((state) => state.user.isLoading);

  const [selectedStatus, setSelectedStatus] = useState("studentcontact");
  const [searchName, setSearchName] = useState("");
  const [status, setStatus] = useState({
    studentcontact: [],
    tutorcontact: [],
    selectedStatus: 1, // Default value for solved (you can change it as per your requirement)
  });

  const [currentData, setCurrentData] = useState(status[selectedStatus]);
  const [activeButton, setActiveButton] = useState(1);
  const dispatch = useDispatch();
  const [Loader, setLoader] = useState(true);

  useEffect(() => {
    setStatus({
      studentcontact: studentcontact,
      tutorcontact: tutorcontact,
    });
    setLoader(false);
  }, [studentcontact, tutorcontact]);

  useEffect(() => {
    dispatch(getstudentcontact());
  }, []);

  // const fetchData1 = async () => {
  //   setActiveButton(1);
  //   setStatus({ ...status, selectedStatus: "all" });
  //   dispatch(getstudentcontact("all"));
  // };

  const fetchData1 = async () => {
    setActiveButton(1);
    setStatus({ ...status, selectedStatus: "all" });
    dispatch(getstudentcontact("all"));
    setSearchName("");
  };

  const fetchData2 = async () => {
    setActiveButton(2);
    setStatus({ ...status, selectedStatus: "all" });
    dispatch(gettutorcontact("all"));
  };

  useEffect(() => {
    setCurrentData(status[selectedStatus]);
  }, [selectedStatus, status[selectedStatus]]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  let displayUsers =
    currentData && currentData.slice(indexOfFirstPage, indexOfLastPage);
  const totalPages = Math.ceil(currentData?.length / postsPerPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  let navigate = useNavigate();

  const toComponentB = (data, _id) => {
    navigate("/contactdetails", { state: { data, _id } });
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatus({ ...status, selectedStatus });
    if (selectedStatus === "all") {
      const allData = [...status.studentcontact];
      setCurrentData(allData);
      setCurrentPage(1);
    } else if (selectedStatus === "1") {
      const allData = [...status.studentcontact];
      let data = [];
      allData.forEach((element) => {
        if (element.issolved === 1) {
          data.push(element);
        }
      });
      setCurrentData(data);
    } else {
      const allData = [...status.studentcontact];
      let data = [];
      allData.forEach((element) => {
        if (element.issolved === 0) {
          data.push(element);
        }
      });
      setCurrentData(data);
    }
  };

  const handleSearch = () => {
    // const allData = [...status.studentcontact];
    const filteredData = displayUsers.filter((item) =>
      item.fullname.toLowerCase().includes(searchName.toLowerCase())
    );
    setCurrentData(filteredData);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          {isLoadinguser ? (
            <p style={{ marginLeft: "500px", marginTop: "250px" }}>
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["black"]}
              />
            </p>
          ) : (
            <div className="main-panel">
              <div className="content-wrapper">
                <div className="oneline">
                  <h3 className="main-text">Contact List</h3>
                </div>
                <div className="page-header">
                  <div className="col-md-12">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button
                        onClick={fetchData1}
                        className={activeButton === 1 ? "activeb" : ""}
                        type="button"
                        style={{ borderRadius: "4px" }}>
                        Student Contact
                      </button>
                      <button
                        onClick={fetchData2}
                        className={activeButton === 2 ? "activeb" : ""}
                        type="button"
                        style={{ borderRadius: "4px" }}>
                        Tutor Contact
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  {Loader ? (
                    <div className="loader-end text-end">
                      {Loader ? (
                        <ColorRing
                          visible={true}
                          height="80"
                          width="80"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={["black"]}
                        />
                      ) : null}
                    </div>
                  ) : (
                    <>
                      <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                          <div className="card">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-6">
                                  <input
                                    type="text"
                                    id="fname"
                                    placeholder="search name"
                                    name="fname"
                                    value={searchName}
                                    onChange={(e) =>
                                      setSearchName(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="col-md-2">
                                  <Button
                                    className="algin-right"
                                    onClick={handleSearch}>
                                    Search
                                  </Button>
                                </div>
                                <div className="col-lg-4">
                                  <div className="filter-select rbt-modern-select ">
                                    <div className="dropdown react-bootstrap-select w-100">
                                      <select
                                        className="w-100 form-select"
                                        value={status.selectedStatus}
                                        onChange={handleStatusChange}
                                        id="displayname">
                                        <option value="all">All</option>
                                        <option value={1}>Solved</option>
                                        <option value={0}>Unsolved</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                          <div className="card new-table">
                            <div className="card-body">
                              <table className="table v-top">
                                <thead>
                                  <tr>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile No</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">Action</th>
                                  </tr>
                                </thead>
                                {displayUsers &&
                                  displayUsers.map((data) => (
                                    <tbody key={data._id}>
                                      <tr>
                                        <td>{data.fullname || "-"}</td>
                                        <td>{data.email.substring(0, 20)}</td>
                                        <td>{data.mobileNo || "-"}</td>
                                        <td>{data.Message || "-"}</td>
                                        <td>
                                          <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                              toComponentB(data);
                                            }}>
                                            click
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  ))}
                              </table>
                              <div className="table-pagination">
                                <Pagination
                                  count={totalPages}
                                  page={currentPage}
                                  onChange={handleChange}
                                  shape="rounded"
                                  variant="outlined"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <Footer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contactus;
