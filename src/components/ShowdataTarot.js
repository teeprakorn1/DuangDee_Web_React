import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

function Showdatatarot() {
    const { id } = useParams(); // รับ Card_ID จาก URL
    const [cardDetails, setCardDetails] = useState(null); // เปลี่ยนเป็น null เพื่อระบุว่าข้อมูลยังไม่ได้ถูกโหลด
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // ใช้เพื่อไปยังหน้าที่ก่อนหน้านี้

    // ฟังก์ชันดึงข้อมูลการ์ด
    const fetchCardDetails = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-card/${id}`);
            if (response.data) {
                setCardDetails(response.data);
            } else {
                setError("Card not found.");
            }
        } catch (error) {
            setError("Error fetching tarot card data.");
            console.error("Error fetching tarot card:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchCardDetails();
    }, [fetchCardDetails]);

    return (
        <div className="container mt-5" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <div className="d-flex align-items-center mb-4">
                <i 
                    className="bi bi-arrow-left ms-2" 
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }} 
                    onClick={() => navigate(-1)} // นำทางไปยังหน้าที่ก่อนหน้านี้
                ></i>
                <h1 className="ms-5">ข้อมูลการ์ดทาโรต์</h1> {/* เพิ่ม margin-left ให้กับ h1 */}
            </div>
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">กำลังโหลด...</span>
                    </div>
                </div>
            ) : error ? (
                <p className="text-danger text-center">{error}</p>
            ) : cardDetails ? (
                <div className="card shadow-sm border-light">
                    <div className="card-body">
                        <h5 className="card-title text-center">{cardDetails.Card_Name}</h5>
                        <div className="text-center mb-3">
                            <img 
                                src={cardDetails.Card_ImageFile ? `${process.env.REACT_APP_IMAGE_BASE_URL}/${cardDetails.Card_ImageFile}` : 'URL รูปภาพ fallback'} 
                                alt={cardDetails.Card_Name} 
                                className="img-fluid" 
                                style={{ maxWidth: '100%', height: 'auto' }} 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><strong>รายละเอียด:</strong></label>
                            <div className="form-control-custom">{cardDetails.Card_Detail}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><strong>หัวข้อการทำงาน:</strong></label>
                            <div className="form-control-custom">{cardDetails.Card_WorkTopic}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><strong>หัวข้อการเงิน:</strong></label>
                            <div className="form-control-custom">{cardDetails.Card_FinanceTopic}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><strong>หัวข้อความรัก:</strong></label>
                            <div className="form-control-custom">{cardDetails.Card_LoveTopic}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><strong>คะแนนการทำงาน:</strong></label>
                            <div className="form-control-custom">{cardDetails.Card_WorkScore}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><strong>คะแนนการเงิน:</strong></label>
                            <div className="form-control-custom">{cardDetails.Card_FinanceScore}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><strong>คะแนนความรัก:</strong></label>
                            <div className="form-control-custom">{cardDetails.Card_LoveScore}</div>
                        </div>
                        {/* Edit Button */}
                        <div className="mt-4">
                            <button 
                                className="btn btn-secondary" // You can change this class to match your desired button style
                                onClick={() => navigate(`/edit-tarot-card/${id}`)} // นำทางไปยังหน้า EditTarot
                            >
                                ไปยังหน้าแก้ไข Tarot
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No card details available.</p>
            )}
        </div>
    );
}

export default Showdatatarot;
