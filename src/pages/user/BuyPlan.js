import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans, purchasePlan } from '../../redux/slices/userSlice';
import DashboardLayout from '../../components/DashboardLayout';
import './BuyPlan.css';

const BuyPlan = () => {
  const dispatch = useDispatch();
  const { plans } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getPlans());
  }, [dispatch]);

  const handlePurchase = (planId) => {
    if (window.confirm('Are you sure you want to purchase this plan?')) {
      dispatch(purchasePlan(planId));
    }
  };

  return (
    <DashboardLayout>
      <div className="buy-plan-container">
        <h1>Available Investment Plans</h1>
        <p className="plans-subtitle">Choose the plan that suits your investment goals</p>
        
        {plans.length === 0 ? (
          <div className="no-plans-message">
            <p>No plans available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="plans-grid">
            {plans.map((plan) => (
              <div key={plan._id} className="plan-card">
                <div className="plan-badge">Popular</div>
                <h3>{plan.name}</h3>
                <div className="plan-amount">₹{plan.amount.toLocaleString()}</div>
                <div className="plan-roi">
                  <span className="roi-label">Monthly ROI</span>
                  <span className="roi-value">{plan.roiPercentage}%</span>
                </div>
                <ul className="plan-features">
                  <li>✓ Duration: {plan.duration} months</li>
                  <li>✓ Monthly Return: ₹{plan.monthlyReturn.toLocaleString()}</li>
                  <li>✓ Total Return: ₹{(plan.monthlyReturn * plan.duration).toLocaleString()}</li>
                  <li>✓ Direct Referral Commission</li>
                  <li>✓ Level Income Bonus</li>
                </ul>
                {plan.description && <p className="plan-description">{plan.description}</p>}
                <button onClick={() => handlePurchase(plan._id)} className="btn btn-primary btn-purchase">
                  Invest Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BuyPlan;
