import React, { useState, useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const url = process.env.REACT_APP_API_BASE_URL;

const Searchquestion = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleSearch = async (limit = 5, skip = 0) => {
    try {
      const response = await axios.post(
        `${url}/admin/adminsearchquestion?limit=${limit}&skip=${skip}&search=${searchTerm}`,
        {
          token: token,
        }
      );
      setIsLoading(true);
      setSearchResults(response.data.data);
      setIsLoading(false);
    } catch (error) {
      logoutIfInvalidToken(error.response);
      if (error.response) {
      }
    }
  };

  const toComponentB = (data) => {
    navigate("/Searchenginequedetail", { state: { data } });
  };

  useEffect(() => {
    setIsLoading(true);
    const skip = (currentPage - 1) * itemsPerPage;
    var limit = itemsPerPage;
    handleSearch(limit, skip).then(() => {
      setIsLoading(false); // Set isLoading to false when data is fetched
    });
  }, [currentPage, itemsPerPage]);

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
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <div className="d-flex">
                      <input
                        type="text"
                        value={searchTerm}
                        placeholder="Please Search question.."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control mr-2"
                      />
                      <button
                        onClick={() => handleSearch()}
                        className="btn btn-primary"
                      >
                        Search
                      </button>
                    </div>
                    </div>
                  </div>
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
                            {searchResults &&
                              searchResults.map((data,id) => (
                                <tr key={id}>
                                  <td
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      toComponentB(data);
                                    }}>
                                    
                                    {data.question
                                      .split(" ")
                                      .slice(0, 5)
                                      .join(" ")}
                                    ...
                                  </td>
                                  <td>{data.questionType}</td>
                                  <td>{data.questionSubject}</td>
                                  <td>{data.questionPrice}</td>
                                  <td>{data.status.toLowerCase()}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      )}

                      <div className="table-pagination">
                        <button
                          className="btn btn-primary"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}>
                          prev
                        </button>
                        <button className="btn btn-primary mx-2">
                          {currentPage}
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => setCurrentPage(currentPage + 1)}>
                          next
                        </button>
                      </div>
                      <div className="mt-2 text-end">
                        <Link to="/searchengine">
                          <button className="btn btn-primary mx-2">Back</button>
                        </Link>
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

export default Searchquestion;
