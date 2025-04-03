import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${name}. We'll contact you soon.`);
  };

  return (
    <section style={styles.contact}>
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

const styles = {
  contact: {
    background: "#f4f4f4",
    padding: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "auto",
  },
};

export default ContactForm;
