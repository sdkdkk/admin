import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Button } from "react-bootstrap";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import "./permission.css";
import { Pagination } from "@mui/material";

const url = process.env.REACT_APP_API_BASE_URL;

const Roles = () => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const notify = (data) => toast(data);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  let token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers = data.slice(indexOfFirstPage, indexOfLastPage);
  const totalPages = Math.ceil(data.length / postsPerPage);

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
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading1(true);
      const response = await axios.post(`${url}/admin/getadminrole`, {
        token: token,
      });
      setData(response.data.document);
      setLoading1(false);
    } catch (error) {
      logoutIfInvalidToken(error.response);
      notify(data.error);
      setLoading1(false);
    }
  };

  async function handleDeleteClick(_id) {
    setDeleteLoading(true);
    try {
      setLoading(true);
      const response = await axios.post(`${url}/admin/deleteadminrole/${_id}`, {
        token: token,
      });
      const tempData = [...data].filter((a) => a._id !== _id);
      setData(tempData);
      notify(response.data.message);
      setLoading(false);
    } catch (error) {
      logoutIfInvalidToken(error.response);
      notify(error.response.data.error);

      setLoading1(false);
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Role</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <Link to="/addnewrole">
                            <button className="add-user-btn">
                              Add New Role
                            </button>
                          </Link>
                        </div>
                        <div className="col-lg-12 mt-4">
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Sr.No</th>
                                  <th>Role</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              {loading1 ? ( 
                                <tbody>
                                  <tr>
                                    <td colSpan="3" className="text-center">
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
                              ) : (
                                <tbody>
                                  {displayUsers?.length === 0 ? (
                                    <tr>
                                      <td
                                        colSpan="3"
                                        className="fw-3 fw-bolder text-center">
                                        No Data found
                                      </td>
                                    </tr>
                                  ) : (
                                    displayUsers.map((rowData, index) => (
                                      <tr key={rowData?._id}>
                                        <td>{index + 1}</td>
                                        <td>{rowData.rolename}</td>
                                        <td>
                                          <Link
                                            to={`/addnewrole?id=${rowData._id}`}>
                                            <Button variant="success">
                                              Edit
                                            </Button>
                                          </Link>
                                          <Button
                                            className="mx-2"
                                            variant="danger"
                                            disabled={deleteLoading}
                                            onClick={() =>
                                              handleDeleteClick(rowData._id)
                                            }>
                                            Delete
                                          </Button>
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
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Roles;
