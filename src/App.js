import React, { useEffect, useState } from "react";
import Papa from "papaparse";

function App() {
  const [table1, setTable1] = useState([]);
  const [table2, setTable2] = useState({ Alpha: 0, Beta: 0, Charlie: 0 });

  useEffect(() => {
    Papa.parse("/Table_Input.csv", {
      header: true,
      download: true,
      complete: (results) => {
        const data = results.data;
        setTable1(data);

        const valueMap = {};
        data.forEach((row) => {
          valueMap[row["Index #"]] = parseInt(row["Value"]);
        });

        // Compute Table 2
        const A5 = valueMap["A5"] || 0;
        const A20 = valueMap["A20"] || 0;
        const A15 = valueMap["A15"] || 0;
        const A7 = valueMap["A7"] || 1;
        const A13 = valueMap["A13"] || 0;
        const A12 = valueMap["A12"] || 0;

        setTable2({
          Alpha: A5 + A20,
          Beta: (A15 / A7).toFixed(2),
          Charlie: A13 * A12,
        });
      },
    });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Table 1</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Index #</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {table1.map((row, idx) => (
            <tr key={idx}>
              <td>{row["Index #"]}</td>
              <td>{row["Value"]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: "40px" }}>Table 2</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(table2).map(([key, val]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
