import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { ColorRing } from "react-loader-spinner";
import { Pagination } from "@mui/material";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-toastify/dist/ReactToastify.css";

import "react-phone-number-input/style.css";

const AddMobile = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({});
  //   const [phoneNumber, setPhoneNumber] = useState("");

  //   const handlePhoneNumberChange = (value) => {
  //     setPhoneNumber(value);
  //   };

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
    const notify = (data) => toast(data);

  //table
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const displayUsers = data?.slice(indexOfFirstPage, indexOfLastPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const totalPages = Math.ceil(data?.length / postsPerPage);

  const fetchData = async () => {
    try {
      setLoading1(true);
      const response = await axios.post(
        `https://vaidik-backend.onrender.com/admin/getmobileno`,
        {
          token: token,
        }
      );
      console.log(response.data.document);
      setData(response.data.document);
      setLoading1(false);
    } catch (error) {
      logoutIfInvalidToken(error.response);
      console.log(error.response.data.error);
      // notify("Invalid refresh token!");
      setLoading1(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const requestUrl = data._id
        ? `https://vaidik-backend.onrender.com/admin/mobileno`
        : `https://vaidik-backend.onrender.com/admin/mobileno`;
      var response;
      if (data._id) {
        response = await axios.post(requestUrl, {
          mobileNo: data.mobileNo,
          id: data._id,
          token: token,
        });
      } else {
        response = await axios.post(requestUrl, {
          mobileNo: data.mobileNo,
          token: token,
        });
      }
      if (response.data.status === 1) {
        toast.success(response.data.message);
        reset({
          mobileNo: "", // Clear couponCode field
        // Clear validityDate field
        });
        fetchData(); // Fetch updated data
      }
    } catch (error) {
      logoutIfInvalidToken(error.response);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  console.log(data)
  //   const handleUpdate = (questionType) => {
  //     setEditQuestionType(questionType); // Set the question type being edited
  //     reset({ questionType: questionType }); // Set the form values to the selected question type
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   };

  const handleUpdate = (coupon) => {
    reset(coupon);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function handleDelet(_id) {
    axios
      .post(`https://vaidik-backend.onrender.com/admin/mobileno/${_id}`, {
        token: token,
      })
      .then((response) => {
        fetchData();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  }

  const formatPhoneNumber = (phoneNumber) => {
    // Assuming phoneNumber is a string in the format "1234567890"
    const areaCode = phoneNumber.slice(0, 3);
    const firstPart = phoneNumber.slice(3, 6);
    const secondPart = phoneNumber.slice(6, 10);
    return `(${areaCode}) ${firstPart}-${secondPart}`;
  };

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Add Mobile No</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                        <div className="row mt-4">
                          <div className="col-lg-2 col-md-4 mt-2">
                            <h6>Mobile No</h6>
                          </div>
                          <div className="col-lg-4 col-md-8">
                            <div className="mb-3">
                              <div className="rbt-form-group">
                                <div className="d-flex flex-row-reverse">
                                  <div className="flex-grow-1">
                                    <Controller
                                      name="mobileNo"
                                      control={control}
                                      rules={{
                                        required: "Mobile number is required",
                                        pattern: {
                                          //   value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                                          message: "Invalid phone number",
                                        },
                                      }}
                                      render={({
                                        field: {
                                          onChange,
                                          onBlur,
                                          value,
                                          name,
                                          ref,
                                        },
                                      }) => (
                                        <PhoneInput
                                        className="mb-4"
                                        international
                                        defaultCountry="US"
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                      />
                                      )}
                                    />
                                    {errors.mobileNo && (
                                      <p className="error-msg">
                                        {errors.mobileNo.message}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-4 mt-0  align-items-center">
                            <Button
                              variant="primary"
                              type="submit"
                              disabled={loading}
                            >
                              {loading ? "Loading..." : "Add"}
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <div className="table-container">
                        {loading1 ? (
                          <p style={{ marginLeft: "400px", marginTop: "50px" }}>
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
                          <>
                            <Table
                              striped
                              bordered
                              hover
                              responsive
                              className="single-color"
                            >
                              <thead>
                                <tr>
                                  <th>Sr. No</th>
                                  <th>Question Type</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {displayUsers?.map((data, index, _id) => (
                                  <tr key={data._id}>
                                    <td>
                                      {index +
                                        1 +
                                        (currentPage - 1) * postsPerPage}
                                    </td>
                                    <td>{formatPhoneNumber(data.mobileNo)}</td>
                                    <td>
                                      <Button
                                        variant="success"
                                        onClick={() => handleUpdate(data)}
                                      >
                                        Update
                                      </Button>
                                      <Button
                                        className="mx-2"
                                        variant="danger"
                                        onClick={() => handleDelet(data._id)}
                                      >
                                        Delete
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                            <div className="table-pagination">
                              <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handleChange}
                                shape="rounded"
                                variant="outlined"
                                // showFirstButton
                              />
                            </div>
                          </>
                        )}
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
      <ToastContainer />
    </>
  );
};

export default AddMobile;
