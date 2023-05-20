import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { logoutIfInvalidToken } from "../../helpers/handleError";
const Addnewuser = () => {
  const [defaultValues, setDefaultValues] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    getValues,
    setValue
  } = useForm({ });
  const password = watch("password");
  const navigate = useNavigate();
  const notify = (data) => toast(data);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  let token = localStorage.getItem("token");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const requestUrl = `https://vaidik-backend.onrender.com/admin/newuser`;

      var response;
      if (data._id) {
        if (data.password) {
          response = await axios.post(requestUrl, {
            token: token,
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role,
            isactive: data.isactive,
            mainpassword: data.mainpassword,
            id: data._id,
          });
        } else {
          response = await axios.post(requestUrl, {
            token: token,
            username: data.username,
            email: data.email,
            role: data.role,
            isactive: data.isactive,
            mainpassword: data.mainpassword,
            id: data._id,
          });
        }
        console.log();
      } else {
        response = await axios.post(requestUrl, {
          token: token,
          username: data.username,
          email: data.email,
          password: data.password,
          //   cpassword: data.cpassword,
          role: data.role,
          isactive: data.isactive,
          mainpassword: data.mainpassword,
        });
      }
      if (response.data.message) {
        notify(response.data.message);
        console.log(data);
        reset();
        setTimeout(() => {
          navigate("/users");
        }, 1000);
        fetchData();
        adminrolename();
      } else {
        notify(data.error);
      }
    } catch (error) {
      logoutIfInvalidToken(error.response)
      console.log("error - ", error);
      notify(error.response.data.error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    adminrolename();
  }, []);

  const adminrolename = async () => {
    try {
      const response = await axios.post(
        `https://vaidik-backend.onrender.com/admin/role`,
        {
          token: token,
        }
      );
      console.log(response.data.data);
      setRoleData(response.data.data);
      setLoading1(false);
    } catch (error) {
      logoutIfInvalidToken(error.response)
      console.log(error.response.data.error);
      setLoading1(false);
    }
  };
  console.log(roleData);

  const fetchData = async () => {
    try {
      setLoading1(true);

      const response = await axios.post(
        `https://vaidik-backend.onrender.com/admin/getadmin`,
        {
          token: token,
        }
      );
      console.log(response.data.document);
      setData(response.data.document);
      setLoading1(false);
    } catch (error) {
      logoutIfInvalidToken(error.response)
      console.log(error.response.data.error);
      setLoading1(false);
    }
  };
  const { id } = useParams();

  const filtrData = data.filter((item) => item._id === id);

  //   const tableEditData = filtrData && filtrData?.map((item) => item);
  // console.log(tableEditData);
  const roleValue = filtrData?.[0]?.role?.rolename;

  const roleId = roleData.find((item) =>
    item.rolename === roleValue ? item._id : ""
  );

  const defaultRoleId = roleData?.find((a) => a.rolename === roleValue)?._id;

  useEffect(() => {
    if(!filtrData?.[0] || !defaultRoleId) return
    const defaultData = { ...filtrData?.[0], role: defaultRoleId };
    // setDefaultValues({ isactive: defaultData?.isactive });
    // delete defaultData.isactive;
    reset(defaultData);
    setValue("isactive", filtrData?.[0]?.isactive.toString())
  }, [data, defaultRoleId]);
  return (
    <>
      <div className="container-scrolsler">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title ">Add new user</h3>
              </div>

              <div className="row mt-3 justify-content-center">
                <div className="col-md-8 col-lg-6 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
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
                      ) : (
                        <form
                          className="user-form"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="form-group">
                            <label htmlFor="username">User Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              placeholder="Enter user name"
                              {...register("username", {
                                required: "Please Enter your name!",
                              })}
                              value={data.username}
                            />
                            <p className="text-danger">
                              {errors.username && errors.username.message}
                            </p>
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Enter email"
                              {...register("email", {
                                required: "Please Enter A Valid Email!",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                },
                              })}
                            />
                            <p className="text-danger">
                              {errors.email && errors.email.message}
                            </p>
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              autocomplete="new-password"
                              placeholder="Enter password"
                              {...register("password", {
                                minLength: {
                                  value: 6,
                                  message:
                                    "Password must have at least 6 characters",
                                },
                              })}
                            />
                            {data ? (
                              <p className="text-danger">
                                {errors.password && errors.password.message}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="confirm-password">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="confirm-password"
                              placeholder="Confirm password"
                              {...register("cpassword", {
                                validate: (value) =>
                                  value === password ||
                                  "The password does not match",
                              })}
                            />{" "}
                            {data ? (
                              <p className="text-danger">
                                {errors.cpassword && errors.cpassword.message}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="user-role">User Role</label>
                            <select
                              className="form-control"
                              id="user-role"
                              defaultValue={defaultRoleId}
                              {...register("role", { required: true })}
                              //  placeholder="Please select your Role"
                              //  value={roleId === roleValue}
                            >
                              {roleData &&
                                roleData.map((value) => {
                                  return (
                                    <option
                                      value={value._id}
                                      key={value._id}
                                      selected={roleValue}
                                    >
                                      {value.rolename}
                                    </option>
                                  );
                                })}
                            </select>
                            {errors.role && (
                              <p className="text-danger">
                                Please select a Role
                              </p>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="account-status">
                              This Account Is
                            </label>
                            <div className="form-check">
                              <input
                                className={`form-check-input ${
                                  errors.accountStatus ? "is-invalid" : ""
                                }`}
                                type="radio"
                                name="account-status"
                                id="isactive"
                                value="1"
                                {...register("isactive", {
                                  required: "Please select an account status",
                                })}
                                // checked={
                                //   formIsActive == 1 ? true : false
                                // }
                                //   checked={tableEditData?.[0]?.isactive === 1}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="isactive"
                              >
                                Active
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className={`form-check-input ${
                                  errors.accountStatus ? "is-invalid" : ""
                                }`}
                                type="radio"
                                name="account-status"
                                id="disabled"
                                value="0"
                                {...register("isactive", {
                                  required: "Please select an account status",
                                })}
                                // checked={
                                //   formIsActive == 0 ? true : false
                                // }
                                //   checked={tableEditData?.[0]?.isactive === 0}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="disabled"
                              >
                                Disabled
                              </label>
                            </div>
                            {errors.isactive && (
                              <div className="invalid-feedback">
                                {errors.isactive.message}
                              </div>
                            )}
                          </div>

                          <div className="text-title mt-4">
                            <h5>Current User Identity Verification</h5>
                            <div className="form-group">
                              <label htmlFor="Your-password">
                                Your Password
                              </label>
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
                      )}
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

export default Addnewuser;
