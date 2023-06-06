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
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import Moment from "react-moment";

const Studentlist = () => {
  const studentists = useSelector((state) => state.studentlist.data.document);
  const isLoading = useSelector((state) => state.studentlist.isLoading);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers =
    currentData && currentData.slice(indexOfFirstPage, indexOfLastPage);
  const dispatch = useDispatch();
  const totalPages = currentData ? Math.ceil(currentData.length / postsPerPage) : 0;

  //date picker
  const [values, setValues] = useState([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(studentlistd());
  }, [dispatch]);

  useEffect(() => {
    setCurrentData(studentists);
    return () => {
      setValues([]);
    };
  }, [studentists]);

  useEffect(() => {
    searchItem();
  }, [searchTerm]);

  const searchItem = () => {
    if (studentists) { // Add null check here
      const filteredData = studentists.filter((item) => {
        const itemDate = new Date(item.createdAt);
        const name = item.name ? item.name.toLowerCase() : null;
  
        return (
          (!values[0] || itemDate >= values[0].toDate()) &&
          (!values[1] || itemDate <= values[1].toDate()) &&
          (!searchTerm || name === searchTerm.toLowerCase())
        );
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
          {isLoading ? (
            <p
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}>
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
                colors={["black"]}
              />
            </p>
          ) : (
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
                              placeholder="search name"
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
                            <Button
                              className="algin-right"
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
                          {displayUsers && displayUsers.length > 0 ? (
                          displayUsers && displayUsers.map((data) => (
                              <tbody key={data._id}>
                                <tr>
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
                                    {data.balance
                                      ? parseFloat(data.balance).toFixed(4)
                                      : "-"}
                                  </td>
                                  <td>
                                    <Link to={`/studentdetails/${data._id}`}>
                                      <button className="btn btn-primary btn-sm">
                                        click
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              </tbody>
                            ))
                          ) : (
                            <tbody>
                              <tr>
                                <td colSpan="8">
                                  <h4>No student Found ...</h4>
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
                    </div>
                  </div>
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

export default Studentlist;
