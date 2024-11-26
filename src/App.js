import React, { useState, useEffect } from "react";
import { bubbleSort, mergeSort, quickSort } from "./algorithms/sorting";
import "./App.css";

const App = () => {
  const [list, setList] = useState([]);
  const [inputList, setInputList] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({ time: 0, comparisons: 0 });
  const [listLength, setListLength] = useState(10);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [complexities, setComplexities] = useState({ timeComplexity: "", spaceComplexity: "" });

  const handleAlgorithmChange = (newAlgorithm) => {
    setAlgorithm(newAlgorithm);
    resetResults();
  };

  const generateList = () => {
    const generatedList = Array.from({ length: listLength }, (_, i) => i + 1);
    for (let i = generatedList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [generatedList[i], generatedList[j]] = [generatedList[j], generatedList[i]];
    }
    setList(generatedList);
    resetResults();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputList(value);
    const parsedList = value.split(",").map((num) => parseInt(num.trim(), 10));
    if (parsedList.every((n) => !isNaN(n))) {
      setList(parsedList);
      resetResults();
    }
  };

  const resetResults = () => {
    setResult(null);
    setStats({ time: 0, comparisons: 0 });
  };

  const truncateListDisplay = (list) => {
    const limit = 50;
    if (list.length > limit) {
      const remaining = list.length - limit;
      return `${list.slice(0, limit).join(", ")} ...and ${remaining} more`;
    }
    return list.join(", ");
  };

  const handleExecute = () => {
    if (!algorithm) return alert("Please select an algorithm!");
    if (list.length === 0) return alert("Please enter or generate a list!");

    let startTime, endTime;
    let output, sorted, comparisons;
    let timeComplexity = "";
    let spaceComplexity = "";

    if (["Bubble Sort", "Merge Sort", "Quick Sort"].includes(algorithm)) {
      if (algorithm === "Bubble Sort") {
        startTime = performance.now();
        ({ sortedArray: sorted, comparisons } = bubbleSort(list));
        endTime = performance.now();
        timeComplexity = "O(n^2)";
        spaceComplexity = "O(1)";
      } else if (algorithm === "Merge Sort") {
        startTime = performance.now();
        ({ sortedArray: sorted, comparisons } = mergeSort(list));
        endTime = performance.now();
        timeComplexity = "O(n log n)";
        spaceComplexity = "O(n)";
      } else if (algorithm === "Quick Sort") {
        startTime = performance.now();
        ({ sortedArray: sorted, comparisons } = quickSort(list));
        endTime = performance.now();
        timeComplexity = "O(n log n) (average), O(n^2) (worst)";
        spaceComplexity = "O(log n)";
      }
      output = sorted;
    }

    setStats({ time: (endTime - startTime).toFixed(4), comparisons });
    setResult(output);
    setComplexities({ timeComplexity, spaceComplexity });
  };

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="App">
      <h1 className="title">Algorithm Comparison App</h1>
      <button onClick={toggleDarkMode} className="btn-toggle">
        Switch to {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div className="container">
        <div className="card">
          <h2>Input List</h2>
          <textarea
            placeholder="Enter numbers separated by commas (e.g., 5,3,8,2)"
            value={inputList}
            onChange={handleInputChange}
          ></textarea>
          <div className="controls">
            <input
              type="number"
              min="1"
              value={listLength}
              onChange={(e) => setListLength(Number(e.target.value))}
              className="input-length"
            />
            <button onClick={generateList} className="btn-generate">Generate</button>
          </div>
          <p className="list-display">
            <strong>Current List:</strong> {list.length > 0 ? truncateListDisplay(list) : "No list generated yet."}
          </p>
        </div>

        <div className="card">
          <h2>Algorithm Selection</h2>
          <select
            value={algorithm}
            onChange={(e) => handleAlgorithmChange(e.target.value)}
            className="select-algorithm"
          >
            <option value="">Select Algorithm</option>
            <optgroup label="Sorting Algorithms">
              <option value="Bubble Sort">Bubble Sort</option>
              <option value="Merge Sort">Merge Sort</option>
              <option value="Quick Sort">Quick Sort</option>
            </optgroup>
          </select>
          <button onClick={handleExecute} className="btn-execute">Run Algorithm</button>
        </div>

        <div className="card">
          <h2>Results</h2>
          {result !== null ? (
            <div>
              <p>
                <strong>
                  Sorted List: {result.join(", ")}
                </strong>
              </p>
              <table>
                <tbody>
                  <tr>
                    <td><strong>Time Taken:</strong></td>
                    <td>{stats.time} ms</td>
                  </tr>
                  <tr>
                    <td><strong>Comparisons:</strong></td>
                    <td>{stats.comparisons}</td>
                  </tr>
                  <tr>
                    <td><strong>Time Complexity:</strong></td>
                    <td>{complexities.timeComplexity}</td>
                  </tr>
                  <tr>
                    <td><strong>Space Complexity:</strong></td>
                    <td>{complexities.spaceComplexity}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p>No results to display yet. Run an algorithm to see results!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
