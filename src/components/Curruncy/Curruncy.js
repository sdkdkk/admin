import React from 'react'
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Form, Button } from 'react-bootstrap';
import "./Curruncy.css";

const Curruncy = () => {

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">Curruncy Conversion Rate</h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card new-table">
                    <div className="card-body">
                      <div className="row mt-4">
                        <div className="col-lg-2 col-md-4 col-sm-12 mt-2">
                          <h6>1 USD =</h6>
                        </div>
                        <div className="col-lg-4 col-md-8 col-sm-12">
                          <div className="input-group mb-3">
                            <input type="number" className="form-control me-2" id="hoursInput" />
                            <span className="input-group-text">INR</span>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-lg-2 col-md-4 col-sm-12">
                          <h6>&nbsp;</h6>
                        </div>
                        <div className="col-lg-4 col-md-8 col-sm-12 mb-2 text-md-end">
                          <Button variant="primary" type="submit">Update</Button>
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
  )

}
export default Curruncy;