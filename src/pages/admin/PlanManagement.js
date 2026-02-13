import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPlan } from '../../redux/slices/adminSlice';
import DashboardLayout from '../../components/DashboardLayout';
import axios from 'axios';
import API_URL from '../../config/api';
import './PlanManagement.css';

const PlanManagement = () => {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    roiPercentage: '',
    duration: '',
    description: ''
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${API_URL}/plans`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlans(data.plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createPlan({
      ...formData,
      amount: parseFloat(formData.amount),
      roiPercentage: parseFloat(formData.roiPercentage),
      duration: parseInt(formData.duration)
    }));
    setFormData({ name: '', amount: '', roiPercentage: '', duration: '', description: '' });
    fetchPlans();
  };

  const togglePlanStatus = async (planId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/admin/plans/${planId}`, 
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPlans();
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="plan-management">
        <h1>Plan Management</h1>
        
        <div className="create-plan-form">
          <h2>Create New Plan</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Plan Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Amount (₹)</label>
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>ROI Percentage (%)</label>
              <input type="number" name="roiPercentage" value={formData.roiPercentage} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Duration (Months)</label>
              <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Create Plan</button>
          </form>
        </div>

        <div className="existing-plans">
          <h2>All Plans</h2>
          <div className="plans-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>ROI %</th>
                  <th>Duration</th>
                  <th>Monthly Return</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan._id}>
                    <td>{plan.name}</td>
                    <td>₹{plan.amount}</td>
                    <td>{plan.roiPercentage}%</td>
                    <td>{plan.duration} months</td>
                    <td>₹{plan.monthlyReturn}</td>
                    <td>
                      <span className={`status ${plan.isActive ? 'active' : 'inactive'}`}>
                        {plan.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => togglePlanStatus(plan._id, plan.isActive)}
                        className={`btn ${plan.isActive ? 'btn-danger' : 'btn-success'}`}
                      >
                        {plan.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlanManagement;
