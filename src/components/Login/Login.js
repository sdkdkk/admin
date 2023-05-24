import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
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

const Login = () => {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(auth);

  // sign in form validation
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm({});

  // const onSubmit1 = (data) => {
  //   console.log("data1", data);
  //   localStorage.setItem("data", token);
  //   dispatch(signIn(data));
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 500);
  // };

  useEffect(() =>{
    if(auth?.isSuccess){
      dispatch(resetAuthAction())
      navigate("/");
    }

  },[auth?.isSuccess])
  
  const onSubmit1 = (data) => {
    console.log("data1", data);
    // localStorage.setItem("token", token);
    dispatch(signIn(data));
    
  };

  return (
    <div>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard className="bg-white my-5 mx-auto">
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                {/* <h2 className="fw-bold mb-2 text-center">Sign in</h2> */}
                <div className="login-logo" align="center">
                  <img src={Logo} alt="img" className="logo-img-login" />
                </div>
                <p className="text-white-50 mb-3">
                  Please enter your login and password!
                </p>
                <form
                  onSubmit={handleSubmit1(onSubmit1)}
                  action="#"
                  className="rbt-profile-row rbt-default-form row row--15">
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="rbt-form-group">
                      <label htmlFor="exampleInputEmail1"  className="form-label">
                        Email address
                      </label>
                      <input
                        placeholder="Enter Your Email ID"
                        type="email"
                         className="form-control"
                        {...register1("email", {
                          required: "Please Enter A Valid Email!",
                          // pattern: {
                          //     value:
                          //         /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          // },
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
                  {auth.error && auth.error.error }
                </span>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Login;
