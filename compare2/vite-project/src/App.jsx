import { useState } from 'react';
import './App.css';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [n, setN] = useState('');
  const [result, setResult] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      entity1: input1,
      entity2: input2,

      n: parseInt(n, 10),
    };
    console.log(input1);
    console.log(requestData);

    try {
      const response = await fetch('http://localhost:3000/api/fromlink/summery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log("Response Data:", data); // Log the whole data
      console.log("Rows Data:", data.summryjson?.rows); // Log the rows specifically

      if (response.ok) {
        setResult(data.summryjson?.rows || []);
      } else {
        setResult([{ error: `Error: ${data.error}` }]);
      }
    } catch (error) {
      setResult([{ error: `Error: ${error.message}` }]);
    }
  };

  // Render the table rows
  const renderRows = () => {
    console.log(input1)
    return result.map((row, index) => (
      <tr key={index}>
        <td>{row.feature || 'No feature'}</td> {/* Feature */}
        <td>{row[input1]|| 'No data'}</td> {/* Entity1 (car) */}
        <td>{row[input2] || 'No data'}</td> {/* Entity2 (bus) */}
      </tr>
    ));
  };

  return (
    <>
      <div>
        <h1>Compare Two Entities</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="n">N:</label>
            <input
              type="number"
              id="n"
              value={n}
              onChange={(e) => setN(e.target.value)}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Feature/Attribute</th>
                <th>
                  <input
                    type="text"
                    placeholder="Entity1"
                    id="input1"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    placeholder="Entity2"
                    id="input2"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {result.length > 0 ? renderRows() : (
                <tr>
                  <td colSpan="3">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
