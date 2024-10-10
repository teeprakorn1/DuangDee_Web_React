import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

function EditCustomer() {
    const { id } = useParams(); // รับ ID จาก URL
    const navigate = useNavigate();
    
    // State สำหรับข้อมูลผู้ใช้
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
    const [RegisType_ID, setRegisType_ID] = useState('');
    const [UsersType_ID, setUsersType_ID] = useState('');
    const [Users_IsActive, setIsActive] = useState('');
    const [loading, setLoading] = useState(true); // สถานะการโหลด
    const [error, setError] = useState(null); // สำหรับข้อผิดพลาด
    const [success, setSuccess] = useState(false); // สถานะสำเร็จ

    // ฟังก์ชันดึงข้อมูลลูกค้าจาก API
    const fetchCustomer = async () => {
        try {
            const response = await axios.get(`http://10.13.3.104:3000/api/get-profile/${id}`);
            const data = response.data;
            setUsername(data.Users_Username);
            setDisplayName(data.Users_DisplayName);
            setFirstName(data.Users_FirstName);
            setLastName(data.Users_LastName);
            setEmail(data.Users_Email);
            setPhone(data.Users_Phone);
            setBirthDate(data.Users_BirthDate);
            setRegisDate(data.Users_RegisDate);
            setImageFile(data.Users_ImageFile);
            setGoogle_Uid(data.Users_Google_Uid);
            setGender_ID(data.UsersGender_ID);
            setRegisType_ID(data.RegisType_ID);
            setUsersType_ID(data.UsersType_ID);
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

    // ฟังก์ชันเพื่ออัปเดตข้อมูลผู้ใช้
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedCustomer = {
            Users_Username,
            Users_DisplayName,
            Users_FirstName,
            Users_LastName,
            Users_Email,
            Users_Phone,
            Users_BirthDate,
            Users_RegisDate,
            Users_ImageFile,
            Users_Google_Uid,
            UsersGender_ID,
            RegisType_ID,
            UsersType_ID,
            Users_IsActive
        };

        try {
            await axios.put(`http://10.13.3.104:3000/api/get-profile/${id}`, updatedCustomer);
            setSuccess(true); // อัปเดตสำเร็จ
            navigate('/'); // กลับไปที่หน้า CustomerPage หลังจากบันทึก
        } catch (error) {
            setError("Error updating customer data.");
            console.error("Error updating customer:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">แก้ไขข้อมูลผู้ใช้</h1>
            {loading ? (
                <p>กำลังโหลดข้อมูล...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Users_Username"
                            value={Users_Username} // เชื่อมกับ state Users_Username
                            onChange={(e) => setUsername(e.target.value)} // อัปเดตค่า state Users_Username
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Display Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Users_DisplayName"
                            value={Users_DisplayName} // เชื่อมกับ state Users_DisplayName
                            onChange={(e) => setDisplayName(e.target.value)} // อัปเดตค่า state Users_DisplayName
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Users_FirstName"
                            value={Users_FirstName} // เชื่อมกับ state Users_FirstName
                            onChange={(e) => setFirstName(e.target.value)} // อัปเดตค่า state Users_FirstName
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Users_LastName"
                            value={Users_LastName} // เชื่อมกับ state Users_LastName
                            onChange={(e) => setLastName(e.target.value)} // อัปเดตค่า state Users_LastName
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="Users_Email"
                            value={Users_Email} // เชื่อมกับ state Users_Email
                            onChange={(e) => setEmail(e.target.value)} // อัปเดตค่า state Users_Email
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Users_Phone"
                            value={Users_Phone} // เชื่อมกับ state Users_Phone
                            onChange={(e) => setPhone(e.target.value)} // อัปเดตค่า state Users_Phone
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Birth Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="Users_BirthDate"
                            value={Users_BirthDate} // เชื่อมกับ state Users_BirthDate
                            onChange={(e) => setBirthDate(e.target.value)} // อัปเดตค่า state Users_BirthDate
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Registration Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="Users_RegisDate"
                            value={Users_RegisDate} // เชื่อมกับ state Users_RegisDate
                            onChange={(e) => setRegisDate(e.target.value)} // อัปเดตค่า state Users_RegisDate
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image File</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Users_ImageFile"
                            value={Users_ImageFile} // เชื่อมกับ state Users_ImageFile
                            onChange={(e) => setImageFile(e.target.value)} // อัปเดตค่า state Users_ImageFile
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Google UID</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Users_Google_Uid"
                            value={Users_Google_Uid} // เชื่อมกับ state Users_Google_Uid
                            onChange={(e) => setGoogle_Uid(e.target.value)} // อัปเดตค่า state Users_Google_Uid
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender ID</label>
                        <input
                            type="text"
                            className="form-control"
                            name="UsersGender_ID"
                            value={UsersGender_ID} // เชื่อมกับ state UsersGender_ID
                            onChange={(e) => setGender_ID(e.target.value)} // อัปเดตค่า state UsersGender_ID
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Registration Type ID</label>
                        <input
                            type="text"
                            className="form-control"
                            name="RegisType_ID"
                            value={RegisType_ID} // เชื่อมกับ state RegisType_ID
                            onChange={(e) => setRegisType_ID(e.target.value)} // อัปเดตค่า state RegisType_ID
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">User Type ID</label>
                        <input
                            type="text"
                            className="form-control"
                            name="UsersType_ID"
                            value={UsersType_ID} // เชื่อมกับ state UsersType_ID
                            onChange={(e) => setUsersType_ID(e.target.value)} // อัปเดตค่า state UsersType_ID
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Is Active</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Users_IsActive"
                            value={Users_IsActive} // เชื่อมกับ state Users_IsActive
                            onChange={(e) => setIsActive(e.target.value)} // อัปเดตค่า state Users_IsActive
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">บันทึกการเปลี่ยนแปลง</button>
                </form>

            )}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">บันทึกข้อมูลเรียบร้อยแล้ว!</div>}
        </div>
    );
}

export default EditCustomer;
