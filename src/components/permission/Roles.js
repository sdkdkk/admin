import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Button } from "react-bootstrap";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import "./permission.css";

const url = process.env.REACT_APP_API_BASE_URL;

const Roles = () => {
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
                            {loading1 ? (
                              <p className="loader-container">
                                <ColorRing
                                  visible={true}
                                  height="80"
                                  width="80"
                                  ariaLabel="blocks-loading"
                                  wrapperStyle={{}}
                                  wrapperclassName="blocks-wrapper"
                                  colors={["black"]}
                                />
                              </p>
                            ) : (
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Sr.No</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.map((rowData, index) => (
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
                                  ))}
                                </tbody>
                              </table>
                            )}
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
