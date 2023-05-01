import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Button } from "react-bootstrap";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Tutors/Tutorlist.css";
import { DateObject } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { Pagination } from "@mui/material";
// import { TutorList } from "../Data/Data1";
import { useDispatch, useSelector } from "react-redux";
import { tutorunverified } from "../../Redux/Loginpages/tutorunverifiedSlice";
import { Tutorsuspended } from "../../Redux/Loginpages/tutorsuspendedSlice";
import { Link, useNavigate } from "react-router-dom";
import { tutorworking } from "../../Redux/Loginpages/tutorworkingSlice";
import { ColorRing } from "react-loader-spinner";
import Moment from "react-moment";

const Tutorlist = () => {
  //table
  const users = useSelector((state) => state.user.data.document);
  const Suspended = useSelector((state) => state.suspended.data.document);
  const working = useSelector((state) => state.working.data.document);
  const isLoadinguser = useSelector((state) => state.user.isLoading);

  const [selectedStatus, setSelectedStatus] = useState("working");
  const [status, setStatus] = useState({
    users: [],
    Suspended: [],
    working: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  const dispatch = useDispatch();
  const [Loader, setLoader] = useState(true);

  useEffect(() => {
    setStatus({
      users: users,
      Suspended: Suspended,
      working: working,
    });
    setLoader(false);
  }, [users, Suspended, working]);

  useEffect(() => {
    dispatch(tutorworking());
  }, []);

  const fetchData1 = async () => {
    setActiveButton(3);
    dispatch(tutorunverified());
  };

  const fetchData2 = async () => {
    setActiveButton(2);
    dispatch(Tutorsuspended());
  };

  const fetchData3 = async () => {
    setActiveButton(1);
    dispatch(tutorworking());
  };

  useEffect(() => {
    setCurrentData(status[selectedStatus]);
    return () => {
      setValues([])
    }
  }, [selectedStatus, status]);

  //date picker
  const [values, setValues] = useState([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);

//   const firstDate = values.length > 0 ? new DateObject(values[0]).toDate() : null
// const lastDate = values.length > 0 ? new DateObject(values[values.length - 1]).toDate() : null
// console.log(firstDate, lastDate)

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  let displayUsers =
    currentData && currentData.slice(indexOfFirstPage, indexOfLastPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  function numberWithCommas(subjects) {
    return subjects && subjects.toLocaleString();
  }

  
// const filteredData = displayUsers.filter(item => {
//   const itemDate = new Date(item.updatedAt);
//   return itemDate >= new Date(firstDate) && itemDate <= new Date(lastDate);
// });
// if(filteredData.length > 0){
//   displayUsers = [...filteredData]
// }

const searchItem=()=>{
  console.log(searchTerm)
  const firstDate = values.length > 0 ? new DateObject(values[0]).toDate() : null
  const lastDate = values.length > 0 ? new DateObject(values[values.length - 1]).toDate() : null
  const filteredData = displayUsers.filter(item => {
    const itemDate = new Date(item.updatedAt);
    const name = item.name ? item.name.toLowerCase() : null
    return itemDate >= new Date(firstDate) && itemDate <= new Date(lastDate) && searchTerm == name;
  });
  console.log(firstDate, lastDate)
  console.log(filteredData)
  setCurrentData(filteredData)
  // currentData = [...filteredData]
}

console.log("---> ", currentData)


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
                  <h3 className="main-text">Tutors List</h3>
                </div>
                <div className="page-header">
                  <div className="col-md-12">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button
                        onClick={fetchData3}
                        className={activeButton === 1 ? "activeb" : ""}
                        // className="btn btn-primary me-md-2 active"
                        type="button"
                        style={{ borderRadius: "4px" }}>
                        Working
                      </button>
                      <button
                        onClick={fetchData2}
                        className={activeButton === 2 ? "activeb" : ""}
                        // className="btn btn-primary"
                        type="button"
                        style={{ borderRadius: "4px" }}>
                        Suspended
                      </button>
                      <button
                        onClick={fetchData1}
                        className={activeButton === 3 ? "activeb" : ""}
                        // className="btn btn-primary"
                        type="button"
                        style={{ borderRadius: "4px" }}>
                        Unverified
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
                                  <Button className="algin-right" onClick={()=> searchItem()}>
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
                                    <th scope="col">Reg.DATE</th>
                                    <th scope="col">USER NAME</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">MOBILE NO</th>
                                    <th scope="col">SUBJECTS</th>
                                    <th scope="col">BALANCE</th>
                                    <th scope="col">Action</th>
                                  </tr>
                                </thead>
                                {displayUsers &&
                                  displayUsers
                                    // .filter((val) => {
                                    //   if (!val.name) {
                                    //     return true; // or return true, depending on how you want to handle this case
                                    //   }
                                    //   if (searchTerm === "") {
                                    //     return true;
                                    //   } else if (
                                    //     val.name
                                    //       .toLowerCase()
                                    //       .includes(searchTerm.toLowerCase())
                                    //   ) {
                                    //     return true;
                                    //   } else {
                                    //     return false;
                                    //   }
                                    // })
                                    .map((data) => (
                                      <tbody key={data._id}>
                                        <tr>
                                          {data.updatedAt ? (

                                          <td>
                                            <Moment
                                              format="DD MMM YYYY"
                                              withTitle>
                                              {data.updatedAt || null}
                                            </Moment>
                                          </td>
                                          ) : <td >-</td>}
                                          <td>{data.name}</td>
                                          <td>{data.email}</td>
                                          <td>{data.mobileNo}</td>
                                          <td>
                                            {numberWithCommas(data.subjects)}
                                          </td>
                                          <td>{data.balance}</td>
                                          <td>
                                            <Link
                                              to={`/tutordetails/${data._id}`}>
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
                                  count={4}
                                  page={currentPage}
                                  onChange={handleChange}
                                  shape="rounded"
                                  variant="outlined"
                                  showFirstButton
                                  showLastButton
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

export default Tutorlist;
