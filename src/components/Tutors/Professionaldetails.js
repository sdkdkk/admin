import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Label } from "reactstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const Professionaldetails = () => {
  const { _id } = useParams();

  //  for profile-image
  const [myimage, setMyImage] = useState(null);
  const uploadImage = (e) => {
    setMyImage(URL.createObjectURL(e.target.files[0]));
  };
  const [user, setUser] = useState();
  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://vaidik-backend.onrender.com/admin/tutorsinfo/${_id}`,
          {
            token: token,
          }
        );
        setUser(response.data.document);
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      }
    };
    fetchData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const onSubmit = (data) => {
    const updatedUser = {
      token:token,
      profilephoto:myimage,

      name: data.name,
      mobileNo: data.mobileNo,
      country: data.country,
      gender:data.gender,
      dob: data.dob,
      experience: data.experience,
      clg_name: data.clg_name,
      clg_city: data.clg_city,
      degree: data.degree,
      degree_choice: data.degree_choice,
      degree_specialisation: data.degree_specialisation,
      gpa: data.gpa,
      Tutorbankname: data.Tutorbankname,
      IFSCCode: data.IFSCCode,
      panCard: data.panCard,
      bankcountry:data.bankcountry,
      accountNumber: data.accountNumber,
      accountType: data.accountType,
      bankName: data.bankName,
    };
    console.log(updatedUser)
   
      fetch(`http://vaidik-backend.onrender.com/admin/tutorsdetails/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
    console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Personal Details:</h3>
              </div>
              {user &&
                user.map((data) => {
                  return (
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                          <div className="card">
                            <div className="card-body">
                              <div className="profile-details">
                                <img
                                type="file"
                                name="image"
                                  src={myimage === null ? data.personaldetails.profilephoto : myimage }
                                  // src={data.personaldetails.profilephoto}
                                  defaultValue={
                                    data.professionaldetails.profilephoto
                                  }
                                  className="profile-img"
                                  alt=""
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
                                      onChange={uploadImage}
                                    />
                                  </Button>
                                  <Button variant="contained" size="small">
                                    Reset
                                  </Button>
                                  <div>
                                    <small className="text-muted d-flex flex-column my-3 mx-3">
                                      Allowed JPG,GIf or PNG. Max size of 800K
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
                                      defaultValue={data.personaldetails.name}
                                      {...register("name", { required: true })}
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
                                      // {...register("email", { required: true })}
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
                                      defaultValue={data.personaldetails.dob}
                                      {...register("dob", { required: true })}
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
                          <h3 className="page-title">Professional Details:</h3>
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
                                        data.professionaldetails.degree_choice
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
                                      {...register("degree_specialisation", {
                                        required: true,
                                      })}
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
                                      {...register("gpa", { required: true })}
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
                                      defaultValue={data.bankdetails.IFSCCode}
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
                                      defaultValue={data.bankdetails.panCard}
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
                                      defaultValue={data.bankdetails.bankcountry}
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
                                      defaultValue={data.bankdetails.bankName}
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

                      <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Save"}
                      </button>
                    </Form>
                  );
                })}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Professionaldetails;
