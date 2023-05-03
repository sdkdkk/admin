import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
// import { Pagination } from "@mui/material";
import { Button } from "react-bootstrap";
// import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { searchengine } from "../../Redux/Loginpages/searchengineSlice";
import { useNavigate } from "react-router-dom";

const Searchengine = () => {
  const searchengineState = useSelector((state) => state.searchengine);
  const searchengineerror = useSelector((state) => state.searchengine.error);
  console.log(searchengineerror)
  let navigate = useNavigate();
  const dispatch = useDispatch();



  


useEffect(()=>{  
  if (searchengineerror && (searchengineerror.error === "Please enter correct Token!" || searchengineerror.error === "Invalid refresh token!")) {
    try {
      console.log(searchengineerror)
      var limit =5, skip = 0, act = 1;
      dispatch(searchengine(limit, skip, act)).then(() => {
        navigate('/login');
      });
      
    } catch (error) {
      console.log("cccfg - ",error);
    }
   }
},[searchengineerror,dispatch,navigate])

  

// console.log(searchengineState)
  const toComponentB = (data) => {
    navigate("/Searchenginequedetail", { state: { data } });
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const skip = (currentPage - 1) * itemsPerPage;
    var limit = itemsPerPage;
    // dispatch(searchengine(limit, skip));
    dispatch(searchengine(limit, skip, 0)).then(() => {
      setIsLoading(false); // Set isLoading to false when data is fetched
    });
  }, [currentPage, itemsPerPage]);

  const searchengineData = searchengineState?.user?.data || [];
  return (
    <div>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="oneline">
                <h3 className="main-text">Search Engine</h3>
              </div>
              <div className="page-header mt-4">
                <div className="mb-2 mt-2">
                  <Link to="/addnew">
                    <Button variant="primary" size="lg">
                      Add New
                    </Button>
                  </Link>
                  <Link to="/searchquestion">
                    <Button
                      className="search-btn mx-2"
                      variant="secondary"
                      size="lg">
                      Search Question
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <table className="table v-top">
                        <thead>
                          <tr>
                            <th scope="col">Question</th>
                            <th scope="col">Question Type</th>
                            <th scope="col">Question Subject</th>

                            <th scope="col">Question Price</th>
                            <th scope="col">status</th>

                            <th scope="col">ACTION</th>
                          </tr>
                        </thead>
                        {searchengineData.map((data) => (
                          <tbody>
                            <tr>
                              <td
                               style={{cursor:"pointer"}}
                                onClick={() => {
                                  toComponentB(data);
                                }}>
                                {data.question.split(" ").slice(0,3 ).join(" ")}...
                              </td>
                              <td>{data.questionType}</td>
                              <td>{data.questionSubject}</td>
                              <td>{data.questionPrice}</td>
                              <td>{data.status}</td>

                              <td>
                                <Link>
                                  <button className="btn btn-primary btn-sm">
                                    click
                                  </button>
                                </Link>
                              </td>
                              {/* <td>
                                    <Link to={`/studentdetails/${data._id}`}>
                                      <button className="btn btn-primary btn-sm">
                                        click
                                      </button>
                                    </Link>
                                  </td> */}
                            </tr>
                          </tbody>
                        ))}
                      </table>
                      <div className="table-pagination">
                        <button
                          className="btn btn-primary"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}>
                          {" "}
                          prev{" "}
                        </button>
                        <button className="btn btn-primary mx-2">
                          {currentPage}
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          // disabled={
                          //   currentPage ===
                          //   Math.ceil(Searchengine.length / postsPerPage)
                          // }
                        >
                          {" "}
                          next{" "}
                        </button>
                        {/* <Pagination
                          count={4}
                          page={currentPage}
                          onChange={handleChange}
                          shape="rounded"
                          variant="outlined"
                          showFirstButton
                          showLastButton
                        /> */}
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

export default Searchengine;
