import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './Home.css';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <section className="hero">
          <div className="hero-content">
            <h1>Build Your Financial Freedom</h1>
            <p className="hero-subtitle">Join thousands of successful entrepreneurs earning passive income through our proven MLM system</p>
            <div className="hero-stats">
              <div className="hero-stat">
                <h3>10,000+</h3>
                <p>Active Members</p>
              </div>
              <div className="hero-stat">
                <h3>₹50Cr+</h3>
                <p>Paid to Members</p>
              </div>
              <div className="hero-stat">
                <h3>15%</h3>
                <p>Monthly ROI</p>
              </div>
            </div>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary btn-large">Start Earning Today</Link>
              <Link to="/plans" className="btn btn-secondary btn-large">View Investment Plans</Link>
            </div>
          </div>
        </section>

        <section className="features">
          <h2>Why Choose Our Platform?</h2>
          <p className="section-subtitle">Experience the best MLM platform with proven results</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>High ROI Returns</h3>
              <p>Earn up to 15% monthly returns on your investment with guaranteed payouts</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Direct Referral Bonus</h3>
              <p>Get instant 10% commission on every direct referral's investment</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Multi-Level Income</h3>
              <p>Earn from 3 levels deep - Level 1: 5%, Level 2: 3%, Level 3: 2%</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>100% Secure</h3>
              <p>Bank-grade security with encrypted transactions and data protection</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Real-Time Dashboard</h3>
              <p>Track your earnings, team, and investments in real-time</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Withdrawals</h3>
              <p>Quick withdrawal processing directly to your bank account</p>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Register</h3>
              <p>Sign up with a referral code and create your account</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Choose Plan</h3>
              <p>Select an investment plan that fits your budget</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Build Team</h3>
              <p>Refer others and grow your network</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Earn Income</h3>
              <p>Get ROI and commissions monthly</p>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>Success Stories</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">"I've been earning ₹50,000+ monthly through this platform. The ROI is consistent and withdrawals are instant!"</p>
              <p className="testimonial-author">Rajesh Kumar</p>
              <p className="testimonial-role">Diamond Member</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"Best MLM platform I've ever joined. Transparent system and great support team. Highly recommended!"</p>
              <p className="testimonial-author">Priya Sharma</p>
              <p className="testimonial-role">Gold Member</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"Started with ₹10,000 and now my team has 500+ members. This changed my life completely!"</p>
              <p className="testimonial-author">Amit Patel</p>
              <p className="testimonial-role">Platinum Member</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of successful members earning passive income</p>
          <Link to="/register" className="btn btn-primary btn-large">Join Now - It's Free!</Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
