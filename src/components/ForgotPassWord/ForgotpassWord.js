import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "../Image/doubt-q.png";
import { ToastContainer, toast } from "react-toastify";
import "./forgotpw.css";

const url = process.env.REACT_APP_API_BASE_URL;

const ForgotpassWord = () => {
  const notify = (data) => toast(data);

  const { register, handleSubmit, reset } = useForm({});

  const onSubmit = async (data) => {

    try {
      const { response } = await axios.post(`${url}/admin/forgotpassword`,  data );

      if (data.status === 1) {
        notify(data.message);
        reset();
      } else {
        notify(data.error);
      }
    } catch (error) {
      notify(error.response.data.error);
    }
  };

  return (
    <>
      <div className="login-register-bg">
        <main className="d-lg-flex align-items-center justify-content-center d-block h-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto  ">
                <div className="logo pt--20 pb--20 text-center">
                  <Link to="/">
                    <img src={Logo} alt="img" className="logo-img-forgot" />
                  </Link>
                </div>
                <div className="rbt-contact-form contact-form-style-1 rbt-shadow-box mb-0 mx-2 ">
                  <div className="row align-items-center  border rounded p-3">
                    <div className="col-lg-5 mb_md--30 mb_sm--30 text-center">
                      <h4 className="fw-bold">
                        Get One Step Closer To <br />
                        <span className="normal-text">Your A+ Grade</span>
                      </h4>
                      <div className="col-lg-9 col-md-6 row align-items-center mx-auto mt--30 d-flex flex-row">
                        <div className="col-lg-3 col-3 text-center">
                          <img
                            className=""
                            src="../images/icons/sign_icon01.svg"
                            alt="img"
                          />
                        </div>
                        <div className="col-lg-9 col-9 text-start">
                          <h6 className="mb--0">Step by Step Solution</h6>
                          <p>with Explanation</p>
                        </div>
                      </div>
                      <div className="col-lg-9 col-md-6 row align-items-center mx-auto mt--20 d-flex flex-row">
                        <div className="col-lg-3 col-3 text-center">
                          <img
                            className=""
                            src="../images/icons/sign_icon02.svg"
                            alt="img"
                          />
                        </div>
                        <div className="col-lg-9 col-9 text-start">
                          <h6 className="mb--0">Save Time</h6>
                          <p>Never Miss Deadline</p>
                        </div>
                      </div>
                      <div className="col-lg-9 col-md-6 row align-items-center mx-auto mt--20 d-flex flex-row">
                        <div className="col-lg-3 col-3 text-center">
                          <img
                            className=""
                            src="../images/icons/sign_icon03.svg"
                            alt="img"
                          />
                        </div>
                        <div className="col-lg-9 col-9 text-start">
                          <h6 className="mb--0">100% Accuracy</h6>
                          <p>0% Plagiarism</p>
                        </div>
                      </div>
                      <div className="col-lg-9 col-md-6 row align-items-center mx-auto mt--20 d-flex flex-row">
                        <div className="col-lg-3 col-3 text-center">
                          <img
                            className=""
                            src="../images/icons/sign_icon04.svg"
                            alt="img"
                          />
                        </div>
                        <div className="col-lg-9 col-9 text-start">
                          <h6 className="mb--0">100% Confidential</h6>
                          <p>Fully Confident</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7 pl--30 pl_sm--0 border-signup">
                      <div className="">
                        <h4 className="title text-center mb--10">
                          Forgot Password?
                        </h4>
                        <form
                          action="#"
                          className="rbt-profile-row rbt-default-form row row--15"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="col-lg-12 col-md-12 col-12 mb-4">
                            <div className="rbt-form-group">
                              <label className="fw-bolder">Email</label>
                              <input
                                className="w-100"
                                placeholder="Enter Your Email ID"
                                type="email"
                                required
                                {...register("email")}
                              />
                            </div>
                          </div>

                          <div className="col-lg-12 col-md-12 col-12 text-end">
                            <div className="rbt-form-group">
                              <button
                                className="rbt-btn btn-gradient btn-sm mr--10 text-center w-100"
                                type="submit"
                              >
                                Reset Password
                              </button>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-12 text-center mt-4">
                            <div className="rbt-form-group">
                              <h6>
                                We have sent a password to your registered email
                                id.
                              </h6>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-12 text-center mt--50">
                            Don’t have an account?
                            <Link to="/login" className="color-primary">
                              Sign in
                            </Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotpassWord;
