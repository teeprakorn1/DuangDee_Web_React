import React from "react";
import Nav from "./Nav";

function Home({ Toggle }) {
    return (
        <div className='px-3'>
            <Nav Toggle={Toggle} />
            <div className='container-fluid'>
                <div className='row g-3 my-2'>
                    {/* Users in System Card */}
                    <div className='col-md-4'>
                        <div className='card shadow-sm rounded'>
                            <div className='card-body d-flex justify-content-around align-items-center'>
                                <div>
                                    <h3 className='fs-2'>230</h3> {/* Update this value as needed */}
                                    <p className='fs-5 text-muted'>Users in System</p> {/* Updated label */}
                                </div>
                                <i className='bi bi-person-circle p-3 fs-1 text-success'></i> {/* Changed icon */}
                            </div>
                        </div>
                    </div>
                    {/* Users Online Card */}
                    <div className='col-md-4'>
                        <div className='card shadow-sm rounded'>
                            <div className='card-body d-flex justify-content-around align-items-center'>
                                <div>
                                    <h3 className='fs-2'>50</h3>
                                    <p className='fs-5 text-muted'>Users Online</p>
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
                                    <h3 className='fs-2'>150</h3>
                                    <p className='fs-5 text-muted'>Users Offline</p>
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
