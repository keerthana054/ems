import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Employee Management System</h1>
        <Routes>
          <Route path="/" exact element={<EmployeeForm/>} />
          <Route path="/employee-list" element={<EmployeeList/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

