import React from 'react';
import Navbar from '../../components/Navbar';
import './About.css';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <h1>About Us</h1>
        <div className="about-content">
          <p>
            Welcome to our MLM platform. We provide a transparent and secure environment
            for network marketing professionals to grow their business.
          </p>
          <p>
            Our platform offers competitive ROI, multi-level commission structure, and
            real-time tracking of your earnings and team performance.
          </p>
          <h2>Our Mission</h2>
          <p>
            To empower individuals to achieve financial freedom through network marketing
            with complete transparency and security.
          </p>
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Transparent commission structure</li>
            <li>Secure payment processing</li>
            <li>Real-time dashboard and analytics</li>
            <li>24/7 customer support</li>
            <li>Mobile-friendly platform</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
