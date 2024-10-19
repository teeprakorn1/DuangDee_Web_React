import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

function EditCustomer() {
    const { id } = useParams(); // รับ ID จาก URL
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // ดึงไฟล์ที่เลือก
        if (file) {
            setSelectedFile(file); // แสดงชื่อไฟล์ที่เลือก
        }
    };
    

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

    const [selectedFile, setSelectedFile] = useState(null); // State สำหรับเก็บไฟล์ใหม่ที่ถูกเลือก


    const fetchCustomer = async () => {
        try {
            const response = await axios.get(`http://10.13.3.78:3000/api/get-profile/${id}`);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedCustomer = {
            Users_ID,
            Users_Username,
            Users_DisplayName,
            Users_FirstName,
            Users_LastName,
            Users_Email,
            Users_Phone,
            Users_BirthDate: Users_BirthDate.split('T')[0], // แปลงให้เป็นวันที่
            Users_RegisDate,
            Users_ImageFile,
            Users_Google_Uid,
            UsersGender_ID,
            RegisType_Name,
            UsersType_Name,
            Users_IsActive
        };

        try {
            // 1. อัปเดตข้อมูลผู้ใช้
            await axios.put(`http://10.13.3.78:3000/api/update-profile/${id}`, updatedCustomer);
            
            // 2. ตรวจสอบว่ามีไฟล์ใหม่หรือไม่
            if (selectedFile) {
                const formData = new FormData();
                formData.append('Profile_Image', selectedFile); // เพิ่มไฟล์ใหม่ที่ถูกเลือก

                const putImageResponse = await axios.put(`http://10.13.3.78:3000/api/update-profile-image/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // 3. ตรวจสอบว่าการอัปโหลดสำเร็จหรือไม่
                if (putImageResponse.data.status === true) {
                    // ส่งคำสั่งลบไฟล์เก่า
                    const deleteData = { imagePath: Users_ImageFile }; // ส่งชื่อไฟล์ที่ต้องการลบ
    
                    try {
                        await axios.delete(`http://10.13.3.78:3000/api/delete-profile-image/${id}`, { data: deleteData });
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
            navigate('/'); // เปลี่ยนไปยังหน้าอื่นหลังจากบันทึกเสร็จ
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
                    onClick={() => navigate(-1)} // ย้อนกลับไปหน้าก่อน
                ></i>
                <h1 className="text-center ms-5">แก้ไขข้อมูลผู้ใช้</h1>
            </div>
            {loading ? (
                <p>กำลังโหลดข้อมูล...</p>
            ) : (
                <div style={{ maxHeight: '550px', overflowY: 'auto' }}> {/* เพิ่ม scrollbar */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">User ID</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Users_Username"
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
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Birth Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="Users_BirthDate"
                                value={Users_BirthDate ? Users_BirthDate.split('T')[0] : ''}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                            <p className="mt-2">Formatted Date: {Users_BirthDate ? formatDate(Users_BirthDate) : ''}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Registration Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="Users_RegisDate"
                                value={Users_RegisDate ? Users_RegisDate.split('T')[0] : ''}
                                readOnly
                                style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Image File</label>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    name="Users_ImageFile"
                                    value={Users_ImageFile}
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

                        <div className="mb-3">
                            <label className="form-label">Google UID</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Users_Google_Uid"
                                value={Users_Google_Uid}
                                onChange={(e) => setGoogle_Uid(e.target.value)}
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
                            <label className="form-label">Registration Type ID</label>
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
                            <label className="form-label">User Type ID</label>
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
                                <option value="1">Active</option>
                                <option value="0">Suspended</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">บันทึกการเปลี่ยนแปลง</button>
                    </form>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    {success && <div className="alert alert-success mt-3">บันทึกข้อมูลเรียบร้อยแล้ว</div>}
                </div>
            )}
        </div>
    );
}

export default EditCustomer;
