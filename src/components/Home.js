import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler } from "chart.js";
import Nav from "./Nav";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler);

function Home({ Toggle }) {
    const [usersInSystem, setUsersInSystem] = useState(0);
    const [usersOnline, setUsersOnline] = useState(0);
    const [usersOffline, setUsersOffline] = useState(0);
    const [playCardData, setPlayCardData] = useState([]);
    const [playHandData, setPlayHandData] = useState([]);
    const [totalPlayCards, setTotalPlayCards] = useState(0);
    const [totalPlayHands, setTotalPlayHands] = useState(0);
    const [totalPlaySummary, setTotalPlaySummary] = useState(0);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i); // Generate a list of recent years

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const [systemResponse, onlineResponse, offlineResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-count-users`, {
                        headers: { 'x-access-token': token },
                    }),
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-count-users-online`, {
                        headers: { 'x-access-token': token },
                    }),
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-count-users-offline`, {
                        headers: { 'x-access-token': token },
                    }),
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
                const token = localStorage.getItem("authToken");
                const [playCardsResponse, playHandsResponse, playSummaryResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/count-playcard`, {
                        headers: { 'x-access-token': token },
                    }),
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/count-playhand`, {
                        headers: { 'x-access-token': token },
                    }),
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/count-playsummary`, {
                        headers: { 'x-access-token': token },
                    }),
                ]);

                setTotalPlayCards(playCardsResponse.data.Count || 0);
                setTotalPlayHands(playHandsResponse.data.Count || 0);
                setTotalPlaySummary(playSummaryResponse.data.Count || 0);
            } catch (err) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลการเล่น:", err);
            }
        };

        const fetchMonthlyData = async (year) => {
            try {
                const playCardCounts = Array(12).fill(0);
                const playHandCounts = Array(12).fill(0);
                const token = localStorage.getItem("authToken");

                for (let month = 1; month <= 12; month++) {
                    const requestPayload = { Month: month.toString(), Years: year.toString() }; // แปลง Month และ Years เป็น string

                    const cardResponse = await axios.post(
                        `${process.env.REACT_APP_BASE_URL}/api/count-playcard-date`,
                        requestPayload,
                        { headers: { "x-access-token": token } }
                    );

                    const handResponse = await axios.post(
                        `${process.env.REACT_APP_BASE_URL}/api/count-playhand-date`,
                        requestPayload,
                        { headers: { "x-access-token": token } }
                    );

                    // ตรวจสอบผลลัพธ์จาก API
                    console.log(`ข้อมูล PlayCard เดือนที่ ${month}:`, cardResponse.data);
                    console.log(`ข้อมูล PlayHand เดือนที่ ${month}:`, handResponse.data);

                    // ใช้ optional chaining เพื่อเข้าถึง property 'Count' อย่างปลอดภัย
                    playCardCounts[month - 1] = cardResponse.data?.Count || 0;
                    playHandCounts[month - 1] = handResponse.data?.Count || 0;
                }

                console.log("ผลลัพธ์ทั้งหมดของ PlayCard:", playCardCounts);
                console.log("ผลลัพธ์ทั้งหมดของ PlayHand:", playHandCounts);

                setPlayCardData(playCardCounts);
                setPlayHandData(playHandCounts);
            } catch (err) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลรายเดือน:", err);
            }
        };

        fetchUserData();
        fetchPlayData();
        fetchMonthlyData(selectedYear);
    }, [selectedYear]);

    if (loading) return <div>กำลังโหลดข้อมูล...</div>;
    if (error) return <div>{error}</div>;

    const pieData = {
        labels: ["Play Cards", "Play Hands", "Play Summary"],
        datasets: [
            {
                label: "Play Data",
                data: [totalPlayCards, totalPlayHands, totalPlaySummary],
                borderWidth: 1,
                borderColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            },
        ],
    };

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

    const lineOptions = {
        scales: {
            y: {
                ticks: {
                    stepSize: 5,
                    callback: function (value) {
                        return Number.isInteger(value) ? value : null;
                    },
                },
                beginAtZero: true,
            },
        },
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

                    {/* Line Graph and Year Selector */}
                    <div className='col-md-6'>
                        <div className='card shadow-sm rounded'>
                            <div className='card-body'>
                                <div className='d-flex justify-content-between align-items-center mb-3'>
                                    <h3 className='fs-4'>Play Cards vs Play Hands (Monthly)</h3>
                                    <select
                                        id="yearSelect"
                                        className="form-select"
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                        style={{ width: "150px" }}
                                    >
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{ width: "100%", height: "300px" }}>
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
