import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Signin from './components/Signin';
import CustomerPage from './components/CustomerPage';
import EditCustomer from './components/Editcustomer';
import Nav from './components/Nav'; // อย่าลืมเรียกใช้งาน Nav
import Showdatacustomer from './components/Showdatacustomer';


function App() {
  const [toggle, setToggle] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleToggle = () => setToggle((prev) => !prev); // ฟังก์ชันเปิดปิด Sidebar
  const handleSignin = () => setIsSignedIn(true);
  const handleLogout = () => setIsSignedIn(false);

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
              {/* If not signed in, show Signin */}
              <Route 
                path="/" 
                element={!isSignedIn ? <Signin onSignin={handleSignin} /> : <Navigate to="/home" />} 
              />

              {/* Once signed in, show Home components */}
              <Route 
                path="/home" 
                element={isSignedIn ? renderCard("Welcome to the Dashboard", <Home Toggle={handleToggle}/>) : <Navigate to="/" />} 
                
              />
              

              {/* Customer Page */}
              <Route 
                path="/customer" 
                element={isSignedIn ? renderCard("Customer Page", <CustomerPage />) : <Navigate to="/" />} 
              />

              {/* Edit Customer Page */}
              <Route 
                path="/edit/:id" 
                element={isSignedIn ? renderCard("Edit Customer", <EditCustomer />) : <Navigate to="/" />} 
              />
              {/* Show Customer Page */}

              <Route 
                path="/data/:id" 
                element={isSignedIn ? renderCard("Data Customer", <Showdatacustomer />) : <Navigate to="/" />} 
              />

              {/* Redirect any other path to home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
