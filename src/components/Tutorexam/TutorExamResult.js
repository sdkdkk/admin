import { Pagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { useLocation, useParams } from 'react-router-dom'

const url = process.env.REACT_APP_API_BASE_URL;

const TutorExamResult = () => {
  const [data, setData] =useState([])
  const location= useLocation()
  const [subjectList, setSubjectList] = useState([]);   
  let token = localStorage.getItem("token");

 const {register, errors, handleSubmit} = useForm({})

const getIdFromPathname = (pathname) => {
  
  const pathParts = pathname.split("/");
  
  const id = pathParts[2];

  return id;
};

// Usage example
const id = getIdFromPathname(location.pathname);

    const fetchData = async () => {
      const token = localStorage.getItem('token')
        try {
         
          const response = await axios.post(`${url}/admin/tutorexamresult/${id}`, {
            token: token,
          });          
          setData(response.data.document);         
        } catch (error) {
        console.log(error);          
        }
      };

      useEffect(()=>{
          fetchData()
      },[])

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPage = Math.min(
    currentPage * postsPerPage,
    data?.length
  );
  const indexOfFirstPage = (currentPage - 1) * postsPerPage;
  const displayUsers = data?.slice(indexOfFirstPage, indexOfLastPage);
  const pageCount = Math.ceil((data?.length || 0) / postsPerPage);

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

   const fetchSubject = async () => {
    try {    
      const response = await axios.post(`${url}/getquestionsubject`, {
        token: token,
      });
      setSubjectList(response?.data?.data);    
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
fetchSubject()

  },[])

  const onSubmit= (data)=>{
    console.log(data);
  }
  return (
    <>
       <div className="row">
                <div className="col-md-12 grid-margin">
                  <div className="card new-table">
                    <div className="card-body">
                      <div className='text-end my-2'>
                        <Button className="bg-white bg-opacity-25 text-primary border border-primary btn-sm "
                                data-bs-toggle="modal" data-bs-target="#thankyoupopup">
                                       Add Subject
                                      </Button></div>
                      <table className="table v-top">
                        <thead>
                          <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Exam Subject</th>
                            <th scope="col">Final Score</th>
                            <th scope="col">Attempt</th>
                            <th scope="col">Result</th>                           
                          </tr>
                        </thead>
                      
                         
                          <tbody>
                            {displayUsers?.length === 0 ? (
                              <tr>
                                <td
                                  colSpan="4"
                                  className="fw-2 fw-bolder text-center">
                                  
                                  No Data Found
                                </td>
                              </tr>
                            ) : (
                              displayUsers?.map((value, index) => {                               
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <b>{value.examSubject}</b>                                     
                                    </td>
                                    <td>{value.finalScore}</td>
                                    <td>{value.isAttempt}</td>
                                    <td>{value.veridict === 2 ?<span className='text-warning'>Pending</span>
                                     : value.veridict ===1 ? <span className='text-success'> Pass</span> : 
                                     value.veridict === 0 ? <span className='text-danger'>Fail</span> : ""}</td>
                                                                     </tr>
                                );
                              })
                            )}        
                          </tbody>                     
                      </table>
                      <div className="table-pagination float-end">
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
              {/* modal */}
                <div
        className="modal fade"
        id="thankyoupopup"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="re-answerpopup"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
               <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-center">
               
                <h1 className="mt-0 mb-3 text-success">
                  {/* <BsFillPatchCheckFill /> */}
                </h1>

                <h4 className="mt--20 mb--20">Add Subect</h4>
                <p className="mb--20">
                  You are select subject for tutor               
                </p>
            
                <select id="questionSubject" className="w-100 form-control mb--20" name="questionSubject"
                 {...register("questionSubject", {required: true})} >
                              <option value="">Select your Subject</option>
                              {subjectList.map((a) => (
                               <option>{a?.questionSubject}</option>
                              ))}
                            </select>
                             {errors?.questionSubject && (
                              <p className=" text-danger">
                                Please select questionType
                              </p>
                            )}
                <p className="mb--20"> Are you sure you want to proceed?</p>
                <div className="d-flex justify-content-center">
                  <Button
                  type='submit'              
                    className="rbt-btn bg-success btn-sm mr--10 mr_sm--0 mb_sm--10">
                 Submit
                  </Button>
                  <button
                    to="#"
                    className="rbt-btn bg-danger hover-icon-reverse btn-sm"
                    data-bs-dismiss="modal"
                    aria-label="Close">
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Cancel</span>
                    </span>
                  </button>
                  
                </div>
             
              </div>
              </form>

             
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default TutorExamResult
