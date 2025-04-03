import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>Welcome to Luxury Realty</h1>
      <p>Find Your Dream Home Today</p>
    </header>
  );
};

const styles = {
  header: {
    background: "#007BFF",
    color: "white",
    padding: "20px",
    textAlign: "center",
  },
};

export default Header;