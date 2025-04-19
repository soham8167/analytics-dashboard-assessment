import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BatteryRangeChart = ({ data }) => {
  return (
    <div className="dashboard-card">
      <h3 className="dashboard-title">Battery Range Distribution (miles)</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
            <Bar dataKey="count" fill="#F59E0B" name="Vehicles" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BatteryRangeChart;