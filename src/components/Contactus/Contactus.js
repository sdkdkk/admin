import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Tutors/Tutorlist.css";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { getstudentcontact } from "../../Redux/Loginpages/getstudentcontactSlice";
import { gettutorcontact } from "../../Redux/Loginpages/gettutorcontactSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Contactus = () => {
  const studentcontact = useSelector(
    (state) => state.studentcontact.data.document
  );
  const tutorcontact = useSelector((state) => state.tutorcontact.data.document);

  const [selectedStatus, setSelectedStatus] = useState("studentcontact");
  const [searchName, setSearchName] = useState("");
  const [status, setStatus] = useState({
    studentcontact: [],
    tutorcontact: [],
    selectedStatus: 1,
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
    dispatch(getstudentcontact()).then(() => setLoader(false));
  }, []);

  const fetchData1 = async () => {
    setActiveButton(1);
    setStatus({ ...status, selectedStatus: "all" });
    setLoader(true);
    dispatch(getstudentcontact("all")).then(() => setLoader(false));
    setSearchName("");
  };

  const fetchData2 = async () => {
    setActiveButton(2);
    setStatus({ ...status, selectedStatus: "all" });
    setLoader(true);
    dispatch(gettutorcontact("all")).then(() => setLoader(false));
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
  const totalPages = Math.ceil((currentData?.length || 0) / postsPerPage);

  const location = useLocation();

  const handleChange = (event, value) => {
    setCurrentPage(value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${searchParams.toString()}`
    );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    const initialPage = pageParam ? parseInt(pageParam) : 1;
    setCurrentPage(initialPage);
  }, [location.search]);
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
                      className={
                        activeButton === 1 ? "btn btn-primary" : "btn btn-light"
                      }
                      type="button"
                      style={{ borderRadius: "4px" }}>
                      Student Contact
                    </button>
                    <button
                      onClick={fetchData2}
                      className={
                        activeButton === 2 ? "btn btn-primary" : "btn btn-light"
                      }
                      type="button"
                      style={{ borderRadius: "4px" }}>
                      Tutor Contact
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="row">
                  <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <input
                              className="w-100"
                              type="text"
                              id="fname"
                              placeholder="search name"
                              name="fname"
                              value={searchName}
                              onChange={(e) => setSearchName(e.target.value)}
                            />
                          </div>
                          <div className="col-12 col-md-2 mt-3 mt-md-0">
                            <Button
                              className="algin-right mt-1"
                              onClick={handleSearch}>
                              Search
                            </Button>
                          </div>
                          <div className="col-12 col-md-4 mt-3 mt-md-0">
                            <div className="filter-select rbt-modern-select ">
                              <div className="dropdown react-bootstrap-select w-100">
                                <select
                                  className="w-100 form-select mt-1"
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
                      {Loader ? (
                        <div className="loader-container">
                           <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="50"
                            visible={true}
                          />
                        </div>
                      ) : (
                        <div className="card-body">
                          <table className="table v-top">
                            <thead>
                              <tr>
                                <th scope="col">Sr. No</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile No</th>
                                <th scope="col">Message</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            {displayUsers && displayUsers.length > 0 ? (
                              displayUsers.map((data, id) => (
                                <tbody key={data._id}>
                                  <tr>
                                    <td>{id + 1}</td>
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
                              ))
                            ) : (
                              <tbody>
                                <tr>
                                  <td colSpan="8">
                                    <h4>No contact Found ...</h4>
                                  </td>
                                </tr>
                              </tbody>
                            )}
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
                      )}
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

export default Contactus;
