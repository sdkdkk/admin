import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchengine } from "../../Redux/Loginpages/searchengineSlice";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const Searchengine = () => {
  const searchengineState = useSelector((state) => state.searchengine);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const toComponentB = (data) => {
    navigate("/Searchenginequedetail", { state: { data } });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    setIsLoading(true);
    const skip = (currentPage - 1) * itemsPerPage;
    var limit = itemsPerPage;
    dispatch(searchengine(limit, skip, 0)).then(() => {
      setIsLoading(false);
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
                      {isLoading ? (
                        <div className="loader-container">
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
                        <table className="table v-top">
                          <thead>
                            <tr>
                              <th scope="col">Question</th>
                              <th scope="col">Question Type</th>
                              <th scope="col">Question Subject</th>
                              <th scope="col">Question Price</th>
                              <th scope="col">status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {searchengineData.map((data) => (
                              <tr key={data.id}>
                                <td
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    toComponentB(data);
                                  }}>
                                  {data.question.split(" ").slice(0, 3).join(" ")}
                                </td>
                                <td>{data.questionType}</td>
                                <td>{data.questionSubject}</td>
                                <td>{data.questionPrice}</td>
                                <td>{data.status}</td>
                              </tr>
                            ))}{" "}
                          </tbody>
                        </table>
                      )}

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
                          onClick={() => setCurrentPage(currentPage + 1)}>
                          {" "}
                          next{" "}
                        </button>
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
