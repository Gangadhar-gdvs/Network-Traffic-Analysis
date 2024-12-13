import React from 'react';
import './AnalysisResult.css';

const AnalysisResult = ({ result }) => {
  return (
    <div className="analysis-result">
      <h2>Analysis Result</h2>
      <div className="summary">
        <table className="result-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Packets</td>
              <td>{result.totalPackets}</td>
            </tr>
            <tr>
              <td>Total Length</td>
              <td>{result.totalLength}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="detail">
        <h3>Protocols</h3>
        <table className="result-table">
          <thead>
            <tr>
              <th>Protocol</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(result.proto).map(([proto, count]) => (
              <tr key={proto}>
                <td>{`Protocol ${proto}`}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Source IPs</h3>
        <table className="result-table">
          <thead>
            <tr>
              <th>IP Address</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(result.src).map(([ip, count]) => (
              <tr key={ip}>
                <td>{ip}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Destination IPs</h3>
        <table className="result-table">
          <thead>
            <tr>
              <th>IP Address</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(result.dst).map(([ip, count]) => (
              <tr key={ip}>
                <td>{ip}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalysisResult;
