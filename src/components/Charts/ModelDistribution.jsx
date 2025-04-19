import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ModelDistribution = ({ data, selectedMake }) => {
  return (
    <div className="dashboard-card">
      <h3 className="dashboard-title">
        {selectedMake ? `Top ${selectedMake} Models` : 'Top EV Models'}
      </h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis 
              dataKey="model" 
              type="category" 
              width={80}
              tick={{fontSize: 12}}
            />
            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
            <Bar dataKey="count" fill="#10B981" name="Vehicles" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ModelDistribution;