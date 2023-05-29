// Retrieve students data from localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// Function to save a student
function saveStudent(event) {
  event.preventDefault();

  // Get form input values
  const name = document.getElementById('student-name').value;
  const id = document.getElementById('student-id').value;
  const age = document.getElementById('student-age').value;
  const email = document.getElementById('student-email').value;
  const dob = document.getElementById('student-dob').value;

  // Check if any required field is empty
  if (!name || !id || !age || !email || !dob) {
    alert('Please fill in all the fields.');
    return;
  }

  // Create a new student object
  const student = {
    name,
    id,
    age,
    email,
    dob
  };

  // Add the student to the array
  students.push(student);

  // Save the updated student data to localStorage
  localStorage.setItem('students', JSON.stringify(students));
  

  // Clear form input fields
  document.getElementById('student-name').value = '';
  document.getElementById('student-id').value = '';
  document.getElementById('student-age').value = '';
  document.getElementById('student-email').value = '';
  document.getElementById('student-dob').value = '';

  // Refresh the student table

  displayStudents();
}

// Function to delete a student
function deleteStudent(index) {
  // Remove the student from the array
  students.splice(index, 1);

  // Save the updated student data to localStorage
  localStorage.setItem('students', JSON.stringify(students));

  // Refresh the student table
  displayStudents();
}

// Function to edit a student
function editStudent(index) {
  // Get the student object at the specified index
  const student = students[index];

  // Set the form input values with the student data
  document.getElementById('student-name').value = student.name;
  document.getElementById('student-id').value = student.id;
  document.getElementById('student-age').value = student.age;
  document.getElementById('student-email').value = student.email;
  document.getElementById('student-dob').value = student.dob;

  // Remove the student from the array
  students.splice(index, 1);

  // Save the updated student data to localStorage
  localStorage.setItem('students', JSON.stringify(students));

  // Refresh the student table
  
  displayStudents();

}

// Function to display students in the table
function displayStudents() {
  const studentTable = document.getElementById('studentTable');
  const tbody = studentTable.querySelector('tbody');

  // Clear existing table rows
  tbody.innerHTML = '';

  // Create table rows
  students.forEach((student, index) => {
    const row = document.createElement('tr');

    // Create table cells
    const nameCell = document.createElement('td');
    nameCell.textContent = student.name;

    const idCell = document.createElement('td');
    idCell.textContent = student.id;

    const ageCell = document.createElement('td');
    ageCell.textContent = student.age;

    const emailCell = document.createElement('td');
    emailCell.textContent = student.email;

    const dobCell = document.createElement('td');
    dobCell.textContent = student.dob;

    const actionsCell = document.createElement('td');

    // Create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => editStudent(index));

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => deleteStudent(index));

    // Append buttons to actions cell
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    // Append cells to the row
    row.appendChild(nameCell);
    row.appendChild(idCell);
    row.appendChild(ageCell);
    row.appendChild(emailCell);
    row.appendChild(dobCell);
    row.appendChild(actionsCell);

    // Append the row to the table body
    tbody.appendChild(row);
  });
}

// Add event listener to the form submit
const addStudentForm = document.getElementById('add-student-form');
addStudentForm.addEventListener('submit', saveStudent);

// Initial display of students
displayStudents();

