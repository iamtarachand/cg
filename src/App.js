import React, { useEffect, useState } from "react";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ExtractDataGPT from "./components/ExtractDataGPT";

const App = () => {
  const [extractedInfo, setExtractedInfo] = useState({});
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: false, language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const ttt ="Book a hotel room for two adults and one child in New York City for three nights starting on March 5th.";
  // const ttt ="Book a hotel room for two adults and one child in New York City for three nights starting on March 5th.";

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <ExtractDataGPT trans = {transcript}/>
      <div className="container">
        <h2>Speech to Text Converter</h2>
        <button onClick={startListening}>Start Listening</button>
        <p>Transcript: {transcript}</p>
        <h3>Extracted Information:</h3>
        <ul>
          <li>Date: {extractedInfo.date}</li>
          <li>Place: {extractedInfo.place}</li>
          <li>Persons: {extractedInfo.persons}</li>
        </ul>
      </div>
    </>
  );
};

export default App;
