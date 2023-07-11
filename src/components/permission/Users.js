import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "./permission.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const url = process.env.REACT_APP_API_BASE_URL;
const Users = () => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const notify = (data) => toast(data);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  let token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading1(true);
      const response = await axios.post(`${url}/admin/getadmin`, {
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
      const response = await axios.post(`${url}/admin/deleteadmin/${_id}`, {
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
                <h3 className="page-title">User</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <Link to="/addnewuser">
                            <button className="add-user-btn">
                              Add New User
                            </button>
                          </Link>
                        </div>
                        <div className="col-lg-12 mt-4">
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Sr.No</th>
                                  <th>User Name</th>
                                  <th>Email</th>
                                  <th>Status</th>
                                  <th>Role</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              {loading1 ? (
                                <tbody>
                                  <tr>
                                    <td colSpan="6" className="text-center">
                                      <div className="d-flex justify-content-center align-items-center">
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
                                          <div className="mobile-loader-text ml-5 mr-5"></div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              ) : (
                                <tbody>
                                  {data?.length === 0 ? (
                                    <tr>
                                      <td
                                        colSpan="4"
                                        className="fw-3 fw-bolder text-center">
                                        No Users found
                                      </td>
                                    </tr>
                                  ) : (
                                    data.map((value, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>{value.username}</td>
                                          <td>{value.email}</td>
                                          <td>{value.isactive}</td>
                                          <td>
                                            {typeof value.role === "object"
                                              ? value?.role?.rolename
                                              : value.role}
                                          </td>
                                          <td>
                                            <Link
                                              to={`/addnewuser/${value._id}`}>
                                              <Button variant="success">
                                                Edit
                                              </Button>
                                            </Link>
                                            <Button
                                              className="mx-2"
                                              variant="danger"
                                              disabled={deleteLoading}
                                              onClick={() =>
                                                handleDeleteClick(value._id)
                                              }>
                                              Delete
                                            </Button>
                                          </td>
                                        </tr>
                                      );
                                    })
                                  )}
                                </tbody>
                              )}
                            </table>
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

export default Users;
