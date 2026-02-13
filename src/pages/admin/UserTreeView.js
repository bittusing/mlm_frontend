import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as d3 from 'd3';
import { hierarchy, tree } from 'd3-hierarchy';
import { FaArrowLeft, FaUser, FaUsers } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import API_URL from '../../config/api';
import './UserTreeView.css';

const UserTreeView = () => {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName || 'User';
  
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('tree'); // 'tree' or 'list'
  const [stats, setStats] = useState({
    totalMembers: 0,
    directReferrals: 0,
    totalInvestment: 0
  });

  useEffect(() => {
    fetchUserTree();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchUserTree = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/users/${userId}/tree`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setTreeData(response.data.tree);
        calculateStats(response.data.tree);
      }
    } catch (error) {
      console.error('Error fetching tree:', error);
      alert('Failed to load user tree');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (tree) => {
    let totalMembers = 0;
    let directReferrals = tree.children ? tree.children.length : 0;
    let totalInvestment = tree.totalInvestment || 0;

    const countMembers = (node) => {
      totalMembers++;
      totalInvestment += node.totalInvestment || 0;
      if (node.children) {
        node.children.forEach(countMembers);
      }
    };

    countMembers(tree);
    setStats({ totalMembers, directReferrals, totalInvestment });
  };

  const renderD3Tree = useCallback(() => {
    if (!treeData) return;

    // Clear previous SVG
    d3.select('#tree-container').selectAll('*').remove();

    const width = 1200;
    const height = 800;
    const margin = { top: 20, right: 120, bottom: 20, left: 120 };

    const svg = d3.select('#tree-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const root = hierarchy(treeData);
    const treeLayout = tree().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
    treeLayout(root);

    // Links
    svg.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x))
      .style('fill', 'none')
      .style('stroke', '#667eea')
      .style('stroke-width', 2);

    // Nodes
    const nodes = svg.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    nodes.append('circle')
      .attr('r', 8)
      .style('fill', d => d.children ? '#667eea' : '#27ae60')
      .style('stroke', '#fff')
      .style('stroke-width', 2);

    nodes.append('text')
      .attr('dy', -15)
      .attr('x', 0)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text(d => d.data.name);

    nodes.append('text')
      .attr('dy', 25)
      .attr('x', 0)
      .style('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('fill', '#666')
      .text(d => `₹${d.data.totalInvestment || 0}`);

    nodes.append('text')
      .attr('dy', 38)
      .attr('x', 0)
      .style('text-anchor', 'middle')
      .style('font-size', '9px')
      .style('fill', '#999')
      .text(d => d.data.children ? `(${d.data.children.length})` : '');

  }, [treeData]);

  useEffect(() => {
    if (viewMode === 'tree' && treeData) {
      renderD3Tree();
    }
  }, [viewMode, treeData, renderD3Tree]);

  const renderListView = (node, level = 0) => {
    return (
      <div key={node._id} style={{ marginLeft: `${level * 30}px` }} className="tree-list-item">
        <div className="tree-list-content">
          <FaUser className="user-icon" />
          <div className="user-info">
            <strong>{node.name}</strong>
            <span className="user-details">
              Investment: ₹{node.totalInvestment || 0} | 
              Direct: {node.children ? node.children.length : 0}
            </span>
          </div>
        </div>
        {node.children && node.children.map(child => renderListView(child, level + 1))}
      </div>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading">Loading tree...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="user-tree-view">
        <div className="tree-header">
          <button onClick={() => navigate('/admin/users')} className="btn-back">
            <FaArrowLeft /> Back to Users
          </button>
          <h1>Team Tree - {userName}</h1>
        </div>

        <div className="tree-stats">
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <div>
              <h3>{stats.totalMembers}</h3>
              <p>Total Members</p>
            </div>
          </div>
          <div className="stat-card">
            <FaUser className="stat-icon" />
            <div>
              <h3>{stats.directReferrals}</h3>
              <p>Direct Referrals</p>
            </div>
          </div>
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <div>
              <h3>₹{stats.totalInvestment.toLocaleString()}</h3>
              <p>Total Investment</p>
            </div>
          </div>
        </div>

        <div className="view-toggle">
          <button 
            className={viewMode === 'tree' ? 'active' : ''} 
            onClick={() => setViewMode('tree')}
          >
            Tree View
          </button>
          <button 
            className={viewMode === 'list' ? 'active' : ''} 
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
        </div>

        {viewMode === 'tree' ? (
          <div className="tree-container-wrapper">
            <div id="tree-container"></div>
          </div>
        ) : (
          <div className="tree-list-view">
            {treeData && renderListView(treeData)}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserTreeView;
