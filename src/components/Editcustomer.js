import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

function EditCustomer() {
    const { id } = useParams();
    const navigate = useNavigate();

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
    const [success, setSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [phoneError, setPhoneError] = useState('');

    const fetchCustomer = useCallback(async () => {
        const token = localStorage.getItem("authToken"); // ดึง Token จาก localStorage
        console.log("Token:", token); // ตรวจสอบค่า Token
    
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-profile-web/${id}`, {
                headers: {
                    'x-access-token': token // เพิ่ม Token ใน Header
                }
            });
    
            console.log("API Response:", response.data); // ตรวจสอบการตอบกลับจาก API
    
            const data = response.data;
            setUserID(data.Users_ID || '');
            setUsername(data.Users_Username || '');
            setDisplayName(data.Users_DisplayName || '');
            setFirstName(data.Users_FirstName || '');
            setLastName(data.Users_LastName || '');
            setEmail(data.Users_Email || '');
            setPhone(data.Users_Phone || '');
            setBirthDate(data.Users_BirthDate ? data.Users_BirthDate.split('T')[0] : '');
            setRegisDate(data.Users_RegisDate ? data.Users_RegisDate.split('T')[0] : '');
            setImageFile(data.Users_ImageFile || '');
            setGoogle_Uid(data.Users_Google_Uid || '');
            setGender_ID(data.UsersGender_ID || '');
            setRegisType_Name(data.RegisType_Name || '');
            setUsersType_Name(data.UsersType_Name || '');
            setIsActive(data.Users_IsActive || '');
        } catch (error) {
            setError("Error fetching customer data.");
            console.error("Error fetching customer:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);
    

    useEffect(() => {
        fetchCustomer();
    }, [fetchCustomer]);

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setPhone(value);
            setPhoneError('');
        } else {
            setPhoneError('หมายเลขโทรศัพท์ต้องเป็นตัวเลข 10 หลัก');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Users_Phone.length !== 10) {
            setPhoneError('หมายเลขโทรศัพท์ต้องเป็น 10 หลัก');
            return;
        }
    
        const token = localStorage.getItem("authToken"); // ดึง Token จาก localStorage
    
        const updatedCustomer = {
            Users_DisplayName,
            Users_FirstName,
            Users_LastName,
            Users_Phone,
            Users_BirthDate,
            UsersGender_ID,
            Users_IsActive
          };
          
    
        try {
            // PUT คำขอแรกเพื่ออัปเดตโปรไฟล์
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/update-profile-web/${id}`, updatedCustomer, {
                headers: {
                    'x-access-token': token // เพิ่ม Token ใน Header
                }
            });
    
            if (selectedFile) {
                const formData = new FormData();
                formData.append('Profile_Image', selectedFile);
    
                // PUT คำขอที่สองเพื่ออัปโหลดรูปภาพ
                const putImageResponse = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/update-profile-image-web/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'x-access-token': token // เพิ่ม Token ใน Header
                    }
                });
    
                if (putImageResponse.data.status === true) {
                    const deleteData = { imagePath: Users_ImageFile };
                    try {
                        // DELETE คำขอเพื่อลบรูปภาพเก่า
                        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/delete-profile-image/${id}`, {
                            data: deleteData,
                            headers: {
                                'x-access-token': token // เพิ่ม Token ใน Header
                            }
                        });
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
            alert(response.data.message);
            navigate('/customer');
        } catch (error) {
            setError("Error updating customer data.");
            console.error("Error updating customer:", error);
        }
    };
    
    

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center mb-4">
                <i 
                    className="bi bi-arrow-left ms-2" 
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }} 
                    onClick={() => navigate(-1)}
                ></i>
                <h1 className="text-center ms-5">{loading ? "กำลังโหลดข้อมูล..." : "แก้ไขข้อมูลผู้ใช้"}</h1>
            </div>
            {loading ? (
                <p>กำลังโหลดข้อมูล...</p>
            ) : (
                <div style={{ height: '70vh', overflowY: 'auto' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">User ID</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Users_ID"
                                value={Users_ID}
                                onChange={(e) => setUserID(e.target.value)}
                                required
                                readOnly
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Users_Username"
                                value={Users_Username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                readOnly
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Display Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Users_DisplayName"
                                value={Users_DisplayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Users_FirstName"
                                value={Users_FirstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Users_LastName"
                                value={Users_LastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="Users_Email"
                                value={Users_Email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                readOnly
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Users_Phone"
                                value={Users_Phone}
                                onChange={handlePhoneChange}
                                required
                            />
                            {phoneError && <small className="text-danger">{phoneError}</small>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Birth Date</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Users_BirthDate"
                                value={Users_BirthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                readOnly
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}

                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Registration Date</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Users_RegisDate"
                                value={Users_RegisDate}
                                readOnly
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Google UID</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Users_Google_Uid"
                                value={Users_Google_Uid}
                                onChange={(e) => setGoogle_Uid(e.target.value)}
                                required
                                readOnly
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gender</label>
                            <select
                                className="form-select"
                                name="UsersGender_ID"
                                value={UsersGender_ID} // ใช้ค่า UsersGender_ID เพื่อให้ dropdown แสดงค่าที่ถูกเลือก
                                onChange={(e) => setGender_ID(e.target.value)} // อัปเดต state เมื่อมีการเลือกใหม่
                                required
                            >
                                <option value=''>เลือกเพศ</option> {/* ตัวเลือกว่าง */}
                                <option value="1">MALE</option>
                                <option value="2">FEMALE</option>
                                <option value="3">OTHER</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Registration Type</label>
                            <input
                                type="text"
                                className="form-control"
                                name="RegisType_Name"
                                value={RegisType_Name}
                                onChange={(e) => setRegisType_Name(e.target.value)}
                                readOnly
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}

                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">User Type</label>
                            <input
                                type="text"
                                className="form-control"
                                name="UsersType_Name"
                                value={UsersType_Name}
                                onChange={(e) => setUsersType_Name(e.target.value)}
                                readOnly
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}

                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Is Active</label>
                            <select
                                className="form-select"
                                name="Users_IsActive"
                                value={Users_IsActive}
                                onChange={(e) => setIsActive(e.target.value)}
                                required
                            >
                                <option value="0">Suspended</option>
                                <option value="1">Active</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">บันทึกการเปลี่ยนแปลง</button>
                        {error && <p className="text-danger">{error}</p>}
                        {success && <p className="text-success">Customer updated successfully!</p>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default EditCustomer;
