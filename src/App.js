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

function App() {
  const [toggle, setToggle] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

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

  const renderCard = (header, body) => (
    <div className='card'>
      <div className='card-header'>
        <h4>{header}</h4>
      </div>
      <div className='card-body'>{body}</div>
    </div>
  );

  return (
    <Router>
      <div className='d-flex min-vh-100 bg-light'>
        {isSignedIn && toggle && (
          <div className='col-3 col-md-2 bg-white shadow vh-100'>
            <Sidebar onLogout={handleLogout} />
          </div>
        )}
        <div className={`flex-grow-1 ${toggle ? 'col-md-9' : 'col-12'}`}>
          <div className='p-3'>
            <Routes>
              {/* หากยังไม่ได้ลงชื่อเข้าใช้ ให้แสดงหน้า Signin */}
              <Route 
                path="/" 
                element={!isSignedIn ? <Signin onSignin={handleSignin} /> : <Navigate to="/home" />} 
              />

              {/* หลังจากลงชื่อเข้าใช้แล้ว แสดงหน้า Dashboard */}
              <Route 
                path="/home" 
                element={isSignedIn ? renderCard("Welcome to the Dashboard", <Home Toggle={handleToggle}/>) : <Navigate to="/" />} 
              />

              {/* หน้ารายการผู้ใช้ */}
              <Route 
                path="/customer" 
                element={isSignedIn ? renderCard("Customer Page", <CustomerPage />) : <Navigate to="/" />} 
              />

              {/* แก้ไขข้อมูลผู้ใช้ */}
              <Route 
                path="/edit/:id" 
                element={isSignedIn ? renderCard("Edit Customer", <EditCustomer />) : <Navigate to="/" />} 
              />

              {/* แสดงข้อมูลผู้ใช้ */}
              <Route 
                path="/data/:id" 
                element={isSignedIn ? renderCard("Data Customer", <Showdatacustomer />) : <Navigate to="/" />} 
              />
              <Route 
                path="/tarot" 
                element={isSignedIn ? renderCard("Tarot Page", <TarotPage />) : <Navigate to="/" />} 
              />

              {/* หน้า Zodiac */}
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

              {/* เส้นทางใด ๆ ที่ไม่ตรง จะถูกนำกลับไปหน้าแรก */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
