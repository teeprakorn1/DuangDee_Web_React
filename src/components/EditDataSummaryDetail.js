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
    const [success, setSuccess] = useState(false);


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
            setSuccess(true);
            alert('บันทึกข้อมูลเรียบร้อยแล้ว');
            navigate('/summary-detail');
        } catch (error) {
            console.error("Error updating summary detail:", error);
        }
    };
    const handleMinPercentChange = (e) => {
        const value = e.target.value; // ค่าที่ผู้ใช้กรอก
        // ตรวจสอบว่าค่าที่กรอกเป็นค่าว่างหรืออยู่ในช่วง 0 ถึง 100
        if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
            setSummaryDetail({ ...summaryDetail, SummaryDetail_MinPercent: value }); // อัปเดตสถานะ
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex align-items-center mb-4">
                <i 
                    className="bi bi-arrow-left ms-2" 
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }} 
                    onClick={() => navigate(-1)} // นำทางไปยังหน้าที่ก่อนหน้านี้
                ></i>
                <h2 className="text-dark ms-3">แก้ไขข้อมูลสรุป</h2>
            </div>
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
                            <label className="form-label" htmlFor="summaryDetailName">ชื่อสรุป:</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="summaryDetailName" // เพิ่ม name สำหรับ input
                                value={summaryDetail.SummaryDetail_Name}
                                onChange={(e) => setSummaryDetail({ ...summaryDetail, SummaryDetail_Name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="summaryDetailDetail">รายละเอียด:</label>
                            <textarea 
                                className="form-control"
                                name="summaryDetailDetail" // เพิ่ม name สำหรับ textarea
                                value={summaryDetail.SummaryDetail_Detail}
                                onChange={(e) => setSummaryDetail({ ...summaryDetail, SummaryDetail_Detail: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="summaryDetailMinPercent">คะแนนขั้นต่ำ:</label>
                            <input 
                                type="number" 
                                className="form-control"
                                name="summaryDetailMinPercent"
                                value={summaryDetail.SummaryDetail_MinPercent}
                                onChange={handleMinPercentChange} // ใช้ฟังก์ชันที่สร้างขึ้น
                                min="0"
                                max="100"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" name="submitButton">บันทึกข้อมูลการเปลี่ยนแปลง</button>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        {success && <div className="alert alert-success mt-3">บันทึกข้อมูลเรียบร้อยแล้ว</div>}
                    </form>
                )
            )}
        </div>
    );
}

export default EditDataSummaryDetail;
