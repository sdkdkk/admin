import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const url = process.env.REACT_APP_API_BASE_URL;

const Professionaldetails = () => {
  const { _id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myimage, setMyImage] = useState(null);

  const uploadImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL();
        setMyImage(dataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const [user, setUser] = useState();
  const notify = (data) => toast(data);
  const { register, handleSubmit, reset } = useForm();

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${url}/admin/tutorsinfo/${_id}`, {
          token: token,
        });
        setUser(response.data.document);
        setLoading(false);
      } catch (error) {
        logoutIfInvalidToken(error.response);
        if (error.response) {
        } else if (error.request) {
        } else {
        }
      }
    };
    fetchData();
  }, []);

  const onSubmit = (data) => {
    setIsLoading(true);
    const formData = new FormData();
    const file = dataURLtoFile(myimage, "profilephoto.png");
    formData.append("token", token);
    formData.append("profilephoto", file);
    formData.append("name", data.name);
    formData.append("mobileNo", data.mobileNo);
    formData.append("country", data.country);
    formData.append("gender", data.gender);
    formData.append("dob", data.dob);
    formData.append("experience", data.experience);
    formData.append("clg_name", data.clg_name);
    formData.append("clg_city", data.clg_city);
    formData.append("degree", data.degree);
    formData.append("degree_choice", data.degree_choice);
    formData.append("degree_specialisation", data.degree_specialisation);
    formData.append("gpa", data.gpa);
    formData.append("Tutorbankname", data.Tutorbankname);
    formData.append("IFSCCode", data.IFSCCode);
    formData.append("panCard", data.panCard);
    formData.append("bankcountry", data.bankcountry);
    formData.append("accountNumber", data.accountNumber);
    formData.append("accountType", data.accountType);
    formData.append("bankName", data.bankName);

    fetch(
      `http://vaidik-backend.onrender.com/api/v1/admin/tutorsdetails/${_id}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 1) {
          notify(data.message);
          reset();
        } else {
          notify(data.message);
        }
        setIsLoading(false);
      });
  };

  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  return (
    <div>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          {loading ? (
            <p
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}>
              <RotatingLines
                strokeColor="#d63384"
                strokeWidth="5"
                animationDuration="0.75"
                width="50"
                visible={true}
              />
            </p>
          ) : (
            <>
              <div className="main-panel">
                <div className="content-wrapper">
                  <div className="page-header">
                    <h3 className="page-title">Personal Details:</h3>
                  </div>
                  {user &&
                    user.map((data, index) => {
                      return (
                        <Form key={index} onSubmit={handleSubmit(onSubmit)}>
                          <div className="row">
                            <div className="col-12 grid-margin stretch-card">
                              <div className="card">
                                <div className="card-body">
                                  <div className="profile-details">
                                    <img
                                      type="file"
                                      name="image"
                                      src={
                                        myimage === null
                                          ? data.personaldetails.profilephoto
                                          : myimage
                                      }
                                      defaultValue={
                                        data.professionaldetails.profilephoto
                                      }
                                      className="profile-img"
                                      alt="img"
                                    />
                                    <div className="">
                                      <Button
                                        variant="contained"
                                        component="label"
                                        className="mx-3 text-white"
                                        size="small">
                                        Upload
                                        <input
                                          hidden
                                          accept="image/*"
                                          type="file"
                                          onChange={(e) => uploadImage(e)}
                                        />
                                      </Button>
                                      <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => setMyImage(null)}>
                                        Reset
                                      </Button>
                                      <div>
                                        <small className="text-muted d-flex flex-column my-3 mx-3">
                                          Allowed JPG,GIf or PNG. Max size of
                                          800K
                                        </small>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-md-6">
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                          type="text"
                                          placeholder="Enter Name"
                                          name="name"
                                          defaultValue={
                                            data.personaldetails.name
                                          }
                                          {...register("name", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>Mobile No.</Form.Label>
                                        <Form.Control
                                          type="number"
                                          name="mobileNo"
                                          placeholder="Enter Number"
                                          defaultValue={
                                            data.personaldetails.mobileNo
                                          }
                                          {...register("mobileNo", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="country"
                                          placeholder="Enter country"
                                          defaultValue={
                                            data.personaldetails.country
                                          }
                                          {...register("country", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>gender</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="gender"
                                          placeholder="Enter Number"
                                          defaultValue={
                                            data.personaldetails.gender
                                          }
                                          {...register("gender", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>Email Id</Form.Label>
                                        <Form.Control
                                          type="email"
                                          name="email"
                                          placeholder="Enter Email"
                                          defaultValue={data.email}
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="dob"
                                          placeholder="Enter Name"
                                          defaultValue={
                                            data.personaldetails.dob
                                          }
                                          {...register("dob", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>Experience</Form.Label>
                                        <Form.Control
                                          type="number"
                                          name="experience"
                                          placeholder="Enter Name"
                                          defaultValue={
                                            data.personaldetails.experience
                                          }
                                          {...register("experience", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="page-header">
                              <h3 className="page-title">
                                Professional Details:
                              </h3>
                            </div>
                            <div className="col-12 grid-margin stretch-card">
                              <div className="card">
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label> College Name</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="clg_name"
                                          placeholder="Enter Name"
                                          defaultValue={
                                            data.professionaldetails.clg_name
                                          }
                                          {...register("clg_name", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>College City</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="clg_city"
                                          placeholder="Enter college city"
                                          defaultValue={
                                            data.professionaldetails.clg_city
                                          }
                                          {...register("clg_city", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>Degree</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="degree"
                                          placeholder="Enter Number"
                                          defaultValue={
                                            data.professionaldetails.degree
                                          }
                                          {...register("degree", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>Degree Choice</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="degree_choice"
                                          placeholder="Enter degree choice"
                                          defaultValue={
                                            data.professionaldetails
                                              .degree_choice
                                          }
                                          {...register("degree_choice", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>
                                          Degree Specialisation
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="degree_specialisation"
                                          placeholder="Enter Name"
                                          defaultValue={
                                            data.professionaldetails
                                              .degree_specialisation
                                          }
                                          {...register(
                                            "degree_specialisation",
                                            {
                                              required: true,
                                            }
                                          )}
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>gpa</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="gpa"
                                          placeholder="Enter Name"
                                          defaultValue={
                                            data.professionaldetails.gpa
                                          }
                                          {...register("gpa", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="page-header">
                              <h3 className="page-title">Bank Details:</h3>
                            </div>
                            <div className="col-12 grid-margin stretch-card">
                              <div className="card">
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                          type="tutorbankname"
                                          name="Tutorbankname"
                                          placeholder="Enter Name"
                                          defaultValue={
                                            data.bankdetails.Tutorbankname
                                          }
                                          {...register("Tutorbankname", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>IFSC Code</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="IFSCCode"
                                          placeholder="Enter IFSC Code"
                                          defaultValue={
                                            data.bankdetails.IFSCCode
                                          }
                                          {...register("IFSCCode", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>Pan Card</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="panCard"
                                          placeholder="Enter Pan Card Number"
                                          defaultValue={
                                            data.bankdetails.panCard
                                          }
                                          {...register("panCard", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>bankcountry</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="bankcountry"
                                          placeholder="Enter Pan Card Number"
                                          defaultValue={
                                            data.bankdetails.bankcountry
                                          }
                                          {...register("bankcountry", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>Account Number</Form.Label>
                                        <Form.Control
                                          type="number"
                                          name="accountNumber"
                                          placeholder="Enter Account Number"
                                          defaultValue={
                                            data.bankdetails.accountNumber
                                          }
                                          {...register("accountNumber", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>Account Type</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="accountType"
                                          placeholder="Enter Account Type"
                                          defaultValue={
                                            data.bankdetails.accountType
                                          }
                                          {...register("accountType", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail">
                                        <Form.Label>Bank Name</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="bankName"
                                          placeholder="Enter Bank Name"
                                          defaultValue={
                                            data.bankdetails.bankName
                                          }
                                          {...register("bankName", {
                                            required: true,
                                          })}
                                        />
                                      </Form.Group>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button variant="contained" type="submit">
                            {isLoading ? "Loading..." : "Save"}
                          </Button>
                          <div className="text-end">
                            <Link to={`/tutorlist`}>
                              <Button
                                className="btn-primary btn-sm "
                                style={{ width: "70px", height: "40px" }}
                                type="button">
                                Back
                              </Button>
                            </Link>
                          </div>
                        </Form>
                      );
                    })}
                </div>
                <Footer />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Professionaldetails;
