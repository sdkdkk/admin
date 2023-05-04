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
              <div class="row mt-3">
                <div class="col-12 grid-margin stretch-card">
                  <div class="card new-table">
                    <div class="card-body">
                      <div class="converter-container">
                        <div class="input-container">
                          <label className='usd' for="usd-input">1 USD = </label>
                          <input className='mx-2' type="number" id="usd-input" min="0" step="0.01" placeholder="0.00" />
                          INR
                          {/* <button id="update-btn">Update</button> */}
                          <Button className='mx-2' id="update-btn" variant="primary" type="submit">Update</Button>
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