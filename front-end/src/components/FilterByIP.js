import React, { useState } from 'react';
import './FilterByIP.css';

const FilterByIP = ({ onFilter }) => {
  const [ip, setIP] = useState('');

  const handleFilter = () => {
    onFilter(ip);
  };

  return (
    <div className="filter-by-ip">
      <h2>Filter by IP</h2>
      <input
        type="text"
        value={ip}
        onChange={(e) => setIP(e.target.value)}
        placeholder="Enter IP Address"
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default FilterByIP;
