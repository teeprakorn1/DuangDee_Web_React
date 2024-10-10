// src/CustomerPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate

function CustomerPage() {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate(); // สร้าง instance ของ useNavigate

    // ฟังก์ชันดึงข้อมูลลูกค้าจาก API
    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://10.13.3.104:3000/api/get-profile');
            setCustomers(response.data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="container mt-4">
            <div className="table-responsive">
                <table className="table table-hover caption-top bg-light rounded mt-4 shadow-sm">
                    <caption className="text-dark fs-4 mb-3">รายการผู้ใช้</caption>
                    <thead className="table-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Display Name</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{customer.Users_Username}</td>
                                <td>{customer.Users_DisplayName}</td>
                                <td>{customer.Users_FirstName}</td>
                                <td>{customer.Users_LastName}</td>
                                <td>{customer.Users_Email}</td>
                                <td>{customer.Users_Phone}</td>
                                <td>
                                    <button 
                                        className="btn btn-warning btn-sm me-2" 
                                        onClick={() => navigate(`/edit/${customer.id}`)} // เปลี่ยนเส้นทางไปหน้า EditCustomer
                                    >
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm">Delete</button>
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
