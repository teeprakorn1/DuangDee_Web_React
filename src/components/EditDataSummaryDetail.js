// EditDataSummaryDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

function EditDataSummaryDetail() {
    const { id } = useParams();
    const [summaryDetail, setSummaryDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchSummaryDetail = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-summarydetail/${id}`);
            setSummaryDetail(response.data);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { SummaryDetail_Name, SummaryDetail_Detail, SummaryDetail_MinPercent } = summaryDetail;
        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/update-summarydetail/${id}`, {
                SummaryDetail_Name,
                SummaryDetail_Detail,
                SummaryDetail_MinPercent,
            });
            alert(response.data.message);
            navigate('/summary-detail');
        } catch (error) {
            console.error("Error updating summary detail:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>แก้ไขข้อมูลสรุป</h1>
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">กำลังโหลด...</span>
                    </div>
                </div>
            ) : error ? (
                <p className="text-danger text-center">{error}</p>
            ) : (
                summaryDetail && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">ชื่อสรุป:</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={summaryDetail.SummaryDetail_Name}
                                onChange={(e) => setSummaryDetail({ ...summaryDetail, SummaryDetail_Name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">รายละเอียด:</label>
                            <textarea 
                                className="form-control"
                                value={summaryDetail.SummaryDetail_Detail}
                                onChange={(e) => setSummaryDetail({ ...summaryDetail, SummaryDetail_Detail: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">คะแนนขั้นต่ำ:</label>
                            <input 
                                type="number" 
                                className="form-control"
                                value={summaryDetail.SummaryDetail_MinPercent}
                                onChange={(e) => setSummaryDetail({ ...summaryDetail, SummaryDetail_MinPercent: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">บันทึก</button>
                        <button 
                            type="button" 
                            className="btn btn-secondary ms-2" 
                            onClick={() => navigate('/summary-detail')}
                        >
                            ยกเลิก
                        </button>
                    </form>
                )
            )}
        </div>
    );
}

export default EditDataSummaryDetail;
