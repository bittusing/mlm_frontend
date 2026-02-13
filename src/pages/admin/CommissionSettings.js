import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import './CommissionSettings.css';

const CommissionSettings = () => {
  const [settings, setSettings] = useState({
    directReferralPercentage: 10,
    levelCommissions: [
      { level: 1, percentage: 5 },
      { level: 2, percentage: 3 },
      { level: 3, percentage: 2 }
    ],
    matchingBonusPercentage: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Commission settings update functionality to be implemented');
  };

  return (
    <DashboardLayout>
      <div className="commission-settings">
        <h1>Commission Settings</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Direct Referral Commission (%)</label>
            <input
              type="number"
              value={settings.directReferralPercentage}
              onChange={(e) => setSettings({ ...settings, directReferralPercentage: parseFloat(e.target.value) })}
            />
          </div>

          <h3>Level Commissions</h3>
          {settings.levelCommissions.map((level, index) => (
            <div key={index} className="form-group">
              <label>Level {level.level} (%)</label>
              <input
                type="number"
                value={level.percentage}
                onChange={(e) => {
                  const newLevels = [...settings.levelCommissions];
                  newLevels[index].percentage = parseFloat(e.target.value);
                  setSettings({ ...settings, levelCommissions: newLevels });
                }}
              />
            </div>
          ))}

          <div className="form-group">
            <label>Matching Bonus (%)</label>
            <input
              type="number"
              value={settings.matchingBonusPercentage}
              onChange={(e) => setSettings({ ...settings, matchingBonusPercentage: parseFloat(e.target.value) })}
            />
          </div>

          <button type="submit" className="btn btn-primary">Update Settings</button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CommissionSettings;
