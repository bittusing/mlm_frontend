import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPlans } from '../../redux/slices/userSlice';
import DashboardLayout from '../../components/DashboardLayout';
import './MyPlans.css';

const MyPlans = () => {
  const dispatch = useDispatch();
  const { myPlans } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMyPlans());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="my-plans-container">
        <h1>My Plans</h1>
        {myPlans.length === 0 ? (
          <p>No plans purchased yet</p>
        ) : (
          <div className="plans-table">
            <table>
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>ROI %</th>
                  <th>Monthly Return</th>
                  <th>Duration</th>
                  <th>Start Date</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myPlans.map((plan) => (
                  <tr key={plan._id}>
                    <td>{plan.planId?.name}</td>
                    <td>₹{plan.amount}</td>
                    <td>{plan.roiPercentage}%</td>
                    <td>₹{plan.monthlyReturn}</td>
                    <td>{plan.duration} months</td>
                    <td>{new Date(plan.startDate).toLocaleDateString()}</td>
                    <td>{new Date(plan.expiryDate).toLocaleDateString()}</td>
                    <td><span className={`status ${plan.status.toLowerCase()}`}>{plan.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyPlans;
