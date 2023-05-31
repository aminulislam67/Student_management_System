const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Configure Express to parse JSON data
app.use(express.json());

// Define the route for adding a student
app.post('/addStudent', (req, res) => {
  const { name, studentId, email, age, session } = req.body;

  // Create an object to store the student data
  const studentData = {
    name: name,
    studentId: studentId,
    email: email,
    age: age,
    session: session
  };

  // Read existing student data from the JSON file
  const existingData = JSON.parse(fs.readFileSync('studentData.json'));

  // Add the new student data to the existing data array
  existingData.push(studentData);

  // Write the updated student data back to the JSON file
  fs.writeFileSync('studentData.json', JSON.stringify(existingData));

  // Send a response indicating the student was added successfully
  res.send('Student added successfully!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
