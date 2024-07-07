import React from 'react';
import './App.css';
import TerminalComponent from './components/Terminal';
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <div className="App h-screen flex justify-center items-center bg-black">
      <TerminalComponent />
      <SpeedInsights />
    </div>
  );
}

export default App;
