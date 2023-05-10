import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
// import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { admintutorexamverify } from "../../Redux/Loginpages/admintutorexamverifySlice";
import Moment from "react-moment";
import { ColorRing } from "react-loader-spinner";

const Testexam = () => {
  const testexam = useSelector((state) => state.admintutorexamverify.data.data);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  console.log(testexam);
  // const data = [
  //     { name: "John Doe", age: 30, gender: "Male" },
  //     { name: "Jane Smith", age: 25, gender: "Female" },
  //     { name: "Bob Johnson", age: 40, gender: "Male" },
  //     { name: "Mary Williams", age: 35, gender: "Female" },
  //     { name: "Tom Brown", age: 28, gender: "Male" },
  //     { name: "Alice Davis", age: 32, gender: "Female" },
  // ];

  // const PER_PAGE = 3;
  // const [currentPage, setCurrentPage] = useState(0);
  // const handlePageChange = ({ selected }) => {
  //     setCurrentPage(selected);
  // };
  // const offset = currentPage * PER_PAGE;
  // const pageCount = Math.ceil(data.length / PER_PAGE);
  // const currentPageData = data.slice(offset, offset + PER_PAGE);

  useEffect(() => {
    setIsLoading(true);
    dispatch(admintutorexamverify());
    setIsLoading(false);
  }, [dispatch]);

  const toComponentB = (data) => {
    navigate("/examdetails", { state: { data } });
  };

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />

          {isLoading ? (
            <div style={{ marginLeft: "450px", marginTop: "50px" }}>
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["black"]}
              />
            </div>
          ) : (
            <div className="main-panel">
              <div className="content-wrapper">
                <div className="Title">
                  <h3 className="text">Tutor Exam Checking</h3>
                </div>
                <div className="row">
                  <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <Table id="myTable">
                          <Thead>
                            <Tr>
                              <Th>Date</Th>
                              <Th>Tutor Name</Th>
                              <Th>Email</Th>
                              <Th>Subject</Th>
                              <Th>Status</Th>
                            </Tr>
                          </Thead>
                          {testexam &&
                            testexam.map((data) => (
                              <Tbody>
                                <Tr>
                                  <Td>
                                    <Moment format="D MMM YYYY" withTitle>
                                      {data.examDate}
                                    </Moment>
                                  </Td>
                                  <Td>{data.name}</Td>
                                  <Td>{data.email}</Td>
                                  <Td>{data.examSubject}</Td>
                                  <Td>
                                    <button
                                      onClick={() => {
                                        toComponentB(data);
                                      }}>
                                      Check
                                    </button>
                                  </Td>
                                </Tr>
                              </Tbody>
                            ))}
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Testexam;
