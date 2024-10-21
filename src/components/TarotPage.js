import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function TarotPage() {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate(); 

    const fetchCards = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-card`); // ปรับเปลี่ยน API endpoint ที่นี่
            console.log("Fetched tarot cards:", response.data); 
            setCards(response.data);
        } catch (error) {
            console.error("Error fetching tarot cards:", error);
        }
    };
    
    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <div className="container mt-4">
            <div className="table-responsive" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <table className="table table-hover caption-top bg-light rounded mt-4 shadow-sm" style={{ width: '100%' }}>
                    <caption className="text-dark fs-4 mb-3">รายการไพ่ Tarot</caption>
                    <thead className="table-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Card Name</th>
                            <th scope="col">Detail</th>
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
                        {cards.map((card, index) => (
                            <tr key={card.Card_ID}>
                                <td>{index + 1}</td>
                                <td>{card.Card_Name}</td>
                                <td>{card.Card_Detail}</td> {/* เปลี่ยนชื่อฟิลด์ให้ตรงกับ API */}
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TarotPage;
