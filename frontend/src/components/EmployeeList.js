import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeList.css';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employees');
        setEmployees(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const formatDob = (dobString) => {
    // Format date string to a more readable format
    const date = new Date(dobString);
    return date.toLocaleDateString('en-US');
};
  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Department</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Designation</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>        
              <td>{employee.department}</td>
              <td>{formatDob(employee.dob)}</td>
              <td>{employee.gender}</td>
              <td>{employee.designation}</td>
              <td>{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
