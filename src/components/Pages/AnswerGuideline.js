import React, { useEffect, useReducer, useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const url = process.env.REACT_APP_API_BASE_URL;


const AnswerGuideline = () => {
    const { register, handleSubmit, reset } = useForm({})
    let token = localStorage.getItem("token");
    const [pdfUrl, setPdfUrl] = useState('')

    const fetchData = async () => {

        try {
            const response = await axios.get(`${url}/download/answeringguideline`);
            setPdfUrl(response.data);
        } catch (error) {
            toast.error(error.response.data.error)
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("token", token)
        formData.append("answeringguideline", data.file[0])
        try {
            const { data } = await axios.post(`${url}/admin/answeringguideline`, formData);
            if (data.status === 1) {
                toast.success(data.message);
                reset();
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }


    const handleDownloadPDF = () => {

        window.open('https://vaidik-backend.onrender.com/api/v1/download/answeringguideline', '_blank');
    };
    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">Upload PDF</h3>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="row mt-4">
                                                    <div className="col-lg-3 col-md-4 mt-2">
                                                        <h6>Upload PDF</h6>
                                                    </div>
                                                    <div className="col-lg-4 col-md-8">
                                                        <div className="mb-3">
                                                            <input className="form-control" type="file" id="file" required {...register("file")} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row mt-2">
                                                    <div className="col-lg-3 col-md-4">
                                                        <h6>&nbsp;</h6>
                                                    </div>
                                                    <div className="col-lg-4 col-md-8 mb-2 text-md-end">
                                                        <Button
                                                            variant="primary"
                                                            type="submit"
                                                        >
                                                            Upload PDF
                                                        </Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card new-table">
                                        <div className="card-body text-center">
                                            <div>
                                                <Button onClick={handleDownloadPDF}>Download PDF</Button>
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

export default AnswerGuideline;
