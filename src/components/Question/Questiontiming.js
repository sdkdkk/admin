import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Form, Button, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { questiontypeApi } from "../../Redux/Loginpages/questiontypeTimeSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Pagination } from "@mui/material";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import { useLocation } from "react-router";

const url = process.env.REACT_APP_API_BASE_URL;

const Questiontiming = () => {
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const notify = (data) => toast(data);
  const dispatch = useDispatch();
  const questiontypeTime = useSelector((state) => state.questiontypetime);
  const [data, setData] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("token");
    dispatch(questiontypeApi(token));
    fetchData();
  }, []);

  const { register, handleSubmit, reset, setValue } = useForm({});

  const onSubmit = async (data) => {
    let token = localStorage.getItem("token");
    const hours = data.firsthours ? parseInt(data.firsthours) : 0;
    const minutes = data.firstminutes ? parseInt(data.firstminutes) : 0;
    const first_time = hours * 60 + minutes;

    const secondhours = data.secondhours ? parseInt(data.secondhours) : 0;
    const secondminutes = data.secondminutes ? parseInt(data.secondminutes) : 0;
    const second_time = secondhours * 60 + secondminutes;

    const skiphours = data.skiphours ? parseInt(data.skiphours) : 0;
    const skipminutes = data.skipminutes ? parseInt(data.skipminutes) : 0;
    const skip_time = skiphours * 60 + skipminutes;

    const totalhours = data.totalhours ? parseInt(data.totalhours) : 0;
    const totalminutes = data.totalminutes ? parseInt(data.totalminutes) : 0;
    const total_time = totalhours * 60 + totalminutes;

    const tutorhours = data.totalhours ? parseInt(data.tutorhours) : 0;
    const tutorminutes = data.totalminutes ? parseInt(data.tutorminutes) : 0;
    const tutor_time = tutorhours * 60 + tutorminutes;

    const adminhours = data.adminhours ? parseInt(data.adminhours) : 0;
    const adminminutes = data.adminminutes ? parseInt(data.adminminutes) : 0;
    const admin_time = adminhours * 60 + adminminutes;

    const unsolvedhours = data.unsolvedhours ? parseInt(data.unsolvedhours) : 0;
    const unsolvedminutes = data.unsolvedminutes
      ? parseInt(data.unsolvedminutes)
      : 0;
    const unsolved_time = unsolvedhours * 60 + unsolvedminutes;

    let timingObjData = {
      token: token,
      Type: data.Type,
      first_time: first_time,
      second_time: second_time,
      skip_time: skip_time,
      total_time: total_time,
      tutor_time: tutor_time,
      admin_time: admin_time,
      unsolved_time: unsolved_time,
      id: data.id,
    };

    try {
      const { data } = await axios.post(
        `${url}/admin/setquestiontiming`,
        timingObjData
      );
      if (data.status === 1) {
        notify(data.message);
        reset();
        fetchData();
      } else {
        notify(data.error);
      }
    } catch (error) {
      logoutIfInvalidToken(error.response);
      notify(error.response.data.error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = Math.min(currentPage * postsPerPage, data.length);
  const indexOfFirstPage = (currentPage - 1) * postsPerPage;
  const displayUsers = data.slice(indexOfFirstPage, indexOfLastPage);
  const pageCount = Math.ceil(data.length / postsPerPage);
  let token = localStorage.getItem("token");
  const location = useLocation();
  const [typeValue, setTypeValue] = useState("");
  const handleChange = (event, value) => {
    setCurrentPage(value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${searchParams.toString()}`
    );
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    const initialPage = pageParam ? parseInt(pageParam) : 1;
    setCurrentPage(initialPage);
  }, [location.search]);

  const fetchData = async () => {
    let token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.post(`${url}/admin/getquestiontiming`, {
        token: token,
      });
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      logoutIfInvalidToken(error.response);
    }
  };
  const handleUpdateClick = (data) => {
    setIsEditMode(true);
    reset({
      ...data,
      id: data._id,
      type: data.Type,
      firstminutes: data.first_time % 60,
      firsthours: Math.floor(data.first_time / 60),
      secondminutes: data.second_time % 60,
      secondhours: Math.floor(data.second_time / 60),
      skiphours: Math.floor(data.skip_time / 60),
      skipminutes: Math.floor(data.skip_time % 60),
      totalhours: Math.floor(data.total_time / 60),
      totalminutes: Math.floor(data.total_time % 60),
      tutorhours: Math.floor(data.tutor_time / 60),
      tutorminutes: Math.floor(data.tutor_time % 60),
      adminhours: Math.floor(data.admin_time / 60),
      adminminutes: Math.floor(data.admin_time % 60),
      unsolvedhours: Math.floor(data.unsolved_time / 60),
      unsolvedminutes: Math.floor(data.unsolved_time % 60),
    });
    setTypeValue(data.Type);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setValue("Type", typeValue);
  }, [typeValue]);

  function handleDeleteClick(_id) {
    axios
      .post(`${url}/admin/questiontiming/${_id}`, { token: token })
      .then((response) => {
        fetchData();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Question Timing</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-lg-2 mt-2">
                            <h6>Question Type</h6>
                          </div>
                          <div className="col-lg-6">
                            <Form.Select
                              aria-label="Default select example"
                              {...register("Type", { required: true })}>
                              <option value={typeValue}>
                                {!isEditMode
                                  ? "Please Select Question Type"
                                  : typeValue}{" "}
                              </option>
                              {questiontypeTime.user &&
                                questiontypeTime.user.data.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                            </Form.Select>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 mt-2">
                            <h6>Question Time</h6>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label">
                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                                required
                                {...register("firsthours")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label">
                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minutesOutput"
                                required
                                {...register("firstminutes")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 mt-2">
                            <h6>Second Time</h6>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label">
                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                                required
                                {...register("secondhours")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label">
                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minutesOutput"
                                required
                                {...register("secondminutes")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 mt-2">
                            <h6>Skip Time</h6>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label">
                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                                required
                                {...register("skiphours")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label">
                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minutesOutput"
                                required
                                {...register("skipminutes")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 mt-2">
                            <h6>Total Time</h6>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label">
                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                                required
                                {...register("totalhours")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label">
                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minutesOutput"
                                required
                                {...register("totalminutes")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 mt-2">
                            <h6>Tutor Time</h6>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label">
                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                                required
                                {...register("tutorhours")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label">
                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minutesOutput"
                                required
                                {...register("tutorminutes")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 mt-2">
                            <h6>Admin Time</h6>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label">
                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                                required
                                {...register("adminhours")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label">
                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minutesOutput"
                                required
                                {...register("adminminutes")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-2 mt-2">
                            <h6>Unsolved Time</h6>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="hoursInput"
                                className="form-label">
                                Hours:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="hoursInput"
                                required
                                {...register("unsolvedhours")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="mb-3">
                              <label
                                htmlFor="minutesOutput"
                                className="form-label">
                                Minutes:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minutesOutput"
                                required
                                {...register("unsolvedminutes")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-lg-2">
                            <h6>&nbsp;</h6>
                          </div>
                          <div className="col-lg-6 mb-2 text-end">
                            <Button variant="primary" type="submit">
                              {isEditMode
                                ? loading
                                  ? "Loading..."
                                  : "Update"
                                : loading
                                ? "Loading..."
                                : "Add"}
                            </Button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <div className="table-container col-12">
                        <Table
                          striped
                          bordered
                          responsive
                          className="single-color table ">
                          <thead>
                            <tr>
                              <th>Sr.No</th>
                              <th>Question Type</th>
                              <th>Question Time</th>
                              <th>Second Time</th>
                              <th>Skip Time</th>
                              <th>Total Time</th>
                              <th>Tutor Time</th>
                              <th>Admin Time</th>
                              <th>Unsolved Time</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          {loading ? (
                            <tbody>
                              <tr>
                                <td colSpan="10" className="text-center ">
                                  <div className="loader-container">
                                    <div className="loader">
                                      <RotatingLines
                                        strokeColor="#d63384"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="50"
                                        visible={true}
                                      />
                                    </div>
                                    <div className="mobile-loader-text"></div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ) : (
                            <tbody>
                              {displayUsers.length === 0 ? (
                                <tr>
                                  <td
                                    colSpan="10"
                                    className="fw-3 fw-bolder text-center">
                                    No Timing found
                                  </td>
                                </tr>
                              ) : (
                                displayUsers.map((data, index, _id) => (
                                  <tr key={index}>
                                    <td>{index + indexOfFirstPage + 1}</td>
                                    <td>{data.Type}</td>
                                    <td>{data.first_time}</td>
                                    <td>{data.second_time}</td>
                                    <td>{data.skip_time}</td>
                                    <td>{data.total_time}</td>
                                    <td>{data.tutor_time}</td>
                                    <td>{data.admin_time}</td>
                                    <td>{data.unsolved_time}</td>
                                    <td>
                                      <Button
                                        variant="success"
                                        onClick={() => handleUpdateClick(data)}>
                                        Edit
                                      </Button>
                                      <Button
                                        className="mx-2"
                                        variant="danger"
                                        onClick={() =>
                                          handleDeleteClick(data._id)
                                        }>
                                        Delete
                                      </Button>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          )}
                        </Table>
                        <div className="table-pagination float-end mt-2">
                          <Pagination
                            count={pageCount}
                            page={currentPage}
                            onChange={handleChange}
                            shape="rounded"
                            variant="outlined"
                            siblingCount={0}
                          />
                        </div>
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
    </>
  );
};

export default Questiontiming;
