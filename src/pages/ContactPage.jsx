// src/pages/ContactPage.jsx
import React from 'react';
import ContactForm from '../components/ContactForm'; // Adjust path if needed
import './ContactPage.css'; // Optional: for page-specific layout

const ContactPage = () => {
  const currentTimeInSanJose = new Date().toLocaleTimeString('en-US', {
    timeZone: 'America/Los_Angeles', // Correct IANA time zone for San Jose, CA (PDT/PST)
    hour: '2-digit',
    minute: '2-digit',
    // timeZoneName: 'short' // Optionally display PST/PDT
  });

  return (
    <div className="contact-page-layout">
      <header className="page-header">
        <h1>Contact Our Team</h1>
        <p>We're here to help with all your real estate needs.</p>
      </header>

      <ContactForm />

      <section className="additional-contact-info">
        <h2>Other Ways to Reach Us</h2>
        <p><strong>Phone:</strong> (408) 507-3929 (Current time in San Jose, CA: {currentTimeInSanJose})</p>
        <p><strong>Email:</strong> chaunguyenhomes@gmail.com</p>
        <p><strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM (Pacific Time)</p>
        <p><strong>Location:</strong> 123 Main Street, San Jose, CA, USA</p>
        {/* You can add a Google Maps embed here too */}
      </section>
    </div>
  );
};

export default ContactPage;