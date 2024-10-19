import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

function ShowDataZodiac() {
    const { id } = useParams(); // รับ ID จาก URL
    const [zodiac, setZodiac] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // ใช้เพื่อไปยังหน้า ZodiacPage

    const fetchZodiac = async () => {
        try {
            const response = await axios.get(`http://10.13.3.78:3000/api/get-zodiac/${id}`);
            setZodiac(response.data);
        } catch (error) {
            setError("Error fetching zodiac data.");
            console.error("Error fetching zodiac:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchZodiac();
    }, [id]);

    return (
        <div className="container mt-5" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <div className="d-flex align-items-center mb-4">
                <i 
                    className="bi bi-arrow-left ms-2" 
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }} 
                    onClick={() => navigate(-1)} // นำทางไปยังหน้า ZodiacPage
                ></i>
                <h1 className="ms-5">ข้อมูลราศี</h1> {/* เพิ่ม margin-left ให้กับ h1 */}
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
                zodiac && (
                    <div className="card shadow-sm border-light">
                        <div className="card-body">
                            <h5 className="card-title text-center">{zodiac.Zodiac_Name}</h5>
                            <div className="text-center mb-3">
                                <img 
                                    src={zodiac.Zodiac_ImageFile ? `http://10.13.3.78:3000${zodiac.Zodiac_ImageFile}` : 'URL รูปภาพ fallback'} 
                                    alt={zodiac.Zodiac_Name} 
                                    className="img-fluid rounded-circle" 
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><strong>รายละเอียด:</strong></label>
                                <div className="form-control-custom">{zodiac.Zodiac_Detail}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><strong>หัวข้อการทำงาน:</strong></label>
                                <div className="form-control-custom">{zodiac.Zodiac_WorkTopic}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><strong>หัวข้อการเงิน:</strong></label>
                                <div className="form-control-custom">{zodiac.Zodiac_FinanceTopic}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><strong>หัวข้อความรัก:</strong></label>
                                <div className="form-control-custom">{zodiac.Zodiac_LoveTopic}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><strong>คะแนน:</strong></label>
                                <div className="form-control-custom">{zodiac.Zodiac_Score}</div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default ShowDataZodiac;
