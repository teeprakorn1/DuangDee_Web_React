import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddAdmin() {
    const [usersEmail, setUsersEmail] = useState('');
    const [usersUsername, setUsersUsername] = useState('');
    const [usersDisplayName, setUsersDisplayName] = useState('');
    const [usersPassword, setUsersPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // ฟิลด์ใหม่สำหรับ Confirm Password
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // ตรวจสอบว่ารหัสผ่านและ Confirm Password ตรงกันหรือไม่
        if (usersPassword !== confirmPassword) {
            setMessage("รหัสผ่านไม่ตรงกัน");
            return;
        }
    
        const token = localStorage.getItem("authToken"); // ดึง Token จาก localStorage
    
        try {
            // ส่งคำขอ POST พร้อม Header Token
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin-add`, {
                Users_Email: usersEmail,
                Users_Username: usersUsername,
                Users_DisplayName: usersDisplayName,
                Users_Password: usersPassword,
            }, {
                headers: {
                    'x-access-token': token // เพิ่ม Token ใน Header
                }
            });
    
            setMessage(response.data.message);
            // Reset form fields
            setUsersEmail('');
            setUsersUsername('');
            setUsersDisplayName('');
            setUsersPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error("Error adding admin:", error);
            setMessage("เกิดข้อผิดพลาดในการลงทะเบียน Admin");
        }
    };
    
    return (
        <div className="container mt-4">
            <h2>เพิ่ม Admin</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="usersEmail"
                        value={usersEmail}
                        onChange={(e) => setUsersEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="usersUsername"
                        value={usersUsername}
                        onChange={(e) => setUsersUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="displayName" className="form-label">Display Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="displayName"
                        name="usersDisplayName"
                        value={usersDisplayName}
                        onChange={(e) => setUsersDisplayName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="usersPassword"
                        value={usersPassword}
                        onChange={(e) => setUsersPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">ลงทะเบียน Admin</button>
            </form>
        </div>
    );
}

export default AddAdmin;
