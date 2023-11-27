/**
 * @fileoverview This file defines the routes for the Passport API.
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/passport', (req, res) => {
  fs.readFile('databases/records.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading records.json:', err);
      return res.status(500).json({
        success: false,
        code: 500,
        message: 'Internal server error',
        data: null
      });
    }

    try {
      const passports = JSON.parse(data);
      return res.status(200).json(passports);
    } catch (err) {
      console.error('Error parsing records.json:', err);
      return res.status(500).json({
        success: false,
        code: 500,
        message: 'Internal server error',
        data: null
      });
    }
  });
});


router.post('/passport', (req, res) => {
  const data = req.body;

  // Check for mandatory fields in the incoming request
  if (!data.first_name || !data.last_name || !data.student_id || !data.email || !data.title ||
    !data.type_of_work_id || !data.academic_year || !data.semester || !data.start_date || !data.end_date || !data.location || !data.description) {
    return res.status(400).send({
      success: false,
      code: 400,
      message: 'All fields are required.',
      data: null
    });
  }

  // Validate that the start and end dates provided fall within the academic calendar
  const dateValidationError = validateDates(data.academic_year, data.semester, data.start_date, data.end_date);
  if (dateValidationError) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: dateValidationError,
      data: null
    });
  }

  // Structure the record for saving
  const record = {
    first_name: data.first_name,
    last_name: data.last_name,
    student_id: data.student_id,
    email: data.email,
    title: data.title,
    type_of_work_id: data.type_of_work_id,
    academic_year: data.academic_year,
    semester: data.semester,
    start_date: data.start_date,
    end_date: data.end_date,
    location: data.location,
    description: data.description,
  };

  let records = [];

  try {
    const jsonData = fs.readFileSync('databases/records.json');
    records = JSON.parse(jsonData);
  } catch (err) {

    
  }

  records.push(record);
  fs.writeFileSync('./databases/records.json', JSON.stringify(records, null, 2));
  res.status(200).json({
      success: true,
      code: 200,
      message: 'Record added successfully!',
      data: record
    });
});

module.exports = router;