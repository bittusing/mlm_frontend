import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import './Reports.css';

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="reports">
        <h1>Reports</h1>
        
        <div className="report-cards">
          <div className="report-card">
            <h3>Investment Report</h3>
            <p>View monthly investment trends</p>
            <button className="btn btn-primary">View Report</button>
          </div>
          
          <div className="report-card">
            <h3>Income Report</h3>
            <p>Breakdown of all income types</p>
            <button className="btn btn-primary">View Report</button>
          </div>
          
          <div className="report-card">
            <h3>Withdrawal Report</h3>
            <p>Track withdrawal statistics</p>
            <button className="btn btn-primary">View Report</button>
          </div>
          
          <div className="report-card">
            <h3>User Growth</h3>
            <p>User registration trends</p>
            <button className="btn btn-primary">View Report</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
