import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./permission.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { resourcesList } from "../../helpers/helper";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const url = process.env.REACT_APP_API_BASE_URL;

const Addnewrole = () => {
  const { register, handleSubmit, watch, formState: { errors },  reset,} = useForm({});

  const password = watch("password");
  const navigate = useNavigate();
  const notify = (data) => toast(data);

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  const [resourceData, setResourceData] = useState([]);
  
  let token = localStorage.getItem("token");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const requestUrl = `${url}/admin/adminrole`;

      var response;
      if (data._id) {
        response = await axios.post(requestUrl, {
          token: token,
          rolename: data.rolename,
          action: resourceData,
          mainpassword: data.mainpassword,
          id: data._id,
        });
      } else {
        response = await axios.post(requestUrl, {
          token: token,
          rolename: data.rolename,
          action: resourceData,
          email: data.email,
          mainpassword: data.mainpassword,
        });
      }
      if (response.data.message) {
        notify(response.data.message);
        reset();
        setTimeout(() => {
          navigate("/roles");
        }, 1000);
        fetchData();
      } else {
        notify(data.error);
      }
    } catch (error) {
      logoutIfInvalidToken(error.response);
      notify(error.response.data.error);
    }

    setLoading(false);
  };

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
      setLoading1(false);
    }
  };
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const id = params.get("id");

  const filtrData = data.filter((item) => item._id === id);
  const roleValue = filtrData?.[0]?.role?.rolename || "";

  const handleResourceChange = (index) => {
    const allSubmunus = resourcesList
      .map((a) => a.id)
      .filter((a) => Math.floor(a) === index);
    if (resourceData?.includes(index)) {
      if (allSubmunus.length) {
        const tempData = resourceData.filter((a) => !allSubmunus.includes(a));
        setResourceData(tempData);
      } else {
        const tempData = resourceData.filter((a) => a !== index);
        setResourceData(tempData);
      }
    } else {
      if (allSubmunus.length) {
        setResourceData((prev) => [...prev, ...allSubmunus]);
      } else {
        setResourceData((prev) => [...prev, index]);
      }
    }
  };

  useEffect(() => {
    reset(filtrData?.[0]);
    if (filtrData?.[0]?.action?.length) {
      setResourceData(filtrData?.[0]?.action);
    }
  }, [reset, data, roleValue]);

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Add New Role</h3>
              </div>

              <div className="row mt-3 justify-content-center">
                <div className="col-md-8 col-lg-6 grid-margin stretch-card">
                  <div className="card new-table">
                    <div
                      className={`card-body ${
                        loading1 ? "table-loading" : ""
                      }`}>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="user-form">
                        <div className="form-group">
                          <label for="username">Role Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="rolename"
                            required
                            placeholder="Enter user name"
                            {...register("rolename")}
                          />
                        </div>
                        <div className="form-group">
                          <label for="email">Resources</label>
                          <div className="main-scroll">
                            <div className="scroll-table">
                              <table className="table-body-cell">
                                <tbody>
                                  <tr>
                                    <td>
                                      <Link>
                                        <img
                                          className="table-body-cell"
                                          src="./img/WebResource (1).jpg"
                                          alt="Collapse Shop"
                                        />
                                      </Link>
                                    </td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked={resourceData?.includes(1)}
                                        onChange={() => handleResourceChange(1)}
                                      />
                                      <Link className="box-text">
                                        Dashboard
                                      </Link>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="table-block">
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <Link>
                                          <img
                                            className="table-body-cell"
                                            src="./img/WebResource (1).jpg"
                                            alt="Collapse Sarees"
                                          />
                                        </Link>
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(2)}
                                          onChange={() =>
                                            handleResourceChange(2)
                                          }
                                        />
                                        <Link className="box-text">Tutor</Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div className="table-block">
                                  <table className="table-body-cell">
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="images-box" />
                                        </td>
                                        <td>
                                          <div className="img-style">
                                            <img
                                              src="./img/WebResource2.jpg"
                                              alt="img"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <img
                                            className="webresource"
                                            src="./img/WebResource.jpg"
                                            alt="img"
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            checked={resourceData?.includes(
                                              2.1
                                            )}
                                            onChange={() =>
                                              handleResourceChange(2.1)
                                            }
                                          />
                                          <Link className="box-text">
                                            Tutor List
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table className="table-body-cell">
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="images-box" />
                                        </td>
                                        <td>
                                          <div className="img-style">
                                            <img
                                              src="./img/WebResource2.jpg"
                                              alt="img"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <img
                                            className="webresource"
                                            src="./img/WebResource3.jpg"
                                            alt="img"
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            checked={resourceData?.includes(
                                              2.2
                                            )}
                                            onChange={() =>
                                              handleResourceChange(2.2)
                                            }
                                          />
                                          <Link className="box-text">
                                            Tutor Payment
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <Link>
                                          <img
                                            className="table-body-cell"
                                            src="./img/WebResource (1).jpg"
                                            alt="Collapse Salwar Suits"
                                          />
                                        </Link>
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(3)}
                                          onChange={() =>
                                            handleResourceChange(3)
                                          }
                                        />
                                        <Link className="box-text">
                                          Student
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div className="table-block">
                                  <table className="table-body-cell">
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="images-box" />
                                        </td>
                                        <td>
                                          <div className="img-style">
                                            <img
                                              src="./img/WebResource2.jpg"
                                              alt="img"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <img
                                            className="webresource"
                                            src="./img/WebResource3.jpg"
                                            alt="img"
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            checked={resourceData?.includes(
                                              3.1
                                            )}
                                            onChange={() =>
                                              handleResourceChange(3.1)
                                            }
                                          />
                                          <Link className="box-text">
                                            Student List
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(4)}
                                          onChange={() =>
                                            handleResourceChange(4)
                                          }
                                        />
                                        <Link className="box-text">Wallet</Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(5)}
                                          onChange={() =>
                                            handleResourceChange(5)
                                          }
                                        />
                                        <Link className="box-text">
                                          Question Subject
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(6)}
                                          onChange={() =>
                                            handleResourceChange(6)
                                          }
                                        />
                                        <Link className="box-text">
                                          Question Type
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(7)}
                                          onChange={() =>
                                            handleResourceChange(7)
                                          }
                                        />
                                        <Link className="box-text">
                                          Currency
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(8)}
                                          onChange={() =>
                                            handleResourceChange(8)
                                          }
                                        />
                                        <Link className="box-text">
                                          Search Engine
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(9)}
                                          onChange={() =>
                                            handleResourceChange(9)
                                          }
                                        />
                                        <Link className="box-text">
                                          Question
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(10)}
                                          onChange={() =>
                                            handleResourceChange(10)
                                          }
                                        />
                                        <Link className="box-text">
                                          Question Timing
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(11)}
                                          onChange={() =>
                                            handleResourceChange(11)
                                          }
                                        />
                                        <Link className="box-text">
                                          Question Pricing
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(12)}
                                          onChange={() =>
                                            handleResourceChange(12)
                                          }
                                        />
                                        <Link className="box-text">
                                          Question Reanswer
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(13)}
                                          onChange={() =>
                                            handleResourceChange(13)
                                          }
                                        />
                                        <Link className="box-text">
                                          Tutor Exam Question
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(14)}
                                          onChange={() =>
                                            handleResourceChange(14)
                                          }
                                        />
                                        <Link className="box-text">
                                          Tutor Exam Checking
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(15)}
                                          onChange={() =>
                                            handleResourceChange(15)
                                          }
                                        />
                                        <Link className="box-text">
                                          Tutor Exam Configuration
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(16)}
                                          onChange={() =>
                                            handleResourceChange(16)
                                          }
                                        />
                                        <Link className="box-text">
                                          Testimonial
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(17)}
                                          onChange={() =>
                                            handleResourceChange(17)
                                          }
                                        />
                                        <Link className="box-text">Pages</Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(18)}
                                          onChange={() =>
                                            handleResourceChange(18)
                                          }
                                        />
                                        <Link className="box-text">
                                          Features
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(19)}
                                          onChange={() =>
                                            handleResourceChange(19)
                                          }
                                        />
                                        <Link className="box-text">
                                          Services
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(20)}
                                          onChange={() =>
                                            handleResourceChange(20)
                                          }
                                        />
                                        <Link className="box-text">Coupon</Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(21)}
                                          onChange={() =>
                                            handleResourceChange(21)
                                          }
                                        />
                                        <Link className="box-text">User</Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(22)}
                                          onChange={() =>
                                            handleResourceChange(22)
                                          }
                                        />
                                        <Link className="box-text">Role</Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div className="table-block">
                                  <table className="table-body-cell">
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="images-box" />
                                        </td>
                                        <td>
                                          <div className="img-style">
                                            <img
                                              src="./img/WebResource2.jpg"
                                              alt="img"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <img
                                            className="webresource"
                                            src="./img/WebResource.jpg"
                                            alt="img"
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            checked={resourceData?.includes(
                                              22.1
                                            )}
                                            onChange={() =>
                                              handleResourceChange(24.1)
                                            }
                                          />
                                          <Link className="box-text">
                                            Tutor
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table className="table-body-cell">
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="images-box" />
                                        </td>
                                        <td>
                                          <div className="img-style">
                                            <img
                                              src="./img/WebResource2.jpg"
                                              alt="img"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <img
                                            className="webresource"
                                            src="./img/WebResource3.jpg"
                                            alt="img"
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            checked={resourceData?.includes(
                                              22.2
                                            )}
                                            onChange={() =>
                                              handleResourceChange(24.2)
                                            }
                                          />
                                          <Link className="box-text">
                                            Admin
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>

                                  <table className="table-body-cell">
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="images-box" />
                                        </td>
                                        <td>
                                          <div className="img-style">
                                            <img
                                              src="./img/WebResource2.jpg"
                                              alt="img"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <img
                                            className="webresource"
                                            src="./img/WebResource.jpg"
                                            alt="img"
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            checked={resourceData?.includes(
                                              22.3
                                            )}
                                            onChange={() =>
                                              handleResourceChange(24.1)
                                            }
                                          />
                                          <Link className="box-text">
                                            Reanswer
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table className="table-body-cell">
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="images-box" />
                                        </td>
                                        <td>
                                          <div className="img-style">
                                            <img
                                              src="./img/WebResource2.jpg"
                                              alt="img"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <img
                                            className="webresource"
                                            src="./img/WebResource3.jpg"
                                            alt="img"
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            checked={resourceData?.includes(
                                              22.4
                                            )}
                                            onChange={() =>
                                              handleResourceChange(24.2)
                                            }
                                          />
                                          <Link className="box-text">
                                            UnSloved
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource3.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(23)}
                                          onChange={() =>
                                            handleResourceChange(23)
                                          }
                                        />
                                        <Link className="box-text">
                                          Profile
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <Link>
                                          <img
                                            className="table-body-cell"
                                            src="./img/WebResource (1).jpg"
                                            alt="Collapse Sarees"
                                          />
                                        </Link>
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(24)}
                                          onChange={() =>
                                            handleResourceChange(24)
                                          }
                                        />
                                        <Link className="box-text">Tutor</Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div className="table-block">
                                  <table className="table-body-cell">
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="images-box" />
                                        </td>
                                        <td>
                                          <div className="img-style">
                                            <img
                                              src="./img/WebResource2.jpg"
                                              alt="img"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <img
                                            className="webresource"
                                            src="./img/WebResource.jpg"
                                            alt="img"
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            checked={resourceData?.includes(
                                              24.1
                                            )}
                                            onChange={() =>
                                              handleResourceChange(24.1)
                                            }
                                          />
                                          <Link className="box-text">
                                            Social Media Setting
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table className="table-body-cell">
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="images-box" />
                                        </td>
                                        <td>
                                          <div className="img-style">
                                            <img
                                              src="./img/WebResource2.jpg"
                                              alt="img"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <img
                                            className="webresource"
                                            src="./img/WebResource3.jpg"
                                            alt="img"
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            checked={resourceData?.includes(
                                              24.2
                                            )}
                                            onChange={() =>
                                              handleResourceChange(24.2)
                                            }
                                          />
                                          <Link className="box-text">
                                            Email Setting
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <table className="table-body-cell">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="images-box" />
                                      </td>
                                      <td>
                                        <img
                                          className="webresource"
                                          src="./img/WebResource3.jpg"
                                          alt="img"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={resourceData?.includes(25)}
                                          onChange={() =>
                                            handleResourceChange(25)
                                          }
                                        />
                                        <Link className="box-text">
                                          Sign Out
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <Link
                              id="ContentPlaceHolder1_tView_SkipLink"
                              href=""
                            />
                          </div>
                        </div>
                        <div className="text-title mt-4">
                          <h5>Current User Identity Verification</h5>
                          <div className="form-group">
                            <label htmlFor="Your-password">Your Password</label>
                            <input
                              type="mainpassword"
                              className="form-control"
                              id="Your-password"
                              placeholder="Admin password"
                              required
                              {...register("mainpassword")}
                            />
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-end">
                          <button
                            disabled={loading}
                            type="submit"
                            className="btn btn-primary">
                            {!loading ? (
                              <>{data._id ? "Update" : "Submit"}</>
                            ) : (
                              "Loading..."
                            )}
                          </button>
                        </div>
                      </form>
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

export default Addnewrole;
