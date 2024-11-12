import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components
import Home from './Home';
import Test from './Test';

function App() {
  return (
    <Router>  
      <Routes>  
        <Route path="/" element={<Home />} />  {/* Home route */}
      </Routes>
    </Router>
  );
}

export default App;
