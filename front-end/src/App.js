import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import AnalysisResult from './components/AnalysisResult';
import FilterByIP from './components/FilterByIP';
import FilterByProtocol from './components/FilterByProtocol';
import FilterByLength from './components/FilterByLength';
import Header from './components/Header';
import Charts from './components/Chart'; // Import the Charts component
import './App.css';

const App = () => {
  const [result, setResult] = useState(null);
  const [filteredResult, setFilteredResult] = useState(null);

  const handleUpload = (data) => {
    setResult(data);
    setFilteredResult(data);
  };

  const filterByIP = (ip) => {
    if (!result) return;
    const filtered = {
      ...result,
      src: Object.fromEntries(Object.entries(result.src).filter(([key]) => key === ip)),
      dst: Object.fromEntries(Object.entries(result.dst).filter(([key]) => key === ip)),
    };
    setFilteredResult(filtered);
  };

  const filterByProtocol = (protocol) => {
    if (!result) return;
    const filtered = {
      ...result,
      proto: Object.fromEntries(Object.entries(result.proto).filter(([key]) => key === protocol)),
    };
    setFilteredResult(filtered);
  };

  const filterByLength = (length) => {
    if (!result) return;
    const filtered = {
      ...result,
      totalLength: result.totalLength === parseInt(length, 10) ? result.totalLength : 0,
    };
    setFilteredResult(filtered);
  };

  return (
    <div className="App">
      <Header />
      <FileUpload onUpload={handleUpload} />
      <div className="filters">
        <FilterByIP onFilter={filterByIP} />
        <FilterByProtocol onFilter={filterByProtocol} />
        <FilterByLength onFilter={filterByLength} />
      </div>
      {filteredResult && <AnalysisResult result={filteredResult} />}
      {filteredResult && <Charts data={filteredResult} />} {/* Pass data to Charts */}
    </div>
  );
};

export default App;
