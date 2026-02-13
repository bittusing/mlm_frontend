import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamTree } from '../../redux/slices/userSlice';
import DashboardLayout from '../../components/DashboardLayout';
import * as d3 from 'd3';
import './TeamTree.css';

const TeamTree = () => {
  const dispatch = useDispatch();
  const { teamTree } = useSelector((state) => state.user);
  const svgRef = useRef();
  const [viewMode, setViewMode] = useState('d3'); // 'd3' or 'simple'

  useEffect(() => {
    dispatch(getTeamTree());
  }, [dispatch]);

  const renderD3Tree = useCallback(() => {
    if (!teamTree) return;

    // Clear previous SVG
    d3.select(svgRef.current).selectAll('*').remove();

    const width = 1200;
    const height = 800;
    const margin = { top: 20, right: 120, bottom: 20, left: 120 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const treeLayout = d3.tree()
      .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

    const root = d3.hierarchy(teamTree, d => d.children);
    treeLayout(root);

    // Add links
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

    // Add nodes
    const nodes = svg.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    // Add circles
    nodes.append('circle')
      .attr('r', 8)
      .style('fill', d => d.children ? '#667eea' : '#27ae60')
      .style('stroke', '#fff')
      .style('stroke-width', 3);

    // Add labels
    nodes.append('text')
      .attr('dy', -15)
      .attr('x', d => d.children ? -12 : 12)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#2c3e50')
      .text(d => d.data.name);

    // Add investment info
    nodes.append('text')
      .attr('dy', 25)
      .attr('x', d => d.children ? -12 : 12)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .style('font-size', '10px')
      .style('fill', '#7f8c8d')
      .text(d => `₹${d.data.totalInvestment || 0}`);

    // Add direct count
    nodes.append('text')
      .attr('dy', 40)
      .attr('x', d => d.children ? -12 : 12)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .style('font-size', '10px')
      .style('fill', '#3498db')
      .text(d => `Direct: ${d.data.directCount || 0}`);
  }, [teamTree]);

  useEffect(() => {
    if (teamTree && viewMode === 'd3') {
      renderD3Tree();
    }
  }, [teamTree, viewMode, renderD3Tree]);

  const TreeNodeSimple = ({ node, level = 0 }) => {
    if (!node) return null;

    return (
      <div className="tree-node-simple" style={{ marginLeft: level * 40 }}>
        <div className={`node-card-simple ${node.children && node.children.length > 0 ? 'has-children' : ''}`}>
          <div className="node-header">
            <h4>{node.name}</h4>
            <span className="node-badge">{node.children?.length || 0} Direct</span>
          </div>
          <div className="node-details">
            <p><strong>Email:</strong> {node.email}</p>
            <p><strong>Code:</strong> {node.referralCode}</p>
            <p><strong>Investment:</strong> ₹{node.totalInvestment || 0}</p>
            <p><strong>Joined:</strong> {new Date(node.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        {node.children && node.children.length > 0 && (
          <div className="tree-children-simple">
            {node.children.map((child) => (
              <TreeNodeSimple key={child._id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="team-tree-container">
        <div className="tree-header">
          <h1>Team Tree Visualization</h1>
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'd3' ? 'active' : ''}`}
              onClick={() => setViewMode('d3')}
            >
              D3 Tree View
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'simple' ? 'active' : ''}`}
              onClick={() => setViewMode('simple')}
            >
              List View
            </button>
          </div>
        </div>

        {!teamTree ? (
          <div className="loading-tree">Loading team tree...</div>
        ) : (
          <>
            {viewMode === 'd3' ? (
              <div className="d3-tree-container">
                <div className="tree-legend">
                  <div className="legend-item">
                    <div className="legend-circle parent"></div>
                    <span>Has Team Members</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-circle leaf"></div>
                    <span>No Team Members</span>
                  </div>
                </div>
                <svg ref={svgRef} className="d3-tree-svg"></svg>
              </div>
            ) : (
              <div className="simple-tree-view">
                <TreeNodeSimple node={teamTree} />
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeamTree;
