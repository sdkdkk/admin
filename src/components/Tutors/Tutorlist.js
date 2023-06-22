import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Tutors/Tutorlist.css";
import { DateObject } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { tutorunverified } from "../../Redux/Loginpages/tutorunverifiedSlice";
import { Tutorswarning } from "../../Redux/Loginpages/tutorwarningSlice";
import { Link, useLocation } from "react-router-dom";
import { tutorworking } from "../../Redux/Loginpages/tutorworkingSlice";
import { RotatingLines } from "react-loader-spinner";
import Moment from "react-moment";
import { Tutortrial } from "../../Redux/Loginpages/tutortrialSlice";
import { Tutorsuspend } from "../../Redux/Loginpages/tutorSuspendSlice";

const Tutorlist = () => {
  //table
  const users = useSelector((state) => state.user.data.document);
  const warning = useSelector((state) => state.warning.data.document);
  const working = useSelector((state) => state.working.data.document);
  const suspend = useSelector((state) => state.suspend.data.document);
  const trial = useSelector((state) => state.trial.data.document);
  const isLoadinguser = useSelector((state) => state.user.isLoading);

  const [selectedStatus, setSelectedStatus] = useState("working");
  const [status, setStatus] = useState({
    users: [],
    warning: [],
    working: [],
    suspend: [],
    trial: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  const dispatch = useDispatch();
  const [Loader, setLoader] = useState(true);

  useEffect(() => {
    setStatus({
      users: users,
      warning: warning,
      working: working,
      suspend: suspend,
      trial: trial,
    });
    setLoader(false);
  }, [users, warning, working, suspend, trial]);

  useEffect(() => {
    dispatch(tutorworking());
  }, []);

  const fetchData1 = async () => {
    setActiveButton(3);
    dispatch(tutorunverified());
    setCurrentPage(1);
  };

  const fetchData2 = async () => {
    setActiveButton(2);
    dispatch(Tutorswarning());
    setCurrentPage(1);
  };

  const fetchData3 = async () => {
    setActiveButton(1);
    dispatch(tutorworking());
    setCurrentPage(1);
  };

  const fetchData4 = async () => {
    setActiveButton(4);
    dispatch(Tutortrial());
    setCurrentPage(1);
  };

  const fetchData5 = async () => {
    setActiveButton(5);
    dispatch(Tutorsuspend());
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentData(status[selectedStatus]);
    return () => {
      setValues([]);
    };
  }, [selectedStatus, status]);

  //date picker
  const [values, setValues] = useState([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);

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

  
  const searchItem = () => {
  const firstDate = values?.length > 0 ? new Date(values[0]) : null;
  const lastDate = values?.length > 1 ? new Date(values[values.length - 1]) : null;

  const filteredData = currentData.filter((item) => {
    const itemDate = new Date(item.updatedAt);
    const name = item.name ? item.name.toLowerCase() : null;
    const email = item.email ? item.email.toLowerCase() : null;

    if (firstDate && lastDate) {
      // Handle range selection
      return (
        itemDate >= firstDate &&
        itemDate <= lastDate &&
        (searchTerm === "" ||
          (name && name.includes(searchTerm.toLowerCase())) ||
          (email && email.includes(searchTerm.toLowerCase())))
      );
    } else if (firstDate) {
      // Handle single date selection
      return (
        itemDate.getDate() === firstDate.getDate() &&
        itemDate.getMonth() === firstDate.getMonth() &&
        itemDate.getFullYear() === firstDate.getFullYear() &&
        (searchTerm === "" ||
          (name && name.includes(searchTerm.toLowerCase())) ||
          (email && email.includes(searchTerm.toLowerCase())))
      );
    } else {
      // Handle no date selection
      return (
        searchTerm === "" ||
        (name && name.includes(searchTerm.toLowerCase())) ||
        (email && email.includes(searchTerm.toLowerCase()))
      );
    }
  });

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
                <h3 className="main-text">Tutors List</h3>
              </div>
              <div className="page-header">
                <div className="col-md-12">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      onClick={fetchData3}
                      className={
                        activeButton === 1 ? "btn btn-primary" : "btn btn-light"
                      }
                      type="button"
                      style={{ borderRadius: "4px" }}>
                      Working
                    </button>
                    <button
                      onClick={fetchData2}
                      className={
                        activeButton === 2 ? "btn btn-primary" : "btn btn-light"
                      }
                      type="button"
                      style={{ borderRadius: "4px" }}>
                      Warning
                    </button>
                    <button
                      onClick={fetchData1}
                      className={
                        activeButton === 3 ? "btn btn-primary" : "btn btn-light"
                      }
                      type="button"
                      style={{ borderRadius: "4px" }}>
                      Unverified
                    </button>
                    <button
                      onClick={fetchData4}
                      className={
                        activeButton === 4 ? "btn btn-primary" : "btn btn-light"
                      }
                      type="button"
                      style={{ borderRadius: "4px" }}>
                      Trial
                    </button>
                    <button
                      onClick={fetchData5}
                      className={
                        activeButton === 5 ? "btn btn-primary" : "btn btn-light"
                      }
                      type="button"
                      style={{ borderRadius: "4px" }}>
                      Suspend
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <>
                  <div className="row">
                    <div className=" col-12 grid-margin stretch-card">
                      <div className="card">

                         <div className="card-body">

                          <div className="row">
                            <div className="col-md-6">
                              <Form>
                                <Form.Control
                                  type="search"
                                  id="fname"
                                  className="form-control me-3"
                                  placeholder="search name"
                                  aria-label="Search"
                                  name="fname"
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                />
                              </Form>
                            </div>

                            <div className="col-md-4">
                              <DatePicker
                                rangeHover
                                className="rmdp-input date"
                                value={values}
                                onChange={setValues}
                                range
                                render={<InputIcon />}
                              // width={100}
                              />
                            </div>

                            <div className="col-md-2">
                              <Button
                                className="btn-search "
                                onClick={searchItem}>
                                Search
                              </Button>
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
                        
                              {displayUsers && displayUsers.length === 0 ? (
                                <div className="no-tutor-found text-center text-danger ">
                                  No tutor found
                                </div>
                              ) : (
                                <table className="table v-top">
                                  <thead>
                                    <tr>
                                      <th scope="col">Reg.Date</th>
                                      <th scope="col">User Name</th>
                                      <th scope="col">Email</th>
                                      <th scope="col">Moble No</th>
                                      <th scope="col">Subject</th>
                                      <th scope="col">Balance</th>
                                      {activeButton === 2 && (
                                        <th scope="col">No. of warning Que</th>
                                      )}
                                      {activeButton === 5 && (
                                        <th scope="col">No. of reaming day</th>
                                      )}
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                   {isLoadinguser ? ( 
                                                        <tbody>
                                                        <tr>
                                                            <td colSpan="8" className="text-center">
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
                                                            </div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    ) :  <tbody>
                                    {displayUsers?.map((data, id) => (
                                      <tr key={id}>
                                        {data.updatedAt ? (
                                          <td>
                                            <Moment
                                              format="DD MMM YYYY"
                                              withTitle>
                                              {data.updatedAt || null}
                                            </Moment>
                                          </td>
                                        ) : (
                                          <td>-</td>
                                        )}
                                        <td>{data.name || "-"}</td>
                                        <td>{data.email.substring(0, 20)}</td>
                                        <td>{data.mobileNo || "-"}</td>
                                        <td>
                                          {data.subjects &&
                                            data.subjects?.length > 0
                                            ? data.subjects
                                              .slice(0, 2)
                                              .join(", ")
                                            : "-"}
                                        </td>
                                        <td>
                                          {data.balance
                                            ? parseFloat(data.balance).toFixed(
                                              2
                                            )
                                            : "-"}
                                        </td>
                                        {activeButton === 2 && (
                                          <td className="text-center">
                                            {data.warningQuestions}
                                          </td>
                                        )}
                                        {activeButton === 5 && (
                                          <td className="text-center">
                                            {data.daysRemaining}
                                          </td>
                                        )}
                                        <td>
                                          <Link
                                            to={`/tutordetails/${data._id}/${activeButton}`}>
                                            <Button className="btn btn-primary btn-sm">
                                              See Details
                                            </Button>
                                          </Link>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>}
                                </table>
                              )}
                           

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
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorlist;
