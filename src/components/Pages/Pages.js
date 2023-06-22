import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  postPageDataApi,
  reset as resetPostPageDataApi,
} from "../../Redux/Loginpages/postPageDataSlice";
import {
  pagesListDelete,
  reset as resetPagesListDelete,
} from "../../Redux/Loginpages/pagesListDeleteSlice";
import { updatePageDataApi } from "../../Redux/Loginpages/updatePageDataSlice";
import { getPageListApi } from "../../Redux/Loginpages/getPageListSlice";
import { RotatingLines } from "react-loader-spinner";

const Pages = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const [isOpen, setIsOpen] = useState("");
  const [defaultValue, setDefaultValue] = useState({});

  const postPageDataState = useSelector((state) => state.postPageData);
  const pagesListDeleteState = useSelector((state) => state.pagesListDelete);
  const getPageListState = useSelector((state) => state.getPageList);
  const updatePageDataState = useSelector((state) => state.updatePageData);

  const { document = [] } = getPageListState?.data || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  const {
    register,
    reset,
    handleSubmit,
    formats,
    control,
    modules,
    editorRef,
    formState: { errors },
  } = useForm({ values: defaultValue });

  useEffect(() => {
    if (postPageDataState?.isSuccess) {
      dispatch(getPageListApi());
      dispatch(resetPostPageDataApi());
      setDefaultValue({});
      reset();
    }
  }, [postPageDataState?.isSuccess]);

  const handleDropdownClick = (id) => {
    setIsOpen(isOpen === id ? "" : id);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getPageListApi());
  }, []);

  const changePageStatus = (id, status) => {
    dispatch(updatePageDataApi({ id, status }));
  };

  const handleDeleteClick = (id) => {
    dispatch(pagesListDelete(id));
  };

  const handleEditClick = (data) => {
    setDefaultValue(data);
    setIsOpen("");
  };

  useEffect(() => {
    if (pagesListDeleteState?.isSuccess) {
      dispatch(resetPagesListDelete());
      dispatch(getPageListApi());
    }
  }, [pagesListDeleteState?.isSuccess]);

  useEffect(() => {
    if (
      getPageListState.isLoading ||
      updatePageDataState.isLoading ||
      postPageDataState?.isLoading
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [
    getPageListState.isLoading,
    updatePageDataState.isLoading,
    postPageDataState?.isLoading,
  ]);

  const onSubmit = (data) => {
    if (defaultValue?._id) {
      data.id = defaultValue?._id;
      delete data._id;
      delete data.isactive;
      delete data.updatedAt;
      delete data.createdAt;
      delete data.__v;
      // formData.append("id", defaultValues?.id);
    }

    dispatch(postPageDataApi({ ...data, status: true }));
    setTimeout(() => {
      setDefaultValue({});
      reset();
    }, 1000);
    reset();
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
                <h3 className="page-title">All Pages</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    
                      <div className="card-body">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Sr. No</th>
                              <th scope="col">Sort Order</th>
                              <th scope="col">Page Name</th>
                              <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                           {isLoading ? ( // Condition for displaying loader
                          <tbody>
                            <tr>
                              <td colSpan="4" className="text-center">
                                <div className="loader-container"> {/* Wrap loader code inside this div */}
                                  <div className="loader">
                                    <RotatingLines
                                      strokeColor="#d63384"
                                      strokeWidth="5"
                                      animationDuration="0.75"
                                      width="50"
                                      visible={true}
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ) : <tbody >
                          {[...document]
                            .slice((currentPage - 1) * 5, currentPage * 5)
                            .map((data, index) => (
                             
                                <tr key={index}>
                                  <td>{(currentPage - 1) * 5 + index + 1}</td>
                                  <td>{data.sortOrder}</td>
                                  <td>{data.pageName}</td>
                                  <td>
                                    <div className="form-check form-switch">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="flexSwitchCheckChecked"
                                        onChange={(e) => {
                                          changePageStatus(
                                            data._id,
                                            e.target.checked
                                          );
                                        }}
                                        defaultChecked={data?.isactive}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dropdown">
                                      <button
                                        className="dropdown__button"
                                        onClick={() =>
                                          handleDropdownClick(data._id)
                                        }>
                                        ...
                                      </button>
                                      {data._id === isOpen && (
                                        <div className="dropdown__popup">
                                          <ul className="dropdown__list">
                                            <li
                                              onClick={() =>
                                                handleEditClick(data)
                                              }>
                                              Edit
                                            </li>
                                            <li
                                              onClick={() =>
                                                handleDeleteClick(data._id)
                                              }>
                                              Delete
                                            </li>
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                            
                            ))}
                            </tbody>}
                        </table>
                        {document.length > 0 && (
                          <div className="table-pagination">
                            <Pagination
                              count={Math.ceil(document.length / 5)}
                              page={currentPage}
                              onChange={handleChange}
                              shape="rounded"
                              variant="outlined"
                            />
                          </div>
                        )}
                      </div>
                    
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-md-12">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label>SortOrder</Form.Label>
                              <Form.Control
                                type="text"
                                name="sortOrder"
                                {...register("sortOrder", {
                                  required: "Please Enter A Valid sort!",
                                })}
                                placeholder="Enter SortOrder"
                              />
                              <p className="error-msg text-danger">
                                {errors.sortOrder && errors.sortOrder.message}
                              </p>
                            </Form.Group>
                          </div>
                          <div className="col-md-12">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label>Page Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="pageName"
                                {...register("pageName", {
                                  required: "Please Enter A Valid name!",
                                })}
                                placeholder="Enter Page Name"
                              />
                              <p className="error-msg text-danger">
                                {errors.pageName && errors.pageName.message}
                              </p>
                            </Form.Group>
                          </div>
                          <Col md={12}>
                            <div>
                              <p className="mx-1">Context Text</p>
                              <Controller
                                name="contentText"
                                control={control}
                                render={({ field }) => (
                                  <ReactQuill
                                    theme="snow"
                                    name="contentText"
                                    {...register("contentText", {
                                      required: true,
                                    })}
                                    modules={modules}
                                    formats={formats}
                                    bounds={"#root"}
                                    placeholder="type Here...."
                                    ref={editorRef}
                                    {...field}
                                  />
                                )}
                              />
                              {errors.contentText && (
                                <p className="error text-danger">
                                  Please Enter a contentText
                                </p>
                              )}
                            </div>
                          </Col>
                          <div className="col-md-6 mt-4">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label>Meta Title</Form.Label>
                              <Form.Control
                                type="text"
                                name="metaTitle"
                                {...register("metaTitle", {
                                  required: "Please Enter A Valid metaTitle!",
                                })}
                              />
                              <p className="error-msg text-danger">
                                {errors.metaTitle && errors.metaTitle.message}
                              </p>
                            </Form.Group>
                          </div>
                          <div className="col-md-6 mt-4">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail">
                              <Form.Label>Meta Keyword</Form.Label>
                              <Form.Control
                                type="text"
                                name="metaKeyword"
                                {...register("metaKeyword", {
                                  required: "Please Enter A Valid metaKeyword!",
                                })}
                                placeholder="Enter Meta Keyword"
                              />
                              <p className="error-msg text-danger">
                                {errors.metaKeyword &&
                                  errors.metaKeyword.message}
                              </p>
                            </Form.Group>
                          </div>
                          <div className="col-md-12">
                            <Form.Label> Meta Description</Form.Label>
                            <FloatingLabel controlId="floatingTextarea2">
                              <Form.Control
                                as="textarea"
                                type="text"
                                name="metaDescription"
                                {...register("metaDescription", {
                                  required:
                                    "Please Enter A Valid metadescription!",
                                })}
                                placeholder="Leave a comment here"
                                style={{ height: "130px" }}
                              />
                              <p className="error-msg text-danger">
                                {errors.metaDescription &&
                                  errors.metaDescription.message}
                              </p>
                            </FloatingLabel>
                          </div>
                          <div>
                            {postPageDataState.errorMessage && (
                              <span style={{ color: "red" }}>
                                {postPageDataState.errorMessage}
                              </span>
                            )}
                          </div>
                          <div className="pages-btn mt-4">
                            <Button
                              className="btn btn-primary mx-2"
                              onClick={() => (window.location.href = "/pages")}>
                              Back
                            </Button>
                            <button
                              type="submit"
                              className="btn btn-primary mx-2"
                              disabled={postPageDataState?.isLoading}>
                              {Object.keys(defaultValue).length === 0 ? (
                                <>
                                  {postPageDataState?.isLoading
                                    ? "Posting..."
                                    : "Submit"}
                                </>
                              ) : (
                                <>
                                  {postPageDataState?.isLoading
                                    ? "Updating..."
                                    : "Update"}
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;
