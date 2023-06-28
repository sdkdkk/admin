import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { DateObject } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { Pagination } from "@mui/material";
import { studentlistd } from "../../Redux/Loginpages/studentlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ColorRing, RotatingLines } from "react-loader-spinner";
import Moment from "react-moment";

const Studentlist = () => {
  const studentists = useSelector((state) => state.studentlist.data.document);
  const isLoading = useSelector((state) => state.studentlist.isLoading);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers =
    currentData && currentData.slice(indexOfFirstPage, indexOfLastPage);

  const dispatch = useDispatch();

  const totalPages = currentData
    ? Math.ceil(currentData.length / postsPerPage)
    : 0;

  //date picker
  const [values, setValues] = useState([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);

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
    // Retrieve the "page" query parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    const initialPage = pageParam ? parseInt(pageParam) : 1;

    setCurrentPage(initialPage);
  }, [location.search]);

  useEffect(() => {
    dispatch(studentlistd());
  }, [dispatch]);

  useEffect(() => {
    setCurrentData(studentists);
    return () => {
      setValues([]);
    };
  }, [studentists]);

  const searchItem = () => {
    if (studentists) {
      const filteredData = studentists.filter((item) => {
        const itemDate = new Date(item.createdAt);
        const name = item.name ? item.name.toLowerCase() : null;
        const email = item.email ? item.email.toLowerCase() : null;

        // Check if item matches date range filter
        const dateMatch =
          (values.length === 1 &&
            itemDate.getDate() === values[0].toDate().getDate() &&
            itemDate.getMonth() === values[0].toDate().getMonth() &&
            itemDate.getFullYear() === values[0].toDate().getFullYear()) ||
          (values.length === 2 &&
            itemDate >= values[0].toDate() &&
            itemDate <= values[1].toDate()) ||
          values.length === 0;

        // Check if item matches search term filter
        const searchMatch =
          !searchTerm ||
          (name && name.includes(searchTerm.toLowerCase())) ||
          (email && email.includes(searchTerm.toLowerCase()));

        return dateMatch && searchMatch;
      });

      setCurrentData(filteredData);
    }
  };

  return (
    <div>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />

          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Student List</h3>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <input
                            type="text"
                            id="fname"
                            className="form-control me-2"
                            placeholder="search name"
                            aria-label="Search"
                            name="fname"
                            value={searchTerm}
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-md-4">
                          <DatePicker
                            rangeHover
                            className="rmdp-input date"
                            value={values}
                            onChange={setValues}
                            range
                            render={<InputIcon />}
                            width={500}
                          />
                        </div>
                        <div className="col-md-2">
                          <Button className="algin-right" onClick={searchItem}>
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
                      <table className="table v-top">
                        <thead>
                          <tr>
                            <th scope="col">Reg.Date</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobil No</th>
                            <th scope="col">Question Ask</th>
                            <th scope="col">Min Balance</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        {isLoading ? ( // Condition for displaying loader
                          <tbody>
                            <tr>
                              <td colSpan="7" className="text-center">
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
                                  <div className="mobile-loader-text"></div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ) : (
                          <tbody>
                            {displayUsers?.length === 0 ? (
                              <tr>
                                <td
                                  colSpan="7"
                                  className="fw-2 fw-bolder text-center">
                                  
                                  No Student Found
                                </td>
                              </tr>
                            ) : (
                              displayUsers &&
                              displayUsers?.map((data) => (
                                <tr key={data._id}>
                                  <td>
                                    {data.createdAt ? (
                                      <Moment format="DD MMM YYYY" withTitle>
                                        {data.createdAt}
                                      </Moment>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                  <td>{data.name || "-"}</td>
                                  <td>{data.email.substring(0, 25)}</td>
                                  <td>{data.mobileNo || "-"}</td>
                                  <td>{data.questions}</td>
                                  <td>
                                    $
                                    {data.balance
                                      ? parseFloat(data.balance).toFixed(2)
                                      : "0"}
                                  </td>
                                  <td>
                                    <Link to={`/studentdetails/${data._id}`}>
                                      <button className="btn btn-primary btn-sm">
                                        See Details
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        )}
                      </table>

                      <div className="table-pagination float-end">
                        <Pagination
                          count={totalPages}
                          page={currentPage}
                          onChange={handleChange}
                          shape="rounded"
                          variant="outlined"
                          siblingCount={0}
                        />
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
    </div>
  );
};

export default Studentlist;
