import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const Addnewuser = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({});
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
    console.log(data);
    try {
      setLoading(true);
      const requestUrl = `https://vaidik-backend.onrender.com/admin/newuser`;

      var response;
        if (data._id) {
          console.log();
        response = await axios.post(requestUrl, {
          token: token,
          username: data.username,
          email: data.email,
          password: data.password,
          //   cpassword: data.cpassword,
          role: data.role,
          isactive: data.active,
          mainpassword: data.mainpassword,
        });
      } else {
        response = await axios.post(requestUrl, {
          token: token,
          username: data.username,
          email: data.email,
          password: data.password,
          //   cpassword: data.cpassword,
          role: data.role,
          isactive: data.active,
          mainpassword: data.mainpassword,
        });
      }
      console.log(response);
      if (response.data.message) {
        notify(response.data.message);
        console.log(data);
        reset();
        setTimeout(() => {
          navigate("/users");
        }, 1000);
        // fetchData();
      } else {
        notify(data.error);
      }
    } catch (error) {
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
      console.log(error.response.data.error);
      setLoading1(false);
    }
  };
  const { id } = useParams();

  const filtrData = data.filter((item) => item._id === id);
  console.log(filtrData);
  const tableEditData = filtrData && filtrData?.map((item) => item);
  console.log(tableEditData?.[0]?.isactive);

  useEffect(() => {
    reset(tableEditData?.[0]);
  }, [reset, data]);
  return (
    <>
      <div className="container-scroller">
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
                            placeholder="Enter password"
                            {...register("password", {
                              required: "You must specify a password",
                              minLength: {
                                value: 6,
                                message:
                                  "Password must have at least 6 characters",
                              },
                            })}
                          />
                          <p className="text-danger">
                            {errors.password && errors.password.message}
                          </p>
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
                              required: "Confirm password is required",
                              validate: (value) =>
                                value === password ||
                                "The password does not match",
                            })}
                          />{" "}
                          <p className="text-danger">
                            {errors.cpassword && errors.cpassword.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label htmlFor="user-role">User Role</label>
                          <select
                            className="form-control"
                            id="user-role"
                            {...register("role", { required: true })}
                            placeholder="Please select your Role"
                          >
                            { roleData && roleData.map((value) => {
                              return <option value={value._id}>{value.rolename}</option>;
                            })}
                          </select>
                          {errors.role && (
                            <p className="text-danger">Please select a Role</p>
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
                              id="active"
                              value="1"
                              {...register("active", {
                                required: "Please select an account status",
                              })}
                            //   checked={tableEditData?.[0]?.isactive === 1}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="active"
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
                              {...register("active", {
                                required: "Please select an account status",
                              })}
                            //   checked={tableEditData?.[0]?.isactive === 0}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="disabled"
                            >
                              Disabled
                            </label>
                          </div>
                          {errors.active && (
                            <div className="invalid-feedback">
                              {errors.active.message}
                            </div>
                          )}
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
                          <button type="submit" className="btn btn-primary">
                            Submit
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

export default Addnewuser;
