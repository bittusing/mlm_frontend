import React from 'react';
import Navbar from '../../components/Navbar';
import './About.css';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <h1>About WealthsLink</h1>
        <div className="about-content">
          <div className="about-logo">💎</div>
          <p>
            Welcome to <strong>WealthsLink</strong> - Your trusted partner in building financial freedom. 
            We provide a transparent and secure environment for network marketing professionals to grow their business.
          </p>
          <p>
            Our platform offers competitive ROI, multi-level commission structure, and
            real-time tracking of your earnings and team performance. With WealthsLink, you're not just 
            investing in a platform, you're investing in your future.
          </p>
          <h2>Our Mission</h2>
          <p>
            To empower individuals to achieve financial freedom through smart investment and network marketing
            with complete transparency, security, and support.
          </p>
          <h2>Why Choose WealthsLink?</h2>
          <ul>
            <li>✅ Transparent commission structure</li>
            <li>✅ Secure payment processing with bank-grade encryption</li>
            <li>✅ Real-time dashboard and analytics</li>
            <li>✅ 24/7 customer support</li>
            <li>✅ Mobile-friendly platform</li>
            <li>✅ Proven track record with 10,000+ satisfied members</li>
            <li>✅ Instant commission payouts</li>
            <li>✅ Professional training and support</li>
          </ul>
          <h2>Our Values</h2>
          <p>
            <strong>Integrity:</strong> We believe in honest and transparent business practices.<br/>
            <strong>Innovation:</strong> Constantly improving our platform for better user experience.<br/>
            <strong>Community:</strong> Building a supportive network of successful entrepreneurs.<br/>
            <strong>Excellence:</strong> Committed to delivering the best service to our members.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
