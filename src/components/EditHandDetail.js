import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditHandDetail() {
    const { id } = useParams();
    const [handDetail, setHandDetail] = useState({
        HandDetail_ID: '',  // Add HandDetail_ID to the state
        HandDetail_Name: '',
        HandDetail_Detail: '',
        HandDetail_MinPercent: ''
    });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHandDetail((prevDetail) => ({
            ...prevDetail,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_BASE_URL}/api/update-handdetail/${id}, handDetail`);
            navigate('/hand-detail');
        } catch (error) {
            console.error('Error updating hand detail:', error);
            setErrorMessage('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-dark">Edit Hand Detail</h2>

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="handDetailID" className="form-label">Hand ID</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="handDetailID" 
                        name="HandDetail_ID"
                        value={handDetail.HandDetail_ID}
                        readOnly 
                        style={{ backgroundColor: '#e9ecef', color: '#495057' }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="handDetailName" className="form-label">Hand Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="handDetailName" 
                        name="HandDetail_Name"
                        value={handDetail.HandDetail_Name}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="handDetailDetail" className="form-label">Description</label>
                    <textarea 
                        className="form-control" 
                        id="handDetailDetail" 
                        name="HandDetail_Detail"
                        value={handDetail.HandDetail_Detail}
                        onChange={handleChange}
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="handDetailPercent" className="form-label">Percent</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="handDetailPercent" 
                        name="HandDetail_MinPercent"
                        value={handDetail.HandDetail_MinPercent}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}

export default EditHandDetail;