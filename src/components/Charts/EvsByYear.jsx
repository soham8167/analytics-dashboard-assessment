import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EVsByYear = ({ data }) => {
  return (
    <div className="dashboard-card">
      <h3 className="dashboard-title">Electric Vehicle Registrations by Year</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              angle={-45}
              textAnchor="end"
              height={60}
              tickMargin={10}
            />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
            <Bar dataKey="count" fill="#3B82F6" name="Vehicles" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EVsByYear;