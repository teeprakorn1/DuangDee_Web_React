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
import HandDetail from './components/HandDetail';
import EditHandDetail from './components/EditHandDetail';
import ShowdataHandDetail from './components/ShowdataHandDetail';
import SummaryDetail from './components/SummaryDetail';
import EditDataSummaryDetail from './components/EditDataSummaryDetail';
import ShowDataSummaryDetail from './components/ShowDataSummaryDetail';

function App() {
  const [toggle, setToggle] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showPinPage, setShowPinPage] = useState(false);

  // Check local storage for saved sign-in status
  useEffect(() => {
    const savedSigninStatus = localStorage.getItem('isSignedIn');
    setIsSignedIn(savedSigninStatus === 'true');
  }, []);

  const handleToggle = () => setToggle((prev) => !prev);

  const handleSignin = () => {
    setIsSignedIn(true);
    localStorage.setItem('isSignedIn', 'true');
  };

  const handleLogout = () => {
    setIsSignedIn(false);
    localStorage.removeItem('isSignedIn');
  };

  const renderCard = (header, body) => (
    <div className='card'>
      <div className='card-header'>
        <h4>{header}</h4>
      </div>
      <div className='card-body'>{body}</div>
    </div>
  );

  const handleAddAdminClick = () => setShowPinPage(true);

  return (
    <Router>
      <div className='d-flex min-vh-100 bg-light'>
        {isSignedIn && toggle && (
          <div className='col-3 col-md-2 bg-white shadow vh-100'>
            <Sidebar onLogout={handleLogout} onAddAdminClick={handleAddAdminClick} />
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
              <Route 
                path="/hand-detail" 
                element={isSignedIn ? renderCard("Hand Detail", <HandDetail />) : <Navigate to="/" />} 
              />
              <Route 
                path="/edit-hand-detail/:id" 
                element={isSignedIn ? renderCard("Edit Hand Detail", <EditHandDetail />) : <Navigate to="/" />} 
              />
              <Route 
                path="/data-hand-detail/:id" 
                element={isSignedIn ? renderCard("Show Hand Detail", <ShowdataHandDetail />) : <Navigate to="/" />} 
              />
              <Route 
                path="/summary-detail" 
                element={isSignedIn ? renderCard("Summary Detail", <SummaryDetail />) : <Navigate to="/" />} 
              />
              <Route 
                path="/edit-summary-detail/:id" 
                element={isSignedIn ? renderCard("Edit Summary Detail", <EditDataSummaryDetail />) : <Navigate to="/" />} 
              />
              <Route 
                path="/data-summary-detail/:id" 
                element={isSignedIn ? renderCard("Show Summary Detail", <ShowDataSummaryDetail />) : <Navigate to="/" />} 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
      {showPinPage && <Navigate to="/pin" />}
    </Router>
  );
}

export default App;
