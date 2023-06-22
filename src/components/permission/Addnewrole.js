import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./permission.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import { useDispatch, useSelector } from "react-redux";
import { getAdminPagesApi } from "../../Redux/Loginpages/getAdminPageSlice";
import { RotatingLines } from "react-loader-spinner";

const url = process.env.REACT_APP_API_BASE_URL;

const Addnewrole = () => {
  const dispatch = useDispatch();
  const getAdminPageSlice = useSelector((state) => state.getAdminPage?.data?.document);
  const isLoading = useSelector((state) => state.getAdminPage?.isLoading);
  const {register, handleSubmit, reset } = useForm({});

  const navigate = useNavigate();
  const notify = (data) => toast(data);

  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState([]);
  const [resourceData, setResourceData] = useState([]);

  let token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getAdminPagesApi({}));
  }, []);

  const onSubmit = async (data) => {
    try {
     
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

  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
    
      const response = await axios.post(`${url}/admin/getadminrole`, {
        token: token,
      });
      setData(response.data.document);
      
    } catch (error) {
      logoutIfInvalidToken(error.response);
     
    }
  };
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const id = params.get("id");

  const filtrData = data.filter((item) => item._id === id);
  const roleValue = filtrData?.[0]?.role?.rolename || "";

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }
  

  const handleResourceChange = (index) => {
    setResourceData((prev) => ([...prev, index].filter(onlyUnique)))
    // const allSubmunus = resourcesList
    //   .map((a) => a.id)
    //   .filter((a) => Math.floor(a) === index);
    // if (resourceData?.includes(index)) {
    //   if (allSubmunus.length) {
    //     const tempData = resourceData.filter((a) => !allSubmunus.includes(a));
    //     setResourceData(tempData);
    //   } else {
    //     const tempData = resourceData.filter((a) => a !== index);
    //     setResourceData(tempData);
    //   }
    // } else {
    //   if (allSubmunus.length) {
    //     setResourceData((prev) => [...prev, ...allSubmunus]);
    //   } else {
    //     setResourceData((prev) => [...prev, index]);
    //   }
    // }
  };

  useEffect(() => {
    if (filtrData?.[0]?.action?.length) {
      const selectedRoles = filtrData?.[0]?.action?.map((a) => a._id)
      setResourceData(selectedRoles);
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
                    <div className="card-body" >
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="user-form"
                      >
                        <div className="form-group">
                          <label htmlFor="username">Role Name</label>
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
                          <label htmlFor="email">Resources</label>
                          <div className="main-scroll">
                              {isLoading ? (
            <div
            className="loader-container"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}>
            <RotatingLines
              strokeColor="#d63384"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              visible={true}
            />
          </div>
          ) :<div className="scroll-table">
                            {getAdminPageSlice?.map((page, id) => (
                                <div className="table-block" key={id}>
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
                                            checked={resourceData?.includes(page._id)}
                                            onChange={() =>
                                              handleResourceChange(page._id)
                                            }
                                          />
                                          <Link className="box-text">
                                            {page.name}
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  {!!page?.subpages?.length && <div className="table-block">
                                    {page?.subpages.map((subMenu,id) =>(
                                      <table className="table-body-cell" key={id}>
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
                                              checked={resourceData?.includes(page._id)}
                                            />
                                            <Link className="box-text">
                                              {subMenu}
                                            </Link>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    ))}
                                  </div>}
                                </div>
                            ))}
                            </div>}
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
                            className="btn btn-primary"
                          >
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
