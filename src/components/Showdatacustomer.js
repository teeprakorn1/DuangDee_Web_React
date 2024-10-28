import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

import './style.css';

function Showdatacustomer() {
    const { id } = useParams(); // รับ ID จาก URL
    const [Users_ID, setUserID] = useState('');
    const [Users_Username, setUsername] = useState('');
    const [Users_DisplayName, setDisplayName] = useState('');
    const [Users_FirstName, setFirstName] = useState('');
    const [Users_LastName, setLastName] = useState('');
    const [Users_Email, setEmail] = useState('');
    const [Users_Phone, setPhone] = useState('');
    const [Users_BirthDate, setBirthDate] = useState('');
    const [Users_RegisDate, setRegisDate] = useState('');
    const [Users_ImageFile, setImageFile] = useState('');
    const [Users_Google_Uid, setGoogle_Uid] = useState('');
    const [UsersGender_ID, setGender_ID] = useState('');
    const [RegisType_Name, setRegisType_Name] = useState('');
    const [UsersType_Name, setUsersType_Name] = useState('');
    const [Users_IsActive, setIsActive] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // ใช้เพื่อไปยังหน้า ZodiacPage

    const fetchCustomer = async () => {
        try {
            const token = localStorage.getItem("authToken"); // ดึง Token จาก localStorage
    
            // ส่งคำขอ GET พร้อม Header Token
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-profile/${id}`, {
                headers: {
                    'x-access-token': token // เพิ่ม Token ใน Header
                }
            });
    
            const data = response.data;
            setUserID(data.Users_ID);
            setUsername(data.Users_Username);
            setDisplayName(data.Users_DisplayName);
            setFirstName(data.Users_FirstName);
            setLastName(data.Users_LastName);
            setEmail(data.Users_Email);
            setPhone(data.Users_Phone);
            setBirthDate(data.Users_BirthDate.split('T')[0]); // แปลงให้เป็นวันที่
            setRegisDate(data.Users_RegisDate);
            setImageFile(data.Users_ImageFile);
            setGoogle_Uid(data.Users_Google_Uid);
            setGender_ID(data.UsersGender_ID);
            setRegisType_Name(data.RegisType_Name);
            setUsersType_Name(data.UsersType_Name);
            setIsActive(data.Users_IsActive);
        } catch (error) {
            setError("Error fetching customer data.");
            console.error("Error fetching customer:", error);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchCustomer();
    }, [id]);

    // กำหนดสีใหม่ที่นี่
    const inputStyle = {
        backgroundColor: '#f5f5f5', // สีพื้นหลังใหม่
        color: '#333333', // สีข้อความใหม่
    };

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center mb-4">
                <i 
                    className="bi bi-arrow-left ms-2" 
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }} 
                    onClick={() => navigate(-1)} // ย้อนกลับไปหน้าก่อน
                ></i>
                <h1 className="text-center ms-5">ข้อมูลผู้ใช้</h1>
            </div>
            {loading ? (
                <p>กำลังโหลดข้อมูล...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <div style={{ maxHeight: '550px', overflowY: 'auto' }}>
                    <div className="mb-3">
                        <label className="form-label">User ID</label>
                        <input className="form-control" value={Users_ID} readOnly style={inputStyle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className="form-control" value={Users_Username} readOnly style={inputStyle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Display Name</label>
                        <input className="form-control" value={Users_DisplayName} readOnly style={inputStyle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input className="form-control" value={Users_FirstName} readOnly style={inputStyle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input className="form-control" value={Users_LastName} readOnly style={inputStyle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" value={Users_Email} readOnly style={inputStyle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input className="form-control" value={Users_Phone} readOnly style={inputStyle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Birth Date</label>
                        <input className="form-control" value={Users_BirthDate} readOnly style={inputStyle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Registration Date</label>
                        <input className="form-control" value={Users_RegisDate} readOnly style={inputStyle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image File</label>
                        <input className="form-control" value={Users_ImageFile} readOnly style={inputStyle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Google UID</label>
                        <input className="form-control" value={Users_Google_Uid} readOnly style={inputStyle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <input className="form-control" value={UsersGender_ID === "1" ? "MALE" : UsersGender_ID === "2" ? "FEMALE" : "OTHER"} readOnly style={inputStyle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Registration Type ID</label>
                        <input className="form-control" value={RegisType_Name} readOnly style={inputStyle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">User Type ID</label>
                        <input className="form-control" value={UsersType_Name} readOnly style={inputStyle} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Is Active</label>
                        <input className="form-control" value={Users_IsActive === "1" ? "Active" : "Suspended"} readOnly style={inputStyle} />
                    </div>
                    {/* Edit Button */}
                    <div className="mt-4">
                        <button 
                            className="btn btn-secondary" 
                            onClick={() => navigate(`/edit/${id}`)} // เปลี่ยนเส้นทางไปยังหน้า edit
                        >
                            ไปยังหน้าแก้ไขข้อมูลผู้ใช้
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Showdatacustomer;
