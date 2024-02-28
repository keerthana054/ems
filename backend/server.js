const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
const ca = [fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")];

const db = mysql.createConnection({
    host: 'keerthanadb.mysql.database.azure.com',
    user: 'keerthana',
    password: 'asff@1234lkjh0987',
    database: 'ems',
    // options: {
    //   trustedconnection: false,
    //   enableArithAbort: true,
    //   trustServerCertificate: true,
    // },
    ssl :{
      ca: ca
    }
  });

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/employees', (req, res) => {
    const {
        name,
        employee_id,
        department,
        dob,
        gender,
        designation,
        salary
    } = req.body;

    const insertQuery = `
        INSERT INTO employees (name, employee_id, department, dob, gender, designation, salary)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertQuery, [name, employee_id, department, dob, gender, designation, salary], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.status(201).json({ message: 'Employee created successfully', id: result.insertId });
        }
    });
});

app.get('/employees', (req, res) => {
    const selectQuery = 'SELECT * FROM employees';

    db.query(selectQuery, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.status(200).json(result);
        }
    });
});

app.get('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const selectQuery = 'SELECT * FROM employees WHERE id = ?';

    db.query(selectQuery, [employeeId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Employee not found' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
});

app.put('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const {
        name,
        employee_id,
        department,
        dob,
        gender,
        designation,
        salary
    } = req.body;

    const updateQuery = `
        UPDATE employees
        SET name = ?, employee_id = ?, department = ?, dob = ?, gender = ?, designation = ?, salary = ?
        WHERE id = ?
    `;

    db.query(updateQuery, [name, employee_id, department, dob, gender, designation, salary, employeeId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Employee not found' });
            } else {
                res.status(200).json({ message: 'Employee updated successfully' });
            }
        }
    });
});

app.delete('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const deleteQuery = 'DELETE FROM employees WHERE id = ?';

    db.query(deleteQuery, [employeeId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Employee not found' });
            } else {
                res.status(200).json({ message: 'Employee deleted successfully' });
            }
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
