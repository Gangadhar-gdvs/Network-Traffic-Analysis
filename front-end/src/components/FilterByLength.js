import React, { useState } from 'react';
import './FilterByLength.css';

const FilterByLength = ({ onFilter }) => {
  const [length, setLength] = useState('');

  const handleFilter = () => {
    onFilter(length);
  };

  return (
    <div className="filter-by-length">
      <h2>Filter by Packet Length</h2>
      <input
        type="text"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        placeholder="Enter Packet Length"
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default FilterByLength;
