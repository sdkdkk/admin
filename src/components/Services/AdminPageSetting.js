import React, { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import "../Css/Tutorlist.css";
import "react-quill/dist/quill.snow.css";
import { Table, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const url = process.env.REACT_APP_API_BASE_URL;

const AdminPageSetting = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading]= useState(false)
   
  const [fields, setFields] = useState([{ value : ""} ]);
  console.log(fields);

  const handleAddField = () => {
    setFields([...fields,  {value: "" }]);
  };

  const handleRemoveField = (index) => {
    const valuesCopy = [...fields];
    valuesCopy.splice(index, 1);
    setFields(valuesCopy);
  };
   let token =localStorage.getItem("token")
const {register, handleSubmit, reset}=useForm({})

    const onSubmit =async (data) => {
        console.log(data)
        
         const formattedAnswerData = fields.map((item) =>
           item.value
         );
        const subpages = JSON.stringify(formattedAnswerData);
        console.log(subpages)
        const adminPageData = {
            token: token,
            pagename: data.pagename,
            subpages: data.subpages,
              id: data._id,
          }
          try {
              const { data } = await axios.post(`${url}/admin/adminpages`, adminPageData);
              console.log(data);
     if (data.status === 1) {
        toast.success(data.message);
        reset();
       } else {
        toast.error(data.error);
      }
    } catch (error) {
   console.log(error)
      toast.error(error.response.data.error);
    }
    }
      const handleUpdateClick = (data) => {
    // setIsEditMode(true);
          reset(data);
          console.log(data);
  };

 const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${url}/admin/getadminpages`, {
        token: token,
      });
        console.log(response.data.document)
      setData(response.data.document);
      setLoading(false);
    } catch (error) {
    console.log(error)
      setLoading(false);
    }
    };
    
    useEffect(() => {
        fetchData()
    }, [])

  function handleDeleteClick(_id) {
    axios
      .post(`${url}/admin/deleteadminpages/${_id}`, { token: token, })
      .then((response) => {
        fetchData();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }

    return (
        <div>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="oneline">
                                <h3 className="main-Input">Admin Pages</h3>
                            </div>
                            <div className="row">
                                <div className="col-md-12 grid-margin stretch-card questionansInput">
                                    <div className="card">
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="exampleInputEmail1"
                                                        className="form-label" >
                                                      Add Page
                                                    </label>
                                                    <div><input
                                                        type="text"
                                                        className="mt-2"
                                                    {...register("pagename",{required:true})}                                  
                                  /></div>

                                                </div>

                                                <div className="row mt-4">
                                                   
                                                    <div className="multi-field-wrapper">
                                                        <h5> Add SubPage</h5>
                                                        <div className="multi-fields">
                                                         
                           
                              {fields.map((field, index) => (
                                <div key={index}>
                                  <input
                                    type="text"
                                    className="mt-2"
                                    value={field.value}
                                    onChange={(e) => {
                                      const valuesCopy = [...fields];
                                      valuesCopy[index].value = e.target.value;
                                      setFields(valuesCopy);
                                    }}
                                  />
                                  {index !== 0 && (
                                    <button
                                      type="button"
                                      className="btn btn-danger mx-2"
                                      onClick={() => handleRemoveField(index)}>
                                      Remove Field
                                    </button>
                                  )}
                                </div>
                              ))}
                           
                            <button
                              type="button"
                              className="btn btn-primary  add-field mt-2"
                              onClick={handleAddField}>
                              Add field
                            </button>
                                                        </div>
                                                        </div>
                                                

                                                    <div className="mt-4">
                                                        <Button
                                                            type="submit"
                                                            className="btn btn-success">
                                                            Submit
                                                        </Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12 grid-margin stretch-card">
                                        <div className="card new-table">
                                            <div className="card-body">
                                                <div className="table-container">
                                                    <Table
                                                        striped
                                                        bordered
                                                        hover
                                                        responsive
                                                        className="single-color">
                                                        <thead>
                                                            <tr>
                                                                <th>Sr. No</th>
                                                                <th>Page</th>
                                                                <th>SubPage</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.map((value, index) => {
                                                                return (
                                                               <tr>
                                                                <td>{ index+1}</td>
                                                                <td>{value.name}</td>
                                                                        <td>{value.subpages.map((page, index) => {
                                                                           return <p key={index} >
                                                                              <span >{index + 1}: {page}<br />
                                                                               </span> 
                                                                                </p>
                                                                        })}</td>
                                                                <td>
                                                                    <Button
                                                                                variant="success"
                                                                                 onClick={() => handleUpdateClick(value)}
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                    <Button
                                                                        className="mx-2"
                                                                        variant="danger"
                                                                     onClick={() =>handleDeleteClick(value._id)
                                        }
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                                    )
                                                            })}
                                                         
                                                        </tbody>
                                                    </Table>
                                                    <div className="table-pagination">
                                                        {/* <Pagination
                                                                count={totalPages}
                                                                page={currentPage}
                                                                onChange={handleChange}
                                                                shape="rounded"
                                                                variant="outlined"
                                                            /> */}
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
            </div >
        </div>
    );
};

export default AdminPageSetting;
