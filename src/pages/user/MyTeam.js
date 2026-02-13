import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeam } from '../../redux/slices/userSlice';
import DashboardLayout from '../../components/DashboardLayout';
import './MyTeam.css';

const MyTeam = () => {
  const dispatch = useDispatch();
  const { team } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getTeam());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="my-team-container">
        <h1>My Direct Referrals</h1>
        
        {team.length === 0 ? (
          <p>No direct referrals yet</p>
        ) : (
          <div className="team-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Referral Code</th>
                  <th>Total Investment</th>
                  <th>Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {team.map((member) => (
                  <tr key={member._id}>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.referralCode}</td>
                    <td>₹{member.totalInvestment}</td>
                    <td>{new Date(member.createdAt).toLocaleDateString()}</td>
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

export default MyTeam;
