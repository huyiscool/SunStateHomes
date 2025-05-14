// src/components/HeroSectionTwoSided.jsx
import React, { useState } from 'react';
import './HeroSectionTwoSided.css'; // We'll create this CSS file for styling

// Optional: Import icons if you like
// import { FaSearch, FaHome, FaCalculator } from 'react-icons/fa';

const HeroSectionTwoSided = ({
  backgroundImage, // A general background for the whole section
  onSearchProperties, // Callback for the buy-side search
  onGetValuation,     // Callback for the sell-side valuation
}) => {
  // State for Buy Side Search
  const [buyLocation, setBuyLocation] = useState('');
  const [buyPropertyType, setBuyPropertyType] = useState('');
  const [buyPriceRange, setBuyPriceRange] = useState('');

  // State for Sell Side Quick Valuation
  const [sellAddress, setSellAddress] = useState('');

  const handleBuySearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchProperties) {
      onSearchProperties({
        location: buyLocation,
        propertyType: buyPropertyType,
        priceRange: buyPriceRange,
      });
    }
    console.log('Buy Search:', { buyLocation, buyPropertyType, buyPriceRange });
  };

  const handleSellValuationSubmit = (e) => {
    e.preventDefault();
    if (onGetValuation) {
      onGetValuation({
        address: sellAddress
      });
    }
    console.log('Sell Valuation for:', sellAddress);
  };

  return (
    <div className="hero-section-two-sided" style={{ backgroundImage: `url(${backgroundImage || "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"})` }}>
      <div className="hero-overlay-two-sided"></div>
      <div className="hero-container-two-sided">
        {/* Buying Section */}
        <div className="hero-panel hero-panel-buy">
          <div className="panel-content">
            {/* Optional Icon: <FaSearch size={40} className="panel-icon" /> */}
            <h2 className="panel-headline">Looking to Buy?</h2>
            <p className="panel-subheadline">Find your perfect home with our advanced search tools and expert guidance.</p>
            <form className="panel-form" onSubmit={handleBuySearchSubmit}>
              <div className="form-group">
                <label htmlFor="buyLocation">Location</label>
                <input
                  type="text"
                  id="buyLocation"
                  value={buyLocation}
                  onChange={(e) => setBuyLocation(e.target.value)}
                  placeholder="City, Neighborhood, Zip"
                />
              </div>
              <div className="form-group">
                <label htmlFor="buyPropertyType">Property Type</label>
                <select id="buyPropertyType" value={buyPropertyType} onChange={(e) => setBuyPropertyType(e.target.value)}>
                  <option value="">All Types</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                  {/* Add more */}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="buyPriceRange">Price Range</label>
                <select id="buyPriceRange" value={buyPriceRange} onChange={(e) => setBuyPriceRange(e.target.value)}>
                  <option value="">Any Price</option>
                  <option value="0-300000">$0 - $300,000</option>
                  <option value="300000-600000">$300,000 - $600,000</option>
                  {/* Add more */}
                </select>
              </div>
              <button type="submit" className="panel-cta-button">Search Homes</button>
            </form>
          </div>
        </div>

        {/* Selling Section */}
        <div className="hero-panel hero-panel-sell">
          <div className="panel-content">
            {/* Optional Icon: <FaHome size={40} className="panel-icon" /> or <FaCalculator /> */}
            <h2 className="panel-headline">Ready to Sell?</h2>
            <p className="panel-subheadline">Get a free, no-obligation valuation and discover your home's true market potential.</p>
            <form className="panel-form" onSubmit={handleSellValuationSubmit}>
              <div className="form-group">
                <label htmlFor="sellAddress">Enter Your Property Address</label>
                <input
                  type="text"
                  id="sellAddress"
                  value={sellAddress}
                  onChange={(e) => setSellAddress(e.target.value)}
                  placeholder="E.g., 123 Main St, Anytown"
                />
              </div>
              <button type="submit" className="panel-cta-button">Get My Free Valuation</button>
            </form>
            <p className="panel-alternative-cta">Or <a href="/sell-with-us">Learn More About Selling</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionTwoSided;