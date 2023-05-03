import React from "react";
import { Link} from "react-router-dom";
import { useForm } from "react-hook-form";
// import "../../Selectfrom.css"
import { useDispatch, useSelector } from "react-redux";
// import "./Login.css";
import { signUp } from "../../Redux/Loginpages/authSlice";
import Logo from "../Image/vaidik-logo.png";

const Signup = () => {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  // console.log(token)
  const dispatch = useDispatch();
  console.log(auth);

  //Signup use form hook
  const {
    register,
    watch,
    handleSubmit,
    // control,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    console.log(" form 1 data", data);
    delete data.cpassword;
    delete data.mobile;
    delete data.OTP;
    if (data.referralCode === "") {
      delete data.referralCode;
    }
    console.log(" form 1 data updated", data);
    localStorage.setItem("token", token);
    dispatch(signUp(data));
    setTimeout(() => {
      // navigate("/")
    }, 500);
  };

  // For Change password
  const password = watch("password");

  return (
    <>
      <div
        class="card mt-3"
        style={{
          width: "60%",
          margin: "auto",
          padding: "10px",
          alignItems: "center",
        }}>
        <img src={Logo} alt="img" className="logo-img-login" />
        <div class="card-body">
          <h4 className="title text-center mb--10">Sign Up</h4>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            className="rbt-profile-row rbt-default-form row row--15">
            <div className="col-lg-12 col-md-12 col-12">
              <div className="rbt-form-group">
                <label for="exampleInputEmail1" class="form-label">
                  Email{" "}
                </label>
                <input
                  placeholder="Enter Your Email ID"
                  type="email"
                  class="form-control"
                  {...register("email", {
                    required: "Please Enter A Valid Email!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    },
                  })}
                />
                <p className="text-danger">
                  {errors.email && errors.email.message}
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="rbt-form-group">
                <label for="exampleInputEmail1" class="form-label">
                  Password{" "}
                </label>
                <input
                  placeholder="Enter your password"
                  type="password"
                  class="form-control"
                  {...register("password", {
                    required: "You must specify a password",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                />
                <p className="text-danger">
                  {errors.password && errors.password.message}
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="rbt-form-group">
                <label for="exampleInputEmail1" class="form-label">
                  Confirm Password{" "}
                </label>
                <input
                  placeholder="Re-enter your password"
                  type="password"
                  class="form-control"
                  {...register("cpassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === password || "The password does not match",
                  })}
                />
                <p className="text-danger">
                  {errors.cpassword && errors.cpassword.message}
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="rbt-form-group">
                <label for="exampleInputEmail1" class="form-label">
                  Mobile Number{" "}
                </label>
                <input
                  placeholder="+91 (55555-55555)"
                  type="tel"
                  class="form-control"
                  {...register("mobile", {
                    required: "Enter Mobile number!",
                  })}
                />
                <p className="text-danger">
                  {errors.mobile && errors.mobile.message}
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="rbt-form-group">
                <label for="exampleInputEmail1" class="form-label">
                  OTP{" "}
                </label>
                <input
                  placeholder="Type your OTP here"
                  type="tel"
                  class="form-control"
                  {...register("OTP", {
                    required: "You must OTP",
                    minLength: {
                      value: 4,
                      message: "OTP must have at least 4 characters",
                    },
                  })}
                />
                <p className="text-danger">
                  {errors.OTP && errors.OTP.message}
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="filter-select rbt-modern-select mb--15">
                <label for="exampleInputEmail1" class="form-label">
                  Class{" "}
                </label>
                <div className="dropdown react-bootstrap-select w-100">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    {...register("class", { required: true })}>
                    <option value="">Select your Class</option>
                    <option value="1">John</option>
                    <option value="2">Due</option>
                    <option value="3">Due John</option>
                    <option value="4">johndue</option>
                  </select>
                  {errors.class && (
                    <p className="text-danger">Please select a Class</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="rbt-form-group">
                <label for="exampleInputEmail1" class="form-label">
                  Referral Code{" "}
                </label>
                <input
                  placeholder="Enter your referral code"
                  type="text"
                  class="form-control"
                  {...register("referralCode", {
                    minLength: {
                      value: 12,
                      message: "referral code must 12 characters",
                    },
                  })}
                />
                <p className="text-danger">
                  {" "}
                  {errors.referralCode && errors.referralCode.message}
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <div className="rbt-form-group">
                <button
                  className="rbt-btn btn-primary btn-sm mr--10 text-center w-100"
                  type="submit">
                  Sign Up
                </button>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-12 text-center mt--50">
              Already have an account?{" "}
              <Link className="color-primary" to="#">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
