// SummaryDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function SummaryDetail() {
    const [summaryDetails, setSummaryDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchSummaryDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-summarydetail`);
            setSummaryDetails(response.data);
        } catch (error) {
            setError("Error fetching summary details.");
            console.error("Error fetching summary details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummaryDetails();
    }, []);

    return (
        <div className="container mt-5">
            <h1>ข้อมูลสรุป</h1>
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">กำลังโหลด...</span>
                    </div>
                </div>
            ) : error ? (
                <p className="text-danger text-center">{error}</p>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ชื่อสรุป</th>
                                <th>รายละเอียด</th>
                                <th>คะแนนขั้นต่ำ</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryDetails.map(detail => (
                                <tr key={detail.SummaryDetail_ID}>
                                    <td>{detail.SummaryDetail_ID}</td>
                                    <td>{detail.SummaryDetail_Name}</td>
                                    <td>{detail.SummaryDetail_Detail}</td>
                                    <td>{detail.SummaryDetail_MinPercent}</td>
                                    <td className="d-flex justify-content-end">
                                        <button 
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => {
                                                console.log("Navigate to edit page:", `/edit-summary-detail/${detail.SummaryDetail_ID}`);
                                                navigate(`/edit-summary-detail/${detail.SummaryDetail_ID}`);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="btn btn-danger  btn-sm"
                                            onClick={() => {
                                                console.log("Navigate to detail page:", `/data-summary-detail/${detail.SummaryDetail_ID}`);
                                                navigate(`/data-summary-detail/${detail.SummaryDetail_ID}`); 
                                            }}
                                        >
                                            Show
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default SummaryDetail;
