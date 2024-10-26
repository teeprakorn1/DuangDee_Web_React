import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditHandDetail() {
    const { id } = useParams();
    const [handDetail, setHandDetail] = useState({
        HandDetail_ID: '',
        HandDetail_Name: '',
        HandDetail_Detail: '',
        HandDetail_MinPercent: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const fetchHandDetail = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-handdetail/${id}`);
            if (response.data) {
                setHandDetail(response.data);
            } else {
                setErrorMessage('Could not find hand detail');
            }
        } catch (error) {
            console.error('Error fetching hand detail:', error);
            setErrorMessage('เกิดข้อผิดพลาดในการดึงข้อมูล');
        }
    };

    useEffect(() => {
        fetchHandDetail();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // ตรวจสอบค่า Percent ให้อยู่ในช่วง 0 ถึง 100
        if (name === 'HandDetail_MinPercent' && (value === '' || (Number(value) >= 0 && Number(value) <= 100))) {
            setHandDetail((prevDetail) => ({
                ...prevDetail,
                [name]: value
            }));
        } else if (name !== 'HandDetail_MinPercent') {
            // กรณีข้อมูลอื่น ๆ นอกเหนือจาก Percent
            setHandDetail((prevDetail) => ({
                ...prevDetail,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_BASE_URL}/api/update-handdetail/${id}`, handDetail);
            setSuccess(true);
            alert('บันทึกข้อมูลเรียบร้อยแล้ว');
            navigate('/hand-detail');
        } catch (error) {
            console.error('Error updating hand detail:', error);
            setErrorMessage('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center mb-4">
            <i 
                    className="bi bi-arrow-left ms-2" 
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }} 
                    onClick={() => navigate(-1)} // นำทางไปยังหน้าที่ก่อนหน้านี้
                ></i>
            <h2 className="text-dark ms-3">แก้ไขข้อมูลรายละเอียดมือ</h2>
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="handDetailID" className="form-label">Hand ID</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="handDetailID" 
                        name="HandDetail_ID"
                        value={handDetail.HandDetail_ID}
                        readOnly 
                        style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="handDetailName" className="form-label">Hand Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="handDetailName" 
                        name="HandDetail_Name"
                        value={handDetail.HandDetail_Name}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="handDetailDetail" className="form-label">Description</label>
                    <textarea 
                        className="form-control" 
                        id="handDetailDetail" 
                        name="HandDetail_Detail"
                        value={handDetail.HandDetail_Detail}
                        onChange={handleChange}
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="handDetailPercent" className="form-label">Percent</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="handDetailPercent" 
                        name="HandDetail_MinPercent"
                        value={handDetail.HandDetail_MinPercent}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>

                <button type="submit" className="btn btn-primary">บันทึกการเปลี่ยนแปลง</button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {success && <div className="alert alert-success mt-3">บันทึกข้อมูลเรียบร้อยแล้ว</div>}
            </form>
        </div>
    );
}

export default EditHandDetail;
