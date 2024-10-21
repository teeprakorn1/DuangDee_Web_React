import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function CustomerPage() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // สเตตัสสำหรับการค้นหา
    const navigate = useNavigate(); 

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-profile`);
            console.log("Fetched customers:", response.data); 
            setCustomers(response.data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };
    
    useEffect(() => {
        fetchCustomers();
    }, []);

    // ฟังก์ชันสำหรับการกรองลูกค้า
    const filteredCustomers = customers.filter(customer => {
        const username = customer.Users_Username || ''; // ใช้ค่าเริ่มต้นเป็น ''
        const displayName = customer.Users_DisplayName || ''; // ใช้ค่าเริ่มต้นเป็น ''
        
        return (
            username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            displayName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-dark">รายการผู้ใช้</h2>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="ค้นหาผู้ใช้..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} // อัพเดตค่า searchTerm ตามที่ผู้ใช้พิมพ์
                    style={{ width: '300px' }} // ปรับขนาดช่องค้นหา
                />
            </div>

            <div className="table-responsive">
                <table className="table table-hover caption-top bg-light rounded mt-4 shadow-sm">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Display Name</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Image</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer, index) => (
                            <tr key={customer.Users_ID}>
                                <td>{index + 1}</td>
                                <td>{customer.Users_Username}</td>
                                <td>{customer.Users_DisplayName}</td>
                                <td>{customer.Users_FirstName}</td>
                                <td>{customer.Users_LastName}</td>
                                <td>{customer.Users_Email}</td>
                                <td>{customer.Users_Phone}</td>
                                <td>
                                    <img 
                                        src={customer.Users_ImageUrl ? `${process.env.REACT_APP_BASE_URL}${customer.Users_ImageUrl}` : 'URL รูปภาพ fallback'} 
                                        alt={customer.Users_Username} 
                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} 
                                    />
                                </td>
                                <td>
                                    <button 
                                        className="btn btn-warning btn-sm me-2" 
                                        onClick={() => {
                                            console.log("Navigate to edit page:", `/edit/${customer.Users_ID}`);
                                            navigate(`/edit/${customer.Users_ID}`);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        console.log("Navigate to data page:", `/data/${customer.Users_ID}`);
                                        navigate(`/data/${customer.Users_ID}`); 
                                    }}
                                    >
                                        Show
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomerPage;
