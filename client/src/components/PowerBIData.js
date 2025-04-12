import React, { useEffect, useState } from "react";
import axios from "axios";

const PowerBIData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Adjust the URL if necessary. If you set up a proxy in your client package.json,
        // you might use a relative URL like '/powerbi/data'.
        const result = await axios.get("http://localhost:5000/powerbi/data");
        setData(result.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading data...</div>;

  return (
    <div>
      <h2>Power BI Visualization Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* Here you can integrate your charting library (e.g., Chart.js, Recharts) to visualize the data */}
    </div>
  );
};

export default PowerBIData;
