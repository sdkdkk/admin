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
// import { StudentList } from "../Data/Data1";
import { studentlistd } from "../../Redux/Loginpages/studentlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const Studentlist = () => {
  const studentists = useSelector((state) => state.studentlist.data.document);
  const isLoading = useSelector((state) => state.studentlist.isLoading);

  console.log(studentists);
  //table
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers =
    studentists && studentists.slice(indexOfFirstPage, indexOfLastPage);
  const dispatch = useDispatch();
  const totalPages = Math.ceil(studentists.length / postsPerPage);
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

  
  return (
    <div>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          {isLoading ? (
            <p style={{marginLeft:"500px",marginTop:"250px"}}>
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
                <div className="page-header">
                  <h3 className="page-title">Student List</h3>
                </div>
                <div className="row">
                  <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
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
                            <Button className="algin-right">Search</Button>
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
                              <th scope="col">Reg.DATE</th>
                              <th scope="col">USER NAME</th>
                              <th scope="col">EMAIL</th>
                              <th scope="col">MOBILE NO</th>
                              <th scope="col">QUESTION ASK</th>
                              <th scope="col">MIN BALANCE</th>
                              <th scope="col">ACTION</th>
                            </tr>
                          </thead>
                          {displayUsers &&
                            displayUsers.map((data) => (
                              <tbody>
                                <tr>
                                  <td>{data.date}</td>
                                  <td>{data.name}</td>
                                  <td>{data.email}</td>
                                  <td>{data.mobileNo}</td>
                                  <td>{data.questions}</td>
                                  <td>{data.balance}</td>
                                  <td>
                                    <Link to={`/studentdetails/${data._id}`}>
                                      <button className="btn btn-primary btn-sm">
                                        click
                                      </button>
                                    </Link>
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
                            // showFirstButton
                            // showLastButton
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
