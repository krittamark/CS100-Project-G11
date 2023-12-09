/**
 * @fileoverview This file defines the routes for the Passport API.
 */
const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
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


router.post('/passport', fileUpload(), (req, res) => {
  const data = req.body;
  console.log(req.body);
  // Check for mandatory fields in the incoming request
  if (!data.name || !data.studentID || !data.email || !data.workTitle ||
    !data.activityType || !data.academicYear || !data.semester || !data.startDate || !data.endDate || !data.location || !data.description) {
    return res.status(400).send({
      success: false,
      code: 400,
      message: 'All fields are required.',
      data: null
    });
  }

  // Validate that the start and end dates provided fall within the academic calendar
  const dateValidationError = validateDates(data.academicYear, data.semester, data.startDate, data.endDate);
  if (dateValidationError) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: dateValidationError,
      data: null
    });
  }

  const dateTime = Date.now();
  // Structure the record for saving
  const record = {
    name: data.name,
    studentID: data.studentID,
    email: data.email,
    workTitle: data.workTitle,
    activityType: data.activityType,
    academicYear: data.academicYear,
    semester: data.semester,
    startDate: data.startDate,
    endDate: data.endDate,
    location: data.location,
    description: data.description,
    activityImage: "assets/images/activities/" + String(data.workTitle).replaceAll(" ", "_") + dateTime + ".png",
    id: String(data.workTitle).replaceAll(" ", "_") + dateTime
  };

  let records = [];

  try {
    const jsonData = fs.readFileSync('databases/records.json');
    records = JSON.parse(jsonData);
  } catch (err) {


  }

  records.push(record);
  data.activityImage = data.activityImage.replace('data:', '').replace(/^.+,/, '');
  const image = Buffer.from(data.activityImage, 'base64');

  fs.writeFileSync('../html/assets/images/activities/' + String(data.workTitle).replaceAll(" ", "_") + dateTime + '.png', image);
  fs.cpSync('../html/assets/images/activities/' + String(data.workTitle).replaceAll(" ", "_") + dateTime + '.png', '/usr/share/nginx/html/assets/images/activities/' + String(data.workTitle).replaceAll(" ", "_") + dateTime + '.png');
  fs.writeFileSync('./databases/records.json', JSON.stringify(records, null, 2));
  res.status(200).json({
    success: true,
    code: 200,
    message: 'Record added successfully!',
    data: record
  });
});

module.exports = router;


function validateDates(academicYear, semester, startDate, endDate) {
  try {
    const calendarData = fs.readFileSync('databases/calendar.json');
    const calendars = JSON.parse(calendarData);

    const yearData = calendars[academicYear];
    if (!yearData) {
      return 'Academic year not found in calendar.';
    }

    const semesterData = yearData.find(s => s.semester === parseInt(semester));
    console.log(yearData);
    if (!semesterData) {
      console.log('Semester not found in calendar.', academicYear, parseInt(semester));
      return 'Semester not found in calendar.';
    }

    const calendarStartDate = new Date(semesterData.startDate);
    const calendarEndDate = new Date(semesterData.endDate);
    const clientStartDate = new Date(startDate);
    const clientEndDate = new Date(endDate);

    console.log(calendarStartDate, calendarEndDate, clientStartDate, clientEndDate);
    if (clientStartDate < calendarStartDate || clientEndDate > calendarEndDate) {
      return 'Client dates are outside the calendar semester dates.';
    }

    return null;
  } catch (err) {
    console.error('Error reading or parsing calendar.json:', err);
    return 'Internal server error';
  }
}