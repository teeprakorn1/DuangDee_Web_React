import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function HandDetail() {
    const [handDetails, setHandDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchHandDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-handdetail`);
            if (response.data.status === false) {
                setErrorMessage(response.data.message);
            } else {
                setHandDetails(response.data);
            }
        } catch (error) {
            console.error('Error fetching hand details:', error);
            setErrorMessage('เกิดข้อผิดพลาดในการดึงข้อมูล');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHandDetails();
    }, []);

    const filteredHandDetails = handDetails.filter(hand => {
        const handName = hand.HandDetail_Name || '';
        const handDescription = hand.HandDetail_Detail || '';
        const handId = hand.HandDetail_ID.toString(); // Convert ID to string for comparison

        return (
            handName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            handDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
            handId.includes(searchTerm) // Search by ID
        );
    });

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-dark">Hand Detail</h2>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="ค้นหามือ..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    style={{ width: '300px' }} 
                />
            </div>

            {loading ? (
                <div className="alert alert-info">Loading...</div>
            ) : errorMessage ? (
                <div className="alert alert-danger">{errorMessage}</div>
            ) : (
                <div className="table-responsive">
                    {filteredHandDetails.length === 0 ? (
                        <div className="alert alert-warning">No results found.</div>
                    ) : (
                        <table className="table table-hover caption-top bg-light rounded mt-4 shadow-sm">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Hand Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Percent</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHandDetails.map((hand) => (
                                    <tr key={hand.HandDetail_ID}>
                                        <td>{hand.HandDetail_ID}</td>
                                        <td>{hand.HandDetail_Name}</td>
                                        <td style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                                            {hand.HandDetail_Detail.length > 100 
                                                ? `${hand.HandDetail_Detail.substring(0, 100)}...` 
                                                : hand.HandDetail_Detail}
                                        </td>
                                        <td>{hand.HandDetail_MinPercent}</td>
                                        <td>
                                            <div className="d-flex">
                                                <button 
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => navigate(`/edit-hand-detail/${hand.HandDetail_ID}`)}
                                                    aria-label={`Edit ${hand.HandDetail_Name}`}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => navigate(`/data-hand-detail/${hand.HandDetail_ID}`)}
                                                    aria-label={`Show ${hand.HandDetail_Name}`}
                                                >
                                                    Show
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}

export default HandDetail;
