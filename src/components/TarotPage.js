import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function TarotPage() {
    const [cards, setCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchCards = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-card`); // Adjust API endpoint here
            console.log("Fetched tarot cards:", response.data);
            setCards(response.data);
        } catch (error) {
            console.error("Error fetching tarot cards:", error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    // Filter cards based on the search term
    const filteredCards = cards.filter(card =>
        card.Card_Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-dark">รายการไพ่ Tarot</h2>
                <input
                    type="text"
                    className="form-control"
                    placeholder="ค้นหาไพ่ Tarot..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                    style={{ width: '300px' }} // Adjust the width of the search box
                />
            </div>

            <div className="table-responsive">
                <table className="table table-hover caption-top bg-light rounded mt-4 shadow-sm" style={{ width: '100%' }}>
                    <thead className="table-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Card Name</th>
                            <th scope="col">Work</th>
                            <th scope="col">Finance</th>
                            <th scope="col">Love</th>
                            <th scope="col">WorkScore</th>
                            <th scope="col">FinanceScore</th>
                            <th scope="col">LoveScore</th>
                            <th scope="col">Image</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCards.length > 0 ? (
                            filteredCards.map((card, index) => (
                                <tr key={card.Card_ID}>
                                    <td>{index + 1}</td>
                                    <td>{card.Card_Name}</td>
                                    <td>{card.Card_WorkTopic}</td>
                                    <td>{card.Card_FinanceTopic}</td>
                                    <td>{card.Card_LoveTopic}</td>
                                    <td>{card.Card_WorkScore}</td>
                                    <td>{card.Card_FinanceScore}</td>
                                    <td>{card.Card_LoveScore}</td>
                                    <td>
                                        <img
                                            src={card.Card_ImageFile ? `${process.env.REACT_APP_BASE_URL}${card.Card_ImageFile}` : 'URL รูปภาพ fallback'}
                                            alt={card.Card_Name}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                                        />
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-end">
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => {
                                                    console.log("Navigate to edit page:", `/edit-tarot-card/${card.Card_ID}`);
                                                    navigate(`/edit-tarot-card/${card.Card_ID}`);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => {
                                                    console.log("Navigate to detail page:", `/data-tarot-card/${card.Card_ID}`);
                                                    navigate(`/data-tarot-card/${card.Card_ID}`);
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
                                <td colSpan="11" className="text-center">ไม่พบไพ่ Tarot ที่ค้นหา</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TarotPage;
