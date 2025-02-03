import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "../css/contactus.module.css"; // Import CSS Module

const Contact = () => {
  const navigate = useNavigate(); // Initialize navigation function

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message sent successfully!");

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
    {/* Back to Home Button */}
      <button className={styles.backButton} onClick={() => navigate("/")}>
        Back to Home
      </button>
    <div className={styles.contactContainer}>
      

      <h2 className={styles.title}>Contact Us</h2>
      <p className={styles.description}>
        Have questions? We'd love to hear from you!
      </p>

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Send Message
        </button>
      </form>
    </div>
    </>
  );
};

export default Contact;
