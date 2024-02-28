import React, { useState } from 'react';
import './EmployeeForm.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function EmployeeForm() {
  const [name, setName] = useState('');
  // const [id, setId] = useState('');
  const [department, setDepartment] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [designation, setDesignation] = useState('');
  const [salary, setSalary] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleViewEmployeeList = () => {
    navigate('/employee-list');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/employees', {
          name,
          // employee_id: id,
          department,
          dob,
          gender,
          designation,
          salary
        });
        console.log(response.data); 
        alert('Employee details submitted successfully.');
       
        setName('');
        // setId('');
        setDepartment('');
        setDob('');
        setGender('');
        setDesignation('');
        setSalary('');
        setError('');
      } catch (error) {
        console.error('Error submitting employee details:', error);
        setError('Failed to submit employee details. Please try again.');
      }
    } else {
      setError('Please fill out all fields correctly.');
    }
  };

  const validateForm = () => {
    if (!name  || !department || !dob || !gender || !designation || !salary) {
      return false;
    }
    if (name.length > 30) {
      setError('Name should be within 30 characters.');
      return false;
    }
    if (salary.length > 8) {
      setError('Salary should be within 8 digits.');
      return false;
    }

  const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    if (age < 20) {
      setError('Employee should be at least 20 years old.');
      return false;
    }
    return true;
  };


  return (
    <div className="employee-form-container">
      <h2>Employee Form</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* <div>
          <label>Employee ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div> */}
        <div>
          <label>Department:</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Select department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <label><input type="radio" value="Male" checked={gender === 'Male'} onChange={() => setGender('Male')} /> Male</label>
          <label><input type="radio" value="Female" checked={gender === 'Female'} onChange={() => setGender('Female')} /> Female</label>
        </div>
        <div>
          <label>Designation:</label>
          <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
            <option value="">Select designation</option>
            {department === 'IT' && (
              <>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="QA Engineer">QA Engineer</option>
              </>
            )}
            {department === 'HR' && (
              <>
                <option value="HR Manager">HR Manager</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Training Specialist">Training Specialist</option>
              </>
            )}
            {department === 'Finance' && (
              <>
                <option value="Accountant">Accountant</option>
                <option value="Financial Analyst">Financial Analyst</option>
                <option value="Auditor">Auditor</option>
              </>
            )}
          </select>
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
        <button onClick={handleViewEmployeeList}>View List</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
