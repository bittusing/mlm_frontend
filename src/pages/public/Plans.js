import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './Plans.css';

const Plans = () => {
  const plans = [
    { name: 'Basic', amount: 10000, roi: 10, duration: 12, popular: false },
    { name: 'Silver', amount: 20000, roi: 12, duration: 12, popular: false },
    { name: 'Gold', amount: 30000, roi: 15, duration: 12, popular: true },
    { name: 'Platinum', amount: 50000, roi: 18, duration: 12, popular: false }
  ];

  return (
    <div>
      <Navbar />
      <div className="plans-page-container">
        <h1>WealthsLink Investment Plans</h1>
        <p className="plans-subtitle">Choose the plan that suits your investment goals and start building your wealth today</p>
        
        <div className="plans-grid">
          {plans.map((plan, index) => (
            <div key={index} className="plan-card">
              {plan.popular && <div className="plan-popular">Most Popular</div>}
              <h3>{plan.name}</h3>
              <div className="plan-price">₹{plan.amount.toLocaleString()}</div>
              <div className="plan-roi-badge">
                <span>Monthly ROI</span>
                <strong>{plan.roi}%</strong>
              </div>
              <ul className="plan-features">
                <li>✓ Duration: {plan.duration} months</li>
                <li>✓ Monthly Return: ₹{((plan.amount * plan.roi) / 100).toLocaleString()}</li>
                <li>✓ Total Return: ₹{((plan.amount * plan.roi * plan.duration) / 100).toLocaleString()}</li>
                <li>✓ Direct Referral Commission: 10%</li>
                <li>✓ Level Income: Up to 3 Levels</li>
                <li>✓ Instant Withdrawal</li>
              </ul>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;
