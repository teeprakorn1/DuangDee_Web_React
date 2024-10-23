import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ShowDataHandDetail() {
    const { id } = useParams();
    const [handDetail, setHandDetail] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const fetchHandDetail = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-handdetail/${id}`);
            if (response.data) {
                setHandDetail(response.data);
            } else {
                setErrorMessage('Could not find hand detail');
            }
        } catch (error) {
            console.error('Error fetching hand detail:', error);
            setErrorMessage('เกิดข้อผิดพลาดในการดึงข้อมูล');
        }
    };

    useEffect(() => {
        fetchHandDetail();
    }, [id]);

    const handleEdit = () => {
        navigate(`/edit-hand-detail/${id}`);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-dark">Hand Detail</h2>

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            {handDetail ? (
                <div className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">Hand ID</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={handDetail.HandDetail_ID}
                            readOnly 
                            style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Hand Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={handDetail.HandDetail_Name}
                            readOnly 
                            style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea 
                            className="form-control" 
                            value={handDetail.HandDetail_Detail}
                            readOnly 
                            style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Percent</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            value={handDetail.HandDetail_MinPercent}
                            readOnly 
                            style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                        />
                    </div>

                    <button className="btn btn-secondary" onClick={handleEdit}>
                        Edit Hand Detail
                    </button>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default ShowDataHandDetail;
