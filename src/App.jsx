// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'; // Ensure Outlet is imported if using layout routes

import Header from './components/Header';
import HeroSectionTwoSided from './components/HeroSectionTwoSided'; // Or your preferred Hero
// import RentPage from './pages/RentPage';
// import NeighborhoodsPage from './pages/NeighborhoodsPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';


const headerBgImage = "/BusinessCard.jpg"; 

// Example Page Components (replace with your actual page components)
const HomePageContent = () => (
  <HeroSectionTwoSided
    onSearchProperties={(criteria) => console.log("Search Buy:", criteria)}
    onGetValuation={(data) => console.log("Valuation Sell:", data)}
  />
);
const RentPage = () => <div style={{ padding: '20px' }}><h1>Rent a Property</h1><p>Content for renting properties...</p></div>;
const NeighborhoodsPage = () => <div style={{ padding: '20px' }}><h1>Explore Neighborhoods</h1><p>Details about various neighborhoods...</p></div>;
//const AboutPage = () => <div style={{ padding: '20px' }}><h1>About Us</h1><p>Information about our company...</p></div>;



// Optional: Layout Component
const MainLayout = () => {
  // Define custom links if needed, otherwise Header uses its defaults
  // const customNavLinks = [
  //   { to: "/", label: "Home", end: true },
  //   { to: "/all-rentals", label: "All Rentals" },
  // ];

  return (
    <>
      <Header
        logoSrc="./Logo.png"
        siteTitle="Bay Area Realty"
        backgroundImage={headerBgImage}
        // navLinks={customNavLinks} // Uncomment to use custom links
      />
      <main>
        <Outlet /> {/* Child routes will render here */}
      </main>
      {/* <Footer /> */}
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}> {/* All routes under MainLayout will have Header */}
          <Route path="/" element={<HomePageContent />} />
          <Route path="/rent" element={<RentPage />} />
          <Route path="/neighborhoods" element={<NeighborhoodsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Add other routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;