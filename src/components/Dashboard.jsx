import React, { useState, useEffect } from 'react';
import EVsByYear from './Charts/EvsByYear';
import MakeDistribution from './Charts/MakeDistribution';
import ModelDistribution from './Charts/ModelDistribution';
import EVsByCounty from './Charts/EVsByCounty';
import BatteryRangeChart from './Charts/BatteryRangeChart';
import DataTable from './DataTable';
import { 
  loadEVData, 
  getEVsByYear, 
  getMakeDistribution, 
  getModelDistribution, 
  getEVsByCounty,
  getBatteryRangeDistribution,
  getEVCounts 
} from '../utils/dataProcessing';

const Dashboard = () => {
  const [evData, setEVData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMake, setSelectedMake] = useState(null);
  const [evCounts, setEVCounts] = useState({
    totalEVs: 0,
    bevCount: 0,
    phevCount: 0,
    avgRange: 0
  });
  
  // Processed data states
  const [yearData, setYearData] = useState([]);
  const [makeData, setMakeData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [countyData, setCountyData] = useState([]);
  const [rangeData, setRangeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await loadEVData();
      setEVData(data);
      
      // Process data
      setYearData(getEVsByYear(data));
      setMakeData(getMakeDistribution(data));
      setModelData(getModelDistribution(data, selectedMake));
      setCountyData(getEVsByCounty(data));
      setRangeData(getBatteryRangeDistribution(data));
      setEVCounts(getEVCounts(data));
      
      setIsLoading(false);
    };
    
    fetchData();
  }, []);
  
  useEffect(() => {
    if (evData.length > 0) {
      setModelData(getModelDistribution(evData, selectedMake));
    }
  }, [selectedMake, evData]);
  
  const handleMakeSelect = (make) => {
    setSelectedMake(make === selectedMake ? null : make);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading EV data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Key metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stats-card">
          <div className="stats-value text-blue-600">{evCounts.totalEVs.toLocaleString()}</div>
          <div className="stats-label">Total EVs</div>
        </div>
        <div className="stats-card">
          <div className="stats-value text-green-600">{evCounts.bevCount.toLocaleString()}</div>
          <div className="stats-label">Battery Electric Vehicles</div>
        </div>
        <div className="stats-card">
          <div className="stats-value text-purple-600">{evCounts.phevCount.toLocaleString()}</div>
          <div className="stats-label">Plug-in Hybrid Vehicles</div>
        </div>
        <div className="stats-card">
          <div className="stats-value text-orange-600">{evCounts.avgRange} miles</div>
          <div className="stats-label">Average Electric Range</div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EVsByYear data={yearData} />
        <MakeDistribution 
          data={makeData}
          onMakeSelect={handleMakeSelect}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ModelDistribution 
          data={modelData}
          selectedMake={selectedMake} 
        />
        <EVsByCounty data={countyData} />
      </div>
      
      <div className="mb-6">
        <BatteryRangeChart data={rangeData} />
      </div>
      
      {/* Make selection */}
      <div className="mb-6">
        <div className="dashboard-card">
          <h3 className="dashboard-title">Filter by Make</h3>
          <div className="flex flex-wrap gap-2">
            {makeData.map((item) => (
              <button
                key={item.make}
                className={`px-3 py-1 rounded text-sm ${
                  selectedMake === item.make 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                onClick={() => handleMakeSelect(item.make)}
              >
                {item.make}
              </button>
            ))}
            {selectedMake && (
              <button
                className="px-3 py-1 rounded text-sm bg-red-500 text-white hover:bg-red-600"
                onClick={() => setSelectedMake(null)}
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Data table */}
      <DataTable data={evData} />
    </div>
  );
};

export default Dashboard;