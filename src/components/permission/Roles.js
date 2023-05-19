import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Button } from "react-bootstrap";
import { getResourceValue } from "../../helpers/helper";

const Roles = () => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const notify = (data) => toast(data);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  console.log("data", data);
  let token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading1(true);

      const response = await axios.post(
        `https://vaidik-backend.onrender.com/admin/getadminrole`,
        {
          token: token,
        }
      );
      console.log(response.data);
      setData(response.data.document);

      setLoading1(false);
    } catch (error) {
      console.log(data);
      console.log(error);
      notify(data.error);

      setLoading1(false);
    }
  };

  async function handleDeleteClick(_id) {
    setDeleteLoading(true);
    try {
      setLoading(true);

      const response = await axios.post(
        `https://vaidik-backend.onrender.com/admin/deleteadminrole/${_id}`,
        {
          token: token,
        }
      );
      const tempData = [...data].filter((a) => a._id !== _id);
      setData(tempData);
      console.log(response.data.message);

      notify(response.data.message);
      setLoading(false);
    } catch (error) {
      console.log(data);
      console.log(error.response.data.error);
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
                              <p
                                style={{
                                  marginLeft: "400px",
                                  marginTop: "50px",
                                }}
                              >
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
                            ) : (<table className="table">
                              <thead>
                                <tr>
                                  <th>Sr.No</th>
                                  <th>Role</th>
                                  {/* <th>Allowed Scope</th> */}
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((rowData, index) => (
                                  <tr key={rowData?._id}>
                                    <td>{index + 1}</td>
                                    <td>{rowData.rolename}</td>
                                    {/* <td>{getResourceValue(rowData.action)}</td> */}
                                    <td>
                                          <Link to={`/addnewrole?id=${rowData._id}`}>
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
                                            }
                                          >
                                            Delete
                                          </Button>
                                        </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>)}
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
