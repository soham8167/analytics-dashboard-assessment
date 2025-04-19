import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EVsByCounty = ({ data }) => {
  return (
    <div className="dashboard-card">
      <h3 className="dashboard-title">EV Distribution by County</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis 
              dataKey="county" 
              type="category" 
              width={80}
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
            <Bar dataKey="count" fill="#8B5CF6" name="Vehicles" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EVsByCounty;