import React, { useState } from 'react';
import './ContactForm.css';

const EMAIL_RE = /[^@\s]+@[^@\s]+\.[^@\s]+/;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    hp: '' // honeypot field for bots
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill in all required fields (Name, Email, Message).');
      return;
    }
    if (!EMAIL_RE.test(formData.email)) {
      setStatus('Please enter a valid email address.');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to send');

      setStatus('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '', hp: '' });
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Get In Touch</h2>
      <p>Have a question or want to discuss a property? Fill out the form below.</p>
      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        {/* Honeypot field (hidden from users) */}
        <div className="hp-wrap" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="hp" value={formData.hp} onChange={handleChange} tabIndex="-1" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="name">Full Name <span className="required-asterisk">*</span></label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g., Jane Doe" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address <span className="required-asterisk">*</span></label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="e.g., you@example.com" />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g., Property Inquiry" />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message <span className="required-asterisk">*</span></label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="6" required placeholder="Your message here..."></textarea>
        </div>

        <button type="submit" className="submit-button" disabled={status === 'Sending...'}>
          {status === 'Sending...' ? 'Sending...' : 'Send Message'}
        </button>

        {status && (
          <p className={`form-status ${
            status.includes('successfully') ? 'success' :
            (status.includes('Failed') || status.includes('Please')) ? 'error' : ''
          }`}>{status}</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;