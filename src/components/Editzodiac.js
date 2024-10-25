import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

function Editzodiac() {
    const { id } = useParams(); // รับ ID จาก URL
    const navigate = useNavigate(); // ใช้ navigate เพื่อเปลี่ยนหน้าแทนการ reload

    const [Zodiac_ID, setZodiacID] = useState(''); 
    const [Zodiac_Name, setZodiacName] = useState('');
    const [Zodiac_Detail, setZodiacDetail] = useState('');
    const [Zodiac_WorkTopic, setZodiacWorkTopic] = useState('');
    const [Zodiac_FinanceTopic, setZodiacFinanceTopic] = useState('');
    const [Zodiac_LoveTopic, setZodiacLoveTopic] = useState('');
    const [Zodiac_Score, setZodiacScore] = useState('');
    const [Zodiac_ImageFile, setZodiacImageFile] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); // State สำหรับเก็บไฟล์ใหม่ที่ถูกเลือก

    const fetchzodiac = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-zodiac/${id}`);
            const data = response.data;
            setZodiacID(data.Zodiac_ID); // ตั้งค่า Zodiac ID
            setZodiacName(data.Zodiac_Name);
            setZodiacDetail(data.Zodiac_Detail);
            setZodiacWorkTopic(data.Zodiac_WorkTopic);
            setZodiacFinanceTopic(data.Zodiac_FinanceTopic);
            setZodiacLoveTopic(data.Zodiac_LoveTopic);
            setZodiacScore(data.Zodiac_Score);
            setZodiacImageFile(data.Zodiac_ImageFile);
        } catch (error) {
            setError("Error fetching zodiac data.");
            console.error("Error fetching zodiac:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchzodiac();
    }, [id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // ดึงไฟล์ที่เลือก
        if (file) {
            setSelectedFile(file); // แสดงชื่อไฟล์ที่เลือก
        }
    };

    const handleScoreChange = (e) => {
        const value = e.target.value;
        // ตรวจสอบว่าเป็นค่าตัวเลขและไม่เกิน 100
        if (value >= 0 && value <= 100) {
            setZodiacScore(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedZodiac = {
            Zodiac_Name,
            Zodiac_Detail,
            Zodiac_WorkTopic,
            Zodiac_FinanceTopic,
            Zodiac_LoveTopic,
            Zodiac_Score,
        };

        try {
            // 1. อัปเดตข้อมูล Zodiac
            await axios.put(`${process.env.REACT_APP_BASE_URL}/api/update-zodiac/${id}`, updatedZodiac);
            
            // 2. ตรวจสอบว่ามีไฟล์ใหม่หรือไม่
            if (selectedFile) {
                const formData = new FormData();
                formData.append('Zodiac_Image', selectedFile); // เพิ่มไฟล์ใหม่ที่ถูกเลือก

                const putImageResponse = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/update-Zodiac-image/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // 3. ตรวจสอบว่าการอัปโหลดสำเร็จหรือไม่
                if (putImageResponse.data.status === true) {
                    // ส่งคำสั่งลบไฟล์เก่า
                    const deleteData = { imagePath: Zodiac_ImageFile }; // ส่งชื่อไฟล์ที่ต้องการลบ
    
                    try {
                        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/delete-zodiac-image/${id}`, { data: deleteData });
                    } catch (deleteError) {
                        console.error("Error deleting image:", deleteError.response?.data || deleteError.message);
                        setError("ไม่สามารถลบภาพเก่าได้.");
                        return;
                    }
                } else {
                    setError("ไม่สามารถอัปโหลดภาพใหม่ได้.");
                    return;
                }
            }
    
            setSuccess(true);

            // ใช้ navigate เพื่อเปลี่ยนหน้าไปที่ /zodiac แทนการ reload
            alert('บันทึกข้อมูลเรียบร้อยแล้ว');
            navigate(`/edit-zodiac/${id}`); // เปลี่ยนเส้นทางไปยังหน้ารายการ Zodiac 

        } catch (error) {
            setError("Error updating zodiac data.");
            console.error("Error updating zodiac:", error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center mb-4">
                <i 
                    className="bi bi-arrow-left ms-2" 
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }} 
                    onClick={() => navigate(-1)} // ย้อนกลับไปหน้าก่อน
                ></i>
                <h1 className="text-center ms-5">แก้ไขข้อมูลราศี</h1>
            </div>
            {loading ? (
                <p>กำลังโหลดข้อมูล...</p>
            ) : (
                <div style={{ maxHeight: '550px', overflowY: 'auto' }}>
                    <form onSubmit={handleSubmit}>
                        {/* เพิ่มฟิลด์ Zodiac ID */}
                        <div className="mb-3">
                            <label className="form-label" name="zodiacID">Zodiac ID</label>
                            <input
                                type="text"
                                className="form-control"
                                value={Zodiac_ID} 
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" name="zodiacName">Zodiac Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={Zodiac_Name}
                                onChange={(e) => setZodiacName(e.target.value)}
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" name="zodiacDetail">Zodiac Detail</label>
                            <textarea
                                className="form-control"
                                value={Zodiac_Detail}
                                onChange={(e) => setZodiacDetail(e.target.value)}
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" name="zodiacWorkTopic">Work Topic</label>
                            <input
                                type="text"
                                className="form-control"
                                value={Zodiac_WorkTopic}
                                onChange={(e) => setZodiacWorkTopic(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" name="zodiacFinanceTopic">Finance Topic</label>
                            <input
                                type="text"
                                className="form-control"
                                value={Zodiac_FinanceTopic}
                                onChange={(e) => setZodiacFinanceTopic(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" name="zodiacLoveTopic">Love Topic</label>
                            <input
                                type="text"
                                className="form-control"
                                value={Zodiac_LoveTopic}
                                onChange={(e) => setZodiacLoveTopic(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" name="zodiacScore">Zodiac Score</label>
                            <input
                                type="number"
                                className="form-control"
                                value={Zodiac_Score}
                                onChange={handleScoreChange} // ใช้ handleScoreChange แทน
                                required
                                max="101" // จำกัดค่าไม่เกิน 100
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" name="zodiacImageFile">Image File</label>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={Zodiac_ImageFile}
                                    readOnly
                                    placeholder="เลือกรูปภาพ..."
                                />
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*" // จำกัดประเภทไฟล์ให้เลือกเฉพาะภาพ
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" name="saveButton">บันทึกการเปลี่ยนแปลง</button>
                    </form>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    {success && <div className="alert alert-success mt-3">บันทึกข้อมูลเรียบร้อยแล้ว</div>}
                </div>
            )}
        </div>
    );
}

export default Editzodiac;
