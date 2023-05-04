import React, { useState, useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";

// import Form from "react-bootstrap/Form";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Searchquestion = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  console.log(searchResults);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleSearch = async (limit = 5, skip = 0) => {
    try {
      console.log(limit);
      console.log(typeof limit);
      const response = await axios.post(
        `https://vaidik-backend.onrender.com/admin/adminsearchquestion?limit=${limit}&skip=${skip}&search=${searchTerm}`,
        {
          token: token,
        }
      );
      setIsLoading(true);
      console.log(response.data);
      setSearchResults(response.data.data);

      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
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
    console.log(limit, skip);
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
                      <input
                        type="text"
                        value={searchTerm}
                        placeholder="Please Search question.."
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button
                        onClick={handleSearch}
                        className=" btn btn-primary mx-4">
                        Search
                      </button>
                      {/* <ul>
                          {searchResults &&
                            searchResults.map((result) => (
                              <li key={result._id}>{result.question}</li>
                            ))}
                        </ul> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      {isLoading ? (
                        <div style={{ marginLeft: "450px", marginTop: "50px" }}>
                          <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
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
                              searchResults.map((data) => (
                                <tr>
                                  <td
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      toComponentB(data);
                                    }}>
                                    {" "}
                                    {data.question
                                      .split(" ")
                                      .slice(0, 5)
                                      .join(" ")}
                                    ...
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

export default Searchquestion;
