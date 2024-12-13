import React, { useState } from 'react';
import './FilterByProtocol.css';

const FilterByProtocol = ({ onFilter }) => {
  const [protocol, setProtocol] = useState('');

  const handleFilter = () => {
    onFilter(protocol);
  };

  return (
    <div className="filter-by-protocol">
      <h2>Filter by Protocol</h2>
      <input
        type="text"
        value={protocol}
        onChange={(e) => setProtocol(e.target.value)}
        placeholder="Enter Protocol Number"
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default FilterByProtocol;
