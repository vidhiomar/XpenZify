import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OCRUpload from './pages/OCRUpload';import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import ComingSoon from './pages/ComingSoon';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path="/upload-ocr" element={<OCRUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;