import Papa from 'papaparse';

export const loadEVData = async () => {
  try {
    const response = await fetch('/data/ev_population_data.csv');
    const csvData = await response.text();
    
    const { data } = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });
    
    return data;
  } catch (error) {
    console.error('Error loading EV data:', error);
    return [];
  }
};

export const getEVsByYear = (data) => {
  const yearCounts = {};
  
  data.forEach(entry => {
    const modelYear = entry['Model Year'];
    if (modelYear && !isNaN(modelYear) && modelYear !== '') {
      if (yearCounts[modelYear]) {
        yearCounts[modelYear]++;
      } else {
        yearCounts[modelYear] = 1;
      }
    }
  });
  
  return Object.entries(yearCounts)
    .map(([year, count]) => ({ year: parseInt(year), count }))
    .filter(item => item.year >= 2010) // Focus on recent years
    .sort((a, b) => a.year - b.year);
};

export const getMakeDistribution = (data) => {
  const makeCounts = {};
  
  data.forEach(entry => {
    const make = entry['Make'];
    if (make && make !== '') {
      if (makeCounts[make]) {
        makeCounts[make]++;
      } else {
        makeCounts[make] = 1;
      }
    }
  });
  
  return Object.entries(makeCounts)
    .map(([make, count]) => ({ make, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 makes
};

export const getModelDistribution = (data, selectedMake = null) => {
  const filteredData = selectedMake 
    ? data.filter(entry => entry['Make'] === selectedMake)
    : data;
  
  const modelCounts = {};
  
  filteredData.forEach(entry => {
    const model = entry['Model'];
    if (model && model !== '') {
      if (modelCounts[model]) {
        modelCounts[model]++;
      } else {
        modelCounts[model] = 1;
      }
    }
  });
  
  return Object.entries(modelCounts)
    .map(([model, count]) => ({ model, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 models
};

export const getEVsByCounty = (data) => {
  const countyCounts = {};
  
  data.forEach(entry => {
    const county = entry['County'];
    if (county && county !== '') {
      if (countyCounts[county]) {
        countyCounts[county]++;
      } else {
        countyCounts[county] = 1;
      }
    }
  });
  
  return Object.entries(countyCounts)
    .map(([county, count]) => ({ county, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 counties
};

export const getBatteryRangeDistribution = (data) => {
  const ranges = {
    "0-100": 0,
    "101-200": 0,
    "201-300": 0,
    "301-400": 0,
    "400+": 0
  };
  
  data.forEach(entry => {
    const range = parseInt(entry['Electric Range']);
    if (!isNaN(range)) {
      if (range <= 100) {
        ranges["0-100"]++;
      } else if (range <= 200) {
        ranges["101-200"]++;
      } else if (range <= 300) {
        ranges["201-300"]++;
      } else if (range <= 400) {
        ranges["301-400"]++;
      } else {
        ranges["400+"]++;
      }
    }
  });
  
  return Object.entries(ranges).map(([range, count]) => ({ range, count }));
};

export const getEVCounts = (data) => {
  const totalEVs = data.length;
  
  // Count BEVs (Battery Electric Vehicles)
  const bevCount = data.filter(entry => 
    entry['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)'
  ).length;
  
  // Count PHEVs (Plug-in Hybrid Electric Vehicles)
  const phevCount = totalEVs - bevCount;
  
  // Calculate average electric range
  let totalRange = 0;
  let validRangeCount = 0;
  
  data.forEach(entry => {
    const range = parseFloat(entry['Electric Range']);
    if (!isNaN(range)) {
      totalRange += range;
      validRangeCount++;
    }
  });
  
  const avgRange = validRangeCount > 0 ? Math.round(totalRange / validRangeCount) : 0;
  
  return {
    totalEVs,
    bevCount,
    phevCount,
    avgRange
  };
};