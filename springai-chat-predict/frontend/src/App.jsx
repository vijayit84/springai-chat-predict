import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (text.trim().length < 3) {
      setPrediction("");
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {

      try {

        setLoading(true);

        const response = await axios.post(
          "http://localhost:8081/predict",
          {
            text: text
          },
          {
            signal: controller.signal
          }
        );

        setPrediction(response.data.prediction);

      } catch (error) {

        if (error.name !== "CanceledError") {
          console.error(error);
        }

      } finally {
        setLoading(false);
      }

    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };

  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {

    if (e.key === "Tab" && prediction) {

      e.preventDefault();

      setText(prev => prev + prediction);

      setPrediction("");
    }
  };

  return (

    <div className="container">

      <h2>AI Smart Text Prediction</h2>

      <textarea
        rows="10"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Start typing..."
      />

      {loading && (
        <p>Predicting...</p>
      )}

      {!loading && prediction && (
        <div className="prediction">
          <strong>Suggestion:</strong> {prediction}
          <br />
          <small>Press TAB to accept</small>
        </div>
      )}

    </div>
  );
}

export default App;