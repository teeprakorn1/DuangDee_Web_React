import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './style.css';

function Sidebar({ onLogout }) { // รับ prop onLogout
    return (
        <div className='bg-white d-flex flex-column p-2' style={{ height: '100vh' }}>
            <div className='m-2 d-flex align-items-center'>
                <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
                <span className="brand-name fs-4">Admin</span>
            </div>
            <hr className="text-dark" />
            <div className='list-group list-group-flush flex-grow-1'>
                <Link className='list-group-item py-2' to='/home'>
                    <i className='bi bi-stack fs-5 me-3'></i>
                    <span>Dashboard</span>
                </Link>
                <Link className='list-group-item py-2' to='/customer'>
                    <i className='bi bi-person-lines-fill fs-4 me-2'></i>
                    <span>Customer</span>
                </Link>
                <Link className='list-group-item py-2' to='/tarot'>
                    <i className='bi bi-file-fill fs-5 me-3'></i>
                    <span>Tarot</span>
                </Link>
                <Link className='list-group-item py-2' to='/zodiac'>
                    <i className='bi bi-star-fill fs-5 me-3'></i>
                    <span>Zodiac</span>
                </Link>
            </div>
            {/* Center Logout link */}
            <div className="d-flex justify-content-center mt-auto mb-2">
                <button className='list-group-item logout-link rounded' onClick={onLogout}> {/* เปลี่ยนเป็นปุ่มเพื่อเรียกฟังก์ชัน logout */}
                    <i className='bi bi-power fs-5 me-2'></i>
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
