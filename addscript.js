$(document).ready(function() {
    // Check if students exist in localStorage
    if (localStorage.getItem('students') === null) {
      localStorage.setItem('students', '[]');
    }
  
    // Load students from localStorage
    loadStudents();
  
    // Handle form submission
    $('#studentForm').submit(function(event) {
      event.preventDefault();
  
      // Get form values
      var firstName = $('#firstName').val();
      var lastName = $('#lastName').val();
      var studentId = $('#studentId').val();
      var email = $('#email').val();
      var dateOfAdmission = $('#dateOfAdmission').val();
  
      // Check if student ID already exists
      if (isStudentIdExists(studentId)) {
        alert('Student ID already exists!');
        return;
      }
  
      // Create student object
      var student = {
        firstName: firstName,
        lastName: lastName,
        studentId: studentId,
        email: email,
        dateOfAdmission: dateOfAdmission
      };
  
      // Save student to localStorage
      saveStudent(student);
  
      // Clear form fields
      $('#studentForm')[0].reset();
  
      // Reload student list
      loadStudents();
    });
  
    // Handle delete button click
    $(document).on('click', '.delete-btn', function() {
      var studentId = $(this).data('student-id');
  
      // Delete student from localStorage
      deleteStudent(studentId);
  
      // Reload student list
      loadStudents();
    });
  
    // Load students from localStorage and display them
    function loadStudents() {
      var students = getStudents();
  
      // Clear student list
      $('#studentList').empty();
  
      // Display student list
      students.forEach(function(student, index) {
        var row = '<p>' + (index + 1) + '. ' + student.firstName + ' ' + student.lastName + ' - ' + student.studentId +
                  ' <button class="delete-btn" data-student-id="' + student.studentId + '">Delete</button></p>';
  
        $('#studentList').append(row);
      });
    }
  
    // Save student to localStorage
    function saveStudent(student) {
      var students = getStudents();
  
      // Add new student to students array
      students.push(student);
  
      // Save updated students array to localStorage
      localStorage.setItem('students', JSON.stringify(students));
    }
  
    // Delete student from localStorage
    function deleteStudent(studentId) {
      var students = getStudents();
  
      // Find student index by ID
      var studentIndex = students.findIndex(function(student) {
        return student.studentId === studentId;
      });
  
      // Remove student from students array
      if (studentIndex > -1) {
        students.splice(studentIndex, 1);
  
        // Save updated students array to localStorage
        localStorage.setItem('students', JSON.stringify(students));
      }
    }
  
    // Get students from localStorage
    function getStudents() {
      return JSON.parse(localStorage.getItem('students'));
    }
  
    // Check if student ID already exists
    function isStudentIdExists(studentId) {
      var students = getStudents();
  
      return students.some(function(student) {
        return student.studentId === studentId;
      });
    }
  });
  