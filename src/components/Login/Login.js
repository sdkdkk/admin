import React, { useEffect } from "react";
import "../Css/Tutorlist.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import Logo from "../Image/doubt-q.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signIn, resetAuthAction } from "../../Redux/Loginpages/authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm({});

  useEffect(() => {
    if (auth?.isSuccess) {
      dispatch(resetAuthAction())
      navigate("/");
    }

  }, [auth?.isSuccess])

  const onSubmit1 = (data) => {
    dispatch(signIn(data));

  };

  return (
    <div className="login-register-bg">
      {/* <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard className="bg-white my-5 mx-auto">
              <MDBCardBody className="p-5 w-100 d-flex flex-column">

                <div className="login-logo" align="center">
                  <img src={Logo} alt="img" className="logo-img-login" />
                </div>
                <form
                  onSubmit={handleSubmit1(onSubmit1)}
                  action="#"
                  className="rbt-profile-row rbt-default-form row row--15">
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="rbt-form-group">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                      </label>
                      <input
                        placeholder="Enter Your Email ID"
                        type="email"
                        className="form-control"
                        {...register1("email", {
                          required: "Please Enter A Valid Email!"
                        })}
                      />
                      <p className="text-danger">
                        {errors1.email && errors1.email.message}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="rbt-form-group">
                      <label>Password</label>
                      <input
                        placeholder="Enter your password"
                        type="password"
                        className="form-control"
                        {...register1("password", {
                          required: "Enter Your Password",
                          minLength: {
                            value: 6,
                            message: "Password must be 6 digit",
                          },
                        })}
                      />
                      {
                        <p className="text-danger">
                          {errors1.password && errors1.password.message}
                        </p>
                      }
                    </div>
                  </div>
                  <div className="mt--5 text-end">
                    <Link className="color-primary pt--10" to="/forgotpassword">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12 text-end">
                    <div className="rbt-form-group">
                      <button
                        className="rbt-btn btn-primary btn-sm mr--10 text-center w-100"
                        disabled={auth.loading}
                        type="submit">
                        {auth.loading ? "Loading..." : "Sign In"}
                      </button>
                    </div>
                  </div>
                </form>
                <span className="text-danger">
                  {auth.error && auth.error.error}
                </span>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer> */}
      <main className="d-lg-flex align-items-center justify-content-center d-block h-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mx-auto ">
              <div className="logo pt--20 pb--20 text-center">
             <Link to="#">
             <img src={Logo} alt="DoubtQ Logo" />
             </Link>
              </div>
              <div className="rbt-contact-form contact-form-style-1 rbt-shadow-box mb--50">
                <div className="row align-items-center">
                  <div className="col-lg-12 pl--30 pl_sm--0">
                    <div className="">
                      <h4 className="title text-center mb--10"><b>Sign In</b></h4>
                      <form
                        onSubmit={handleSubmit1(onSubmit1)}
                        action="#"
                        className="rbt-profile-row rbt-default-form row row--15"
                      >
                        <div className="col-lg-12 col-md-12 col-12">
                          <div className="rbt-form-group">
                            <label>Email</label>
                            <input placeholder="Enter Your Email ID" type="email"
                              {...register1("email", {
                                required: "Please Enter A Valid Email!"
                              })}
                            />
                            <p className="text-danger">
                              {errors1.email && errors1.email.message}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                          <div className="rbt-form-group">
                            <label>Password</label>
                            <input
                              placeholder="Enter your password"
                              type="password"
                              {...register1("password", {
                                required: "Enter Your Password",
                                minLength: {
                                  value: 6,
                                  message: "Password must be 6 digit",
                                },
                              })}
                            />
                            {
                              <p className="text-danger">
                                {errors1.password && errors1.password.message}
                              </p>
                            }
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12 text-end">
                          <div className="mt--5">
                            <Link className="color-primary pt--10" to="/forgotpassword">
                              Forgot password?
                            </Link>
                          </div>
                          <div className="rbt-form-group">
                            <button
                              className="rbt-btn btn-primary btn-sm mt-2 mr--10 text-center w-100"
                              disabled={auth.loading}
                              type="submit">
                              {auth.loading ? "Loading..." : "Sign In"}
                            </button>
                          </div>
                        </div>
                      </form>
                      <span className="text-danger">
                        {auth.error && auth.error.error}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Login;
