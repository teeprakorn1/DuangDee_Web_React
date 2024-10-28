// ShowDataSummaryDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

function ShowDataSummaryDetail() {
    const { id } = useParams();
    const [summaryDetail, setSummaryDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchSummaryDetail = async () => {
        try {
            const token = localStorage.getItem("authToken"); // ดึง Token จาก localStorage

            // ส่งคำขอ GET พร้อม Header Token
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-summarydetail/${id}`, {
                headers: {
                    'x-access-token': token // เพิ่ม Token ใน Header
                }
            });
    
            if (response.data) {
                setSummaryDetail(response.data);
            } else {
                setError("Could not find summary detail");
            }
        } catch (error) {
            setError("Error fetching summary detail.");
            console.error("Error fetching summary detail:", error);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchSummaryDetail();
    }, [id]);

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center mb-4">
                <i 
                    className="bi bi-arrow-left ms-2" 
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }} 
                    onClick={() => navigate(-1)} // นำทางไปยังหน้าที่ก่อนหน้านี้
                ></i>
                <h2 className="text-dark ms-3">ข้อมูลสรุป</h2>
            </div>
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">กำลังโหลด...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger text-center">{error}</div>
            ) : (
                summaryDetail && (
                    <div className="mt-4">
                        <div className="mb-3">
                            <label className="form-label">ชื่อข้อมูลสรุป</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={summaryDetail.SummaryDetail_Name}
                                readOnly 
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">รายละเอียด</label>
                            <textarea 
                                className="form-control" 
                                value={summaryDetail.SummaryDetail_Detail}
                                readOnly 
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                                rows="3"
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">คะแนนขั้นต่ำ</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                value={summaryDetail.SummaryDetail_MinPercent}
                                readOnly 
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                            />
                        </div>

                        <div className="d-flex justify-content-start mt-4">
                            <button 
                                className="btn btn-secondary"
                                onClick={() => navigate(`/edit-summary-detail/${id}`)}
                            >
                               ไปยังหน้าแก้ไขข้อมูล
                            </button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default ShowDataSummaryDetail;
