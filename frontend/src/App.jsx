import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components
import Home from './Home';
import Test from './Test';

function App() {
  return (
    <Router>  {/* Wrapping the entire app with Router */}
      <Routes>  {/* Define all your routes inside Routes */}
        <Route path="/" element={<Home />} />  {/* Home route */}
        <Route path="/test" element={<Test />} />  {/* Test route */}
      </Routes>
    </Router>
  );
}

export default App;
