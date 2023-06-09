import React, { useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Tutors/Tutorlist.css";
import { tutorPayments } from "../../Redux/Loginpages/tutorPaymentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";

const TutorPayments = () => {
  const payments = useSelector((state) => state.tutorPayments.data.data);
  const isLoading = useSelector((state) => state.tutorPayments.isLoading);
  const dispatch = useDispatch();
  console.log(payments);
  useEffect(() => {
    dispatch(tutorPayments());
  }, [dispatch]);

  return (
    <div>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="Title">
                <h4 className="text">Tutors Payments</h4>
              </div>
              <div className="row mt-4">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <div className="table-responsive">
                        {isLoading ? (
                          <p
                            style={{
                              marginLeft: "auto",
                              marginRight: "auto",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100vh",
                            }}>
                            <ColorRing
                              visible={true}
                              height="80"
                              width="80"
                              ariaLabel="blocks-loading"
                              wrapperStyle={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                              }}
                              colors={["black"]}
                            />
                          </p>
                        ) : (
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Name</th>
                                <th scope="col">Bank Country</th>
                                <th scope="col">Bank Name</th>
                                <th scope="col">Ac.Number</th>
                                <th scope="col">IFSC Code</th>
                                <th scope="col">Account Type</th>
                                <th scope="col">PAN Card No.</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Available Amount</th>
                                <th scope="col">Pending Amount </th>
                                <th scope="col"> Earning Amount </th>
                                <th scope="col"> Paid Amount </th>
                                <th scope="col"> Amount </th>
                              </tr>
                            </thead>
                            {payments && payments.map((data) => (
                              <tbody key={data._id}>
                                <tr key={data._id}>
                                  <td>{data.email}</td>
                                  <td>{data.name}</td>
                                  <td>{data.bankcountry}</td>
                                  <td>{data.bankName}</td>
                                  <td>{data.accountNumber}</td>
                                  <td>{data.IFSCCode}</td>
                                  <td>{data.accountType}</td>
                                  <td>{data.panCard}</td>
                                  <td>{data.totalAmount}</td>
                                  <td>{data.availableAmount}</td>
                                  <td>{data.pendingAmount}</td>
                                  <td>{data.earningAmount}</td>
                                  <td>{data.paidAmount}</td>
                                  <td>{data.amount}</td>
                                </tr>
                              </tbody>
                            ))}
                          </table>
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
    </div>
  );
};

export default TutorPayments;

