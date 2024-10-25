import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function SummaryDetail() {
    const [summaryDetails, setSummaryDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchSummaryDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-summarydetail`);
            setSummaryDetails(response.data);
        } catch (error) {
            setError("Error fetching summary details.");
            console.error("Error fetching summary details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummaryDetails();
    }, []);

    const filteredSummaryDetails = summaryDetails.filter(detail => {
        const id = detail.SummaryDetail_ID.toString(); // Convert ID to string for comparison
        const name = detail.SummaryDetail_Name.toLowerCase();
        return (
            id.includes(searchTerm) || name.includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="me-3">ข้อมูลสรุป</h1>
                <input
                    type="text"
                    className="form-control"
                    placeholder="ค้นหาตาม ID หรือ ชื่อ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '300px' }}
                />
            </div>
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">กำลังโหลด...</span>
                    </div>
                </div>
            ) : error ? (
                <p className="text-danger text-center">{error}</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ชื่อสรุป</th>
                            <th>รายละเอียด</th>
                            <th>คะแนนขั้นต่ำ</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSummaryDetails.map(detail => (
                            <tr key={detail.SummaryDetail_ID}>
                                <td>{detail.SummaryDetail_ID}</td>
                                <td>{detail.SummaryDetail_Name}</td>
                                <td>
                                    {detail.SummaryDetail_Detail.length > 100 
                                        ? `${detail.SummaryDetail_Detail.substring(0, 100)}...` 
                                        : detail.SummaryDetail_Detail}
                                </td>
                                <td>{detail.SummaryDetail_MinPercent}</td>
                                <td className="d-flex justify-content-end align-items-center" style={{ height: '100%', minHeight: '56px' }}>
                                    <button 
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => {
                                            console.log("Navigate to edit page:", `/edit-summary-detail/${detail.SummaryDetail_ID}`);
                                            navigate(`/edit-summary-detail/${detail.SummaryDetail_ID}`);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => {
                                            console.log("Navigate to detail page:", `/data-summary-detail/${detail.SummaryDetail_ID}`);
                                            navigate(`/data-summary-detail/${detail.SummaryDetail_ID}`); 
                                        }}
                                    >
                                        Show
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SummaryDetail;
