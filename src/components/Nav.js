import React from 'react';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';

const Nav = ({ onToggle }) => {
    return (
        <nav className="navbar navbar-expand-sm navbar-white bg-white px-3 custom-navbar">
            <div className="container-fluid">
                {/* คลิกที่ไอคอนเพื่อเปิดปิด Sidebar */}
                <i className="navbar-brand bi bi-justify-left fs-4" onClick={onToggle}></i>
                
                <button 
                    className="navbar-toggler d-lg-none" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapsibleNavId" 
                    aria-controls="collapsibleNavId" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <i className='bi bi-justify'></i>
                </button>    
            </div>
        </nav>
    );
};

export default Nav;
