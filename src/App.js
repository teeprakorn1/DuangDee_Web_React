import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Signin from './components/Signin';
import CustomerPage from './components/CustomerPage';
import EditCustomer from './components/Editcustomer'; 
import Showdatacustomer from './components/Showdatacustomer';
import ZodiacPage from './components/ZodiacPage'; 
import TarotPage from './components/TarotPage'; 
import Editzodiac from './components/Editzodiac';
import Showdatazodiac from './components/Showdatazodiac';
import EditTarotCard from './components/EditTarotCard';
import ShowdataTarot from './components/ShowdataTarot';
import AddAdmin from './components/AddAdmin';

function App() {
  const [toggle, setToggle] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showPinPage, setShowPinPage] = useState(false); // สถานะเพื่อแสดงหน้า Pin

  // ตรวจสอบ Local Storage เมื่อโหลดหน้าเว็บใหม่
  useEffect(() => {
    const savedSigninStatus = localStorage.getItem('isSignedIn');
    if (savedSigninStatus === 'true') {
      setIsSignedIn(true);  // ตั้งค่าสถานะเป็น true ถ้าเคยลงชื่อเข้าใช้แล้ว
    }
  }, []);  // [] ทำให้ useEffect ทำงานครั้งเดียวเมื่อ component ถูกโหลด

  const handleToggle = () => setToggle((prev) => !prev); 

  const handleSignin = () => {
    setIsSignedIn(true);
    localStorage.setItem('isSignedIn', 'true');  // เก็บสถานะลงใน Local Storage
  };

  const handleLogout = () => {
    setIsSignedIn(false);
    localStorage.removeItem('isSignedIn');  // ลบสถานะการเข้าสู่ระบบเมื่อออกจากระบบ
  };

  // ฟังก์ชันสำหรับแสดงการ์ด
  const renderCard = (header, body) => (
    <div className='card'>
      <div className='card-header'>
        <h4>{header}</h4>
      </div>
      <div className='card-body'>{body}</div>
    </div>
  );

  // ฟังก์ชันเพื่อเปิดหน้า Pin
  const handleAddAdminClick = () => {
    setShowPinPage(true);
  };

  return (
    <Router>
      <div className='d-flex min-vh-100 bg-light'>
        {isSignedIn && toggle && (
          <div className='col-3 col-md-2 bg-white shadow vh-100'>
            <Sidebar onLogout={handleLogout} onAddAdminClick={handleAddAdminClick} /> {/* ส่งฟังก์ชันไปยัง Sidebar */}
          </div>
        )}
        <div className={`flex-grow-1 ${toggle ? 'col-md-9' : 'col-12'}`}>
          <div className='p-3'>
            <Routes>
              <Route 
                path="/" 
                element={!isSignedIn ? <Signin onSignin={handleSignin} /> : <Navigate to="/home" />} 
              />
              <Route 
                path="/home" 
                element={isSignedIn ? renderCard("Welcome to the Dashboard", <Home Toggle={handleToggle}/>) : <Navigate to="/" />} 
              />
              <Route 
                path="/customer" 
                element={isSignedIn ? renderCard("Customer Page", <CustomerPage />) : <Navigate to="/" />} 
              />
              <Route 
                path="/edit/:id" 
                element={isSignedIn ? renderCard("Edit Customer", <EditCustomer />) : <Navigate to="/" />} 
              />
              <Route 
                path="/data/:id" 
                element={isSignedIn ? renderCard("Data Customer", <Showdatacustomer />) : <Navigate to="/" />} 
              />
              <Route 
                path="/tarot" 
                element={isSignedIn ? renderCard("Tarot Page", <TarotPage />) : <Navigate to="/" />} 
              />
              <Route 
                path="/edit-tarot-card/:id" 
                element={isSignedIn ? renderCard("Edit Tarot Card", <EditTarotCard/>) : <Navigate to="/" />} 
              />
              <Route 
                path="/data-tarot-card/:id" 
                element={isSignedIn ? renderCard("Data Tarot Card", <ShowdataTarot />) : <Navigate to="/" />} 
              />
              <Route 
                path="/zodiac" 
                element={isSignedIn ? renderCard("Zodiac Page", <ZodiacPage />) : <Navigate to="/" />} 
              />
              <Route 
                path="/edit-zodiac/:id" 
                element={isSignedIn ? renderCard("Edit Zodiac", <Editzodiac/>) : <Navigate to="/" />} 
              />
              <Route 
                path="/data-zodiac/:id" 
                element={isSignedIn ? renderCard("Data Zodiac", <Showdatazodiac  />) : <Navigate to="/" />} 
              />
              <Route 
                path="/add-admin" 
                element={isSignedIn ? renderCard("Add Admin", <AddAdmin />) : <Navigate to="/" />} 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
      {showPinPage && <Navigate to="/pin" />} {/* นำทางไปยังหน้า Pin หากสถานะ showPinPage เป็น true */}
    </Router>
  );
}

export default App;
