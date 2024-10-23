import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function ZodiacPage() {
    const [zodiacs, setZodiacs] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
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

    // Filter zodiacs based on the search term
    const filteredZodiacs = zodiacs.filter(zodiac => 
        zodiac.Zodiac_Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-dark">รายการราศี</h2>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="ค้นหาราศี..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                    style={{ width: '300px' }} // Adjust the width of the search box
                />
            </div>

            <div className="table-responsive" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <table className="table table-hover caption-top bg-light rounded mt-4 shadow-sm" style={{ width: '100%' }}>
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
                        {filteredZodiacs.length > 0 ? (
                            filteredZodiacs.map((zodiac, index) => (
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">ไม่พบราศีที่ค้นหา</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ZodiacPage;
