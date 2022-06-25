import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";

// pages for this product
import Header from './views/partials/Header.js';
import Footer from './views/partials/Footer.js';
import LandingPage from "./views/pages/LandingPage.js";
import LoginPage from './views/pages/LoginPage.js';
import RegisterPage from './views/pages/RegisterPage.js';
import ProfilePage from './views/pages/ProfilePage.js';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Header />
      <div style={{ paddingTop: '20px', minHeight: '100px' }}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;