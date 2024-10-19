import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function ZodiacPage() {
    const [zodiacs, setZodiacs] = useState([]);
    const navigate = useNavigate(); 

    const fetchZodiacs = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-zodiac`);
            console.log("Fetched zodiacs:", response.data); 
            setZodiacs(response.data);
        } catch (error) {
            console.error("Error fetching zodiacs:", error);
        }
    };
    
    useEffect(() => {
        fetchZodiacs();
    }, []);

    return (
        <div className="container mt-4">
            <div className="table-responsive" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <table className="table table-hover caption-top bg-light rounded mt-4 shadow-sm" style={{ width: '100%' }}>
                    <caption className="text-dark fs-4 mb-3">รายการราศี</caption>
                    <thead className="table-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Work</th>
                            <th scope="col">Finance</th>
                            <th scope="col">Love</th>
                            <th scope="col">Score</th>
                            <th scope="col">Image</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {zodiacs.map((zodiac, index) => (
                            <tr key={zodiac.Zodiac_ID}>
                                <td>{index + 1}</td>
                                <td>{zodiac.Zodiac_Name}</td>
                                <td>{zodiac.Zodiac_Detail}</td>
                                <td>{zodiac.Zodiac_WorkTopic}</td>
                                <td>{zodiac.Zodiac_FinanceTopic}</td>
                                <td>{zodiac.Zodiac_LoveTopic}</td>
                                <td>{zodiac.Zodiac_Score}</td>
                                <td>
                                    <img 
                                        src={zodiac.Zodiac_ImageFile ? `${process.env.REACT_APP_BASE_URL}${zodiac.Zodiac_ImageFile}` : 'URL รูปภาพ fallback'} 
                                        alt={zodiac.Zodiac_Name} 
                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} 
                                    />
                                </td>
                                <td>
                                    <div className="d-flex justify-content-end">
                                        <button 
                                            className="btn btn-warning btn-sm me-2" 
                                            onClick={() => {
                                                console.log("Navigate to edit page:", `/edit-zodiac/${zodiac.Zodiac_ID}`);
                                                navigate(`/edit-zodiac/${zodiac.Zodiac_ID}`);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                console.log("Navigate to detail page:", `/data-zodiac/${zodiac.Zodiac_ID}`);
                                                navigate(`/data-zodiac/${zodiac.Zodiac_ID}`); 
                                            }}
                                        >
                                            Show
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ZodiacPage;
