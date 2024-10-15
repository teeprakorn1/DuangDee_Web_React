import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

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

    return (
        <div className="container mt-4">
            <h1 className="text-center">ข้อมูลผู้ใช้</h1>
            {loading ? (
                <p>กำลังโหลดข้อมูล...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <div style={{ maxHeight: '550px', overflowY: 'auto' }}> {/* เพิ่ม scrollbar */}
                    <div className="mb-3">
                        <label className="form-label">User ID</label>
                        <div className="form-control" style={{ backgroundColor: '#e9ecef' }}>
                            {Users_ID}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <div className="form-control" style={{ backgroundColor: '#e9ecef' }}>
                            {Users_Username}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" >Display Name</label>
                        <div className="form-control"style={{ backgroundColor: '#e9ecef' }} >
                            {Users_DisplayName}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <div className="form-control" style={{ backgroundColor: '#e9ecef' }}>
                            {Users_FirstName}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <div className="form-control" style={{ backgroundColor: '#e9ecef' }}>
                            {Users_LastName}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <div className="form-control" style={{ backgroundColor: '#e9ecef' }}>
                            {Users_Email}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <div className="form-control" style={{ backgroundColor: '#e9ecef' }}>
                            {Users_Phone}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Birth Date</label>
                        <div className="form-control" style={{ backgroundColor: '#e9ecef' }}>
                            {Users_BirthDate}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Registration Date</label>
                        <div className="form-control" style={{ backgroundColor: '#e9ecef' }}>
                            {Users_RegisDate}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image File</label>
                        <div className="form-control" style={{ backgroundColor: '#e9ecef' }}>
                            {Users_ImageFile}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Google UID</label>
                        <div className="form-control" style={{ backgroundColor: '#e9ecef' }}>
                            {Users_Google_Uid}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <div className="form-control" style={{ backgroundColor: '#e9ecef' }}>
                            {UsersGender_ID === "1" ? "MALE" : UsersGender_ID === "2" ? "FEMALE" : "OTHER" }
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Registration Type ID</label>
                        <div className="form-control" style={{ backgroundColor: '#e9ecef' }}>
                            {RegisType_Name}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">User Type ID</label>
                        <div className="form-control" style={{ backgroundColor: '#e9ecef' }}>
                            {UsersType_Name}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Is Active</label>
                        <div className="form-control" style={{ backgroundColor: '#e9ecef' }}>
                            {Users_IsActive === "1" ? "Active" : "Suspended"}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Showdatacustomer;
