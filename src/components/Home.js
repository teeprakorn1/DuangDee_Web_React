import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";
import Nav from "./Nav";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

function Home({ Toggle }) {
    const [usersInSystem, setUsersInSystem] = useState(0);
    const [usersOnline, setUsersOnline] = useState(0);
    const [usersOffline, setUsersOffline] = useState(0);
    const [playCardData, setPlayCardData] = useState([]);
    const [playHandData, setPlayHandData] = useState([]);
    const [totalPlayCards, setTotalPlayCards] = useState(0);
    const [totalPlayHands, setTotalPlayHands] = useState(0);
    const [totalPlaySummary, setTotalPlaySummary] = useState(0);

    // Define loading and error states here
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const [systemResponse, onlineResponse, offlineResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-count-users`),
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-count-users-online`),
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-count-users-offline`)
                ]);

                setUsersInSystem(systemResponse.data.Count);
                setUsersOnline(onlineResponse.data.Count);
                setUsersOffline(offlineResponse.data.Count);
                setLoading(false);
            } catch (err) {
                setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
                setLoading(false);
            }
        };

        const fetchPlayData = async () => {
            try {
                const [playCardsResponse, playHandsResponse, playSummaryResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/count-playcard`),
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/count-playhand`),
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/count-playsummary`)
                ]);

                setTotalPlayCards(playCardsResponse.data.Count || 0);
                setTotalPlayHands(playHandsResponse.data.Count || 0);
                setTotalPlaySummary(playSummaryResponse.data.Count || 0);
            } catch (err) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลการเล่น:", err);
            }
        };

        const fetchMonthlyData = async () => {
            try {
                // ตัวแปรสำหรับเก็บค่า Count แต่ละเดือน
                const playCardCounts = Array(12).fill(0);
                const playHandCounts = Array(12).fill(0);

                // ลูปดึงข้อมูลสำหรับแต่ละเดือน
                for (let month = 1; month <= 12; month++) {
                    const requestPayload = { Month: month, Years: 2024 };

                    // ส่งคำขอไปยัง API ด้วย POST method
                    const cardResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/count-playcard-date`, requestPayload);
                    const handResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/count-playhand-date`, requestPayload);

                    // ดึงค่า Count จากผลลัพธ์ที่ได้รับและเก็บในตำแหน่งของเดือนนั้นๆ
                    playCardCounts[month - 1] = cardResponse.data.Count || 0;
                    playHandCounts[month - 1] = handResponse.data.Count || 0;
                }

                // ตั้งค่า state ให้กับ playCardData และ playHandData
                setPlayCardData(playCardCounts);
                setPlayHandData(playHandCounts);

                // ตรวจสอบค่าที่ได้
                console.log("playCardCounts:", playCardCounts);
                console.log("playHandCounts:", playHandCounts);
            } catch (err) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลรายเดือน:", err);
            }
        };

        fetchUserData();
        fetchPlayData();
        fetchMonthlyData();
    }, []);

    if (loading) return <div>กำลังโหลดข้อมูล...</div>;
    if (error) return <div>{error}</div>;

    // ข้อมูลสำหรับ Pie Chart
    const pieData = {
        labels: ["Play Cards", "Play Hands", "Play Summary"],
        datasets: [
            {
                label: "Play Data",
                data: [totalPlayCards, totalPlayHands, totalPlaySummary],
                borderWidth: 1,
                borderColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"]
            },
        ],
    };

    // ข้อมูลสำหรับ Line Graph
    const lineData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Play Cards",
                data: playCardData,
                borderColor: "#36A2EB",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                fill: true,
            },
            {
                label: "Play Hands",
                data: playHandData,
                borderColor: "#FF6384",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                fill: true,
            },
        ],
    };

    // ตัวเลือกสำหรับ Line Graph
    const lineOptions = {
        scales: {
            y: {
                ticks: {
                    stepSize: 5,
                    callback: function (value) {
                        return Number.isInteger(value) ? value : null;
                    }
                },
                beginAtZero: true
            }
        }
    };

    return (
        <div className='px-3'>
            <Nav onToggle={Toggle} />
            <div className='container-fluid'>
                {/* Cards for users */}
                <div className='row g-3 my-2'>
                    <div className='col-md-4'>
                        <div className='card shadow-sm rounded' style={{ backgroundColor: "#f8f9fa" }}>
                            <div className='card-body d-flex justify-content-around align-items-center'>
                                <div>
                                    <h3 className='fs-2'>{usersInSystem}</h3>
                                    <p className='fs-5 text-muted'>Users in System</p>
                                </div>
                                <i className='bi bi-person-circle p-3 fs-1 text-success'></i>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card shadow-sm rounded' style={{ backgroundColor: "#f8f9fa" }}>
                            <div className='card-body d-flex justify-content-around align-items-center'>
                                <div>
                                    <h3 className='fs-2'>{usersOnline}</h3>
                                    <p className='fs-5 text-muted'>Users Active</p>
                                </div>
                                <i className='bi bi-person-check p-3 fs-1 text-info'></i>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card shadow-sm rounded' style={{ backgroundColor: "#f8f9fa" }}>
                            <div className='card-body d-flex justify-content-around align-items-center'>
                                <div>
                                    <h3 className='fs-2'>{usersOffline}</h3>
                                    <p className='fs-5 text-muted'>Users Suspended</p>
                                </div>
                                <i className='bi bi-person-x p-3 fs-1 text-danger'></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Combined Pie and Line Graph Row */}
                <div className='row g-3 my-2'>
                    {/* Pie Chart */}
                    <div className='col-md-6'>
                        <div className='card shadow-sm rounded'>
                            <div className='card-body'>
                                <h3 className='fs-4 text-center'>Play Cards vs Play Hands</h3>
                                <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
                                    <Pie data={pieData} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Line Graph */}
                    <div className='col-md-6'>
                        <div className='card shadow-sm rounded'>
                            <div className='card-body'>
                                <h3 className='fs-4 text-center'>Play Cards vs Play Hands (Monthly)</h3>
                                <div style={{ width: "100%", height: "400px" }}>
                                    <Line data={lineData} options={lineOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
