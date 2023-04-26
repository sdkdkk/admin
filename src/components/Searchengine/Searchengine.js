import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import { Pagination } from "@mui/material";
import { Studentdata } from "../Data/Data1";
import { Badge, Button } from "react-bootstrap";
import { BiDotsVerticalRounded } from "react-icons/bi";


const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <p className="Answer">
            {isReadMore ? text.slice(0, 150) : text}
            <span
                onClick={toggleReadMore}
                className="read-or-hide"
                style={{ color: "blue" }}>
                {isReadMore ? "...read more" : " show less"}
            </span>
        </p>
    );
};

const Searchengine = () => {


    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    const indexOfLastPage = currentPage * postsPerPage;
    const indexOfFirstPage = indexOfLastPage - postsPerPage;
    const displayUsers = Studentdata.slice(indexOfFirstPage, indexOfLastPage);
    const handleChange = (event, value) => {
        setCurrentPage(value);
    };



    return (
        <div>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="oneline">
                                <h3 className="main-text">Search Engine</h3>
                            </div>
                            <div className="page-header mt-4">
                                <div className="mb-2 mt-2">
                                    <Link to="/addnew">
                                        <Button variant="primary" size="lg">
                                            Add New
                                        </Button>
                                    </Link>
                                    <Link to="/searchquestion">
                                        <Button className="search-btn mx-2" variant="secondary" size="lg">
                                            Search Question
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <table className="table">
                                                <thead className="text-uppercase">
                                                    <tr>
                                                        <th scope="col">questions</th>
                                                        <th scope="col">action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-capitalize text-sm-start">
                                                    {displayUsers.map((data, id) => {
                                                        return (
                                                            <tr className="" key={id}>
                                                                <td className="d-flex flex-column">
                                                                    <small className="text-muted">
                                                                        <Badge
                                                                            pill
                                                                            color="primary"
                                                                            className="bg-opacity-25 text-primary"
                                                                        >
                                                                            Maths
                                                                        </Badge>
                                                                        {data.time}
                                                                    </small>
                                                                    <small>
                                                                        <p className="question">{data.Question}</p>
                                                                    </small>

                                                                    <small>
                                                                        <ReadMore>{data.Answer}</ReadMore>
                                                                    </small>
                                                                </td>

                                                                <td className="text-center">
                                                                    <BiDotsVerticalRounded />
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                count={3}
                                                page={currentPage}
                                                onChange={handleChange}
                                                shape="rounded"
                                                variant="outlined"
                                            //showFirstButton
                                            //showLastButton
                                            />
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

export default Searchengine;
