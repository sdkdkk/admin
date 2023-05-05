import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";

const Tutorsearch = () => {

  return (
    <>
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
                  <div className="card">
                    <div className="card-body">
                      <div>
                        <input
                          type="text"
                          placeholder="Please Search question.."
                        />
                        <button
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
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">

                      <div class="table-responsive">
                        <table class="table v-top">
                          <thead>
                            <tr>
                              <th scope="col">Question</th>
                              <th scope="col">Question Type</th>
                              <th scope="col">Question Subject</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>What is the capital of France?</td>
                              <td>Multiple Choice</td>
                              <td>Geography</td>
                            </tr>
                            <tr>
                              <td>Who wrote the novel "To Kill a Mockingbird"?</td>
                              <td>Short Answer</td>
                              <td>Literature</td>
                            </tr>
                            <tr>
                              <td>What is the formula for calculating the area of a circle?</td>
                              <td>Fill in the Blank</td>
                              <td>Mathematics</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="table-pagination">
                        <button
                          className="btn btn-primary">
                          {" "}
                          prev{" "}
                        </button>
                        <button className="btn btn-primary mx-2">
                        </button>
                        <button
                          className="btn btn-primary">
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
    </>
  )

}

export default Tutorsearch;