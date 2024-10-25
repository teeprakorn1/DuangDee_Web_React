import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditTarotCard() {
    const { id } = useParams(); // Get the Card_ID from the URL
    const navigate = useNavigate();

    const [Card_Name, setCardName] = useState('');
    const [Card_WorkTopic, setCardWorkTopic] = useState('');
    const [Card_FinanceTopic, setCardFinanceTopic] = useState('');
    const [Card_LoveTopic, setCardLoveTopic] = useState('');
    const [Card_WorkScore, setCardWorkScore] = useState('');
    const [Card_FinanceScore, setCardFinanceScore] = useState('');
    const [Card_LoveScore, setCardLoveScore] = useState('');
    const [Card_ImageFile, setCardImageFile] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Using useCallback to memoize the fetchCardDetails function
    const fetchCardDetails = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-card/${id}`);
            const data = response.data;
            setCardName(data.Card_Name);
            setCardWorkTopic(data.Card_WorkTopic);
            setCardFinanceTopic(data.Card_FinanceTopic);
            setCardLoveTopic(data.Card_LoveTopic);
            setCardWorkScore(data.Card_WorkScore);
            setCardFinanceScore(data.Card_FinanceScore);
            setCardLoveScore(data.Card_LoveScore);
            setCardImageFile(data.Card_ImageFile);
        } catch (error) {
            setError("Error fetching tarot card data.");
            console.error("Error fetching tarot card:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchCardDetails();
    }, [fetchCardDetails]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleScoreChange = (setter) => (e) => {
        const value = e.target.value;
        if (value === '' || (value >= 0 && value <= 100)) {
            setter(value); // Set value if it's empty or between 0 and 100
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedCard = {
            Card_Name,
            Card_WorkTopic,
            Card_FinanceTopic,
            Card_LoveTopic,
            Card_WorkScore,
            Card_FinanceScore,
            Card_LoveScore,
        };

        try {
            await axios.put(`${process.env.REACT_APP_BASE_URL}/api/update-card/${id}`, updatedCard);

            if (selectedFile) {
                const formData = new FormData();
                formData.append('Card_ImageFile', selectedFile);

                const putImageResponse = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/update-card-image/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (putImageResponse.data.status !== true) {
                    setError("Error updating card image.");
                    return;
                }
            }

            setSuccess(true);
            alert('บันทึกข้อมูลเรียบร้อยแล้ว');
            navigate(`/edit-tarot-card/${id}`);

        } catch (error) {
            setError("Error updating tarot card.");
            console.error("Error updating tarot card:", error);
        }
    };

    return (
        <div className="container mt-4" style={{ height: '80vh', overflowY: 'auto' }}>
            <h1 className="text-center">Edit Tarot Card</h1>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="cardName">Card Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cardName" // เพิ่ม id สำหรับ input
                            name="cardName" // เพิ่ม name สำหรับ input
                            value={Card_Name}
                            onChange={(e) => setCardName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="cardWorkTopic">Work Topic</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cardWorkTopic" // เพิ่ม id สำหรับ input
                            name="cardWorkTopic" // เพิ่ม name สำหรับ input
                            value={Card_WorkTopic}
                            onChange={(e) => setCardWorkTopic(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="cardFinanceTopic">Finance Topic</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cardFinanceTopic" // เพิ่ม id สำหรับ input
                            name="cardFinanceTopic" // เพิ่ม name สำหรับ input
                            value={Card_FinanceTopic}
                            onChange={(e) => setCardFinanceTopic(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="cardLoveTopic">Love Topic</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cardLoveTopic" // เพิ่ม id สำหรับ input
                            name="cardLoveTopic" // เพิ่ม name สำหรับ input
                            value={Card_LoveTopic}
                            onChange={(e) => setCardLoveTopic(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="cardWorkScore">Work Score</label>
                        <input
                            type="number"
                            className="form-control"
                            id="cardWorkScore" // เพิ่ม id สำหรับ input
                            name="cardWorkScore" // เพิ่ม name สำหรับ input
                            value={Card_WorkScore}
                            onChange={handleScoreChange(setCardWorkScore)}
                            max="101" // Limit value to 100
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="cardFinanceScore">Finance Score</label>
                        <input
                            type="number"
                            className="form-control"
                            id="cardFinanceScore" // เพิ่ม id สำหรับ input
                            name="cardFinanceScore" // เพิ่ม name สำหรับ input
                            value={Card_FinanceScore}
                            onChange={handleScoreChange(setCardFinanceScore)}
                            max="101" // Limit value to 100
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="cardLoveScore">Love Score</label>
                        <input
                            type="number"
                            className="form-control"
                            id="cardLoveScore" // เพิ่ม id สำหรับ input
                            name="cardLoveScore" // เพิ่ม name สำหรับ input
                            value={Card_LoveScore}
                            onChange={handleScoreChange(setCardLoveScore)}
                            max="101" // Limit value to 100
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="cardImageFile">Card Image</label>
                        <div className="d-flex align-items-center">
                            <input
                                type="text"
                                className="form-control me-2"
                                id="cardImageFile" // เพิ่ม id สำหรับ input
                                name="cardImageFile" // เพิ่ม name สำหรับ input
                                value={Card_ImageFile}
                                readOnly
                            />
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleFileChange}
                                name="selectedFile" // เพิ่ม name สำหรับ input file
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" name="saveButton">บันทึกการเปลี่ยนแปลง</button>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    {success && <div className="alert alert-success mt-3">บันทึกข้อมูลเรียบร้อยแล้ว</div>}
                </form>
            )}
        </div>
    );
}

export default EditTarotCard;
