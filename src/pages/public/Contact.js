import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Contact form submission functionality to be implemented');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <h1>Contact WealthsLink</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch with WealthsLink</h3>
            <p>Have questions? We'd love to hear from you. Our support team is available 24/7.</p>
            <div className="contact-details">
              <p><strong>📧 Email:</strong> support@wealthslink.com</p>
              <p><strong>📱 Phone:</strong> +91 1800-123-4567 (Toll Free)</p>
              <p><strong>📍 Address:</strong> WealthsLink Corporate Office<br/>
              123 Business Tower, Financial District<br/>
              Mumbai, Maharashtra 400001, India</p>
              <p><strong>⏰ Support Hours:</strong> 24/7 Available</p>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
