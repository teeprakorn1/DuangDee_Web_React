import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";

function Home({ Toggle }) { // รับ Toggle เป็น props
    const [usersInSystem, setUsersInSystem] = useState(0);
    const [usersOnline, setUsersOnline] = useState(0);
    const [usersOffline, setUsersOffline] = useState(0);
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
    
        fetchUserData();
    }, []);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='px-3'>
            <Nav onToggle={Toggle} /> {/* ส่ง Toggle ไปยัง Nav */}
            <div className='container-fluid'>
                <div className='row g-3 my-2'>
                    {/* Users in System Card */}
                    <div className='col-md-4'>
                        <div className='card shadow-sm rounded'>
                            <div className='card-body d-flex justify-content-around align-items-center'>
                                <div>
                                    <h3 className='fs-2'>{usersInSystem}</h3>
                                    <p className='fs-5 text-muted'>Users in System</p>
                                </div>
                                <i className='bi bi-person-circle p-3 fs-1 text-success'></i>
                            </div>
                        </div>
                    </div>
                    {/* Users Online Card */}
                    <div className='col-md-4'>
                        <div className='card shadow-sm rounded'>
                            <div className='card-body d-flex justify-content-around align-items-center'>
                                <div>
                                    <h3 className='fs-2'>{usersOnline}</h3>
                                    <p className='fs-5 text-muted'>Users Active</p>
                                </div>
                                <i className='bi bi-person-check p-3 fs-1 text-info'></i>
                            </div>
                        </div>
                    </div>
                    {/* Users Offline Card */}
                    <div className='col-md-4'>
                        <div className='card shadow-sm rounded'>
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

                {/* Data Users Table */}
                <div className="table-responsive">
                    <table className='table caption-top bg-white rounded mt-4 shadow-sm'>
                        <caption className='text-dark fs-4'>Data Users</caption>
                        <thead>
                            <tr className='table-light'>
                                <th scope="col">#</th>
                                <th scope="col">FirstName</th>
                                <th scope="col">LastName</th>
                                <th scope="col">Gmail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>ทีปกร</td>
                                <td>คุ้มวงศ์</td>
                                <td>teeprakorn@gmail.com</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>ภูริต</td>
                                <td>เจนสาริกิจ</td>
                                <td>phurit@gmail.com</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>จารุกัญ</td>
                                <td>ทองหล่อ</td>
                                <td>jarugang@gmail.com</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;
