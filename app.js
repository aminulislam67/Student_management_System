$(document).ready(function() {
    // Initialize student data array
    var studentData = [];

    // Check if there is existing student data in localStorage
    if (localStorage.getItem('studentData')) {
        studentData = JSON.parse(localStorage.getItem('studentData'));
    }

    // Display student records
    function displayStudentRecords() {
        var tableBody = $('#studentTable tbody');
        tableBody.empty();

        $.each(studentData, function(index, student) {
            var row = '<tr>' +
                '<td>' + (index + 1) + '</td>' +
                '<td>' + student.firstName + '</td>' +
                '<td>' + student.lastName + '</td>' +
                '<td>' + student.studentId + '</td>' +
                '<td>' + student.email + '</td>' +
                '<td>' + student.age + '</td>' +
                '<td>' + student.admissionDate + '</td>' +
                '<td>' +
                '<button class="editButton" data-index="' + index + '">Edit</button>' +
                '<button class="deleteButton" data-index="' + index + '">Delete</button>' +
                '</td>' +
                '</tr>';
            tableBody.append(row);
        });
    }

    // Add student record
    $('#studentForm').submit(function(event) {
        event.preventDefault();

        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var studentId = $('#studentId').val();
        var email = $('#email').val();
        var age = $('#age').val();
        var admissionDate = $('#admissionDate').val();

        // Check if the student ID is already taken
        var existingStudent = studentData.find(function(student) {
            return student.studentId === studentId;
        });

        if (existingStudent) {
            alert('Student ID already exists. Please enter a unique Student ID.');
            return;
        }

        var student = {
            firstName: firstName,
            lastName: lastName,
            studentId: studentId,
            email: email,
            age: age,
            admissionDate: admissionDate
        };

        studentData.push(student);
        localStorage.setItem('studentData', JSON.stringify(studentData));

        $('#studentForm')[0].reset();
        displayStudentRecords();
    });

    // Edit student record
    $(document).on('click', '.editButton', function() {
        var index = $(this).data('index');
        var student = studentData[index];

        $('#firstName').val(student.firstName);
        $('#lastName').val(student.lastName);
        $('#studentId').val(student.studentId);
        $('#email').val(student.email);
        $('#age').val(student.age);
        $('#admissionDate').val(student.admissionDate);

        studentData.splice(index, 1);
        localStorage.setItem('studentData', JSON.stringify(studentData));

        displayStudentRecords();
    });

    // Delete student record
    $(document).on('click', '.deleteButton', function() {
        var index = $(this).data('index');
        studentData.splice(index, 1);
        localStorage.setItem('studentData', JSON.stringify(studentData));
        displayStudentRecords();
    });

    // Search student
    $('#searchButton').click(function() {
        var searchInput = $('#searchInput').val().toLowerCase();
        var searchResults = [];

        if (searchInput === '') {
            displayStudentRecords();
            return;
        }

        $.each(studentData, function(index, student) {
            if (
                student.studentId.toLowerCase().includes(searchInput) ||
                student.firstName.toLowerCase().includes(searchInput) ||
                student.lastName.toLowerCase().includes(searchInput)
            ) {
                searchResults.push(student);
            }
        });

        var tableBody = $('#studentTable tbody');
        tableBody.empty();

        $.each(searchResults, function(index, student) {
            var row = '<tr>' +
                '<td>' + (index + 1) + '</td>' +
                '<td>' + student.firstName + '</td>' +
                '<td>' + student.lastName + '</td>' +
                '<td>' + student.studentId + '</td>' +
                '<td>' + student.email + '</td>' +
                '<td>' + student.age + '</td>' +
                '<td>' + student.admissionDate + '</td>' +
                '<td>' +
                '<button class="editButton" data-index="' + index + '">Edit</button>' +
                '<button class="deleteButton" data-index="' + index + '">Delete</button>' +
                '</td>' +
                '</tr>';
            tableBody.append(row);
        });
    });

    // Multiple delete
$('#deleteButton').click(function() {
    var selectedIndexes = [];

    $('.deleteCheckbox:checked').each(function() {
        selectedIndexes.push($(this).data('index'));
    });

    selectedIndexes.sort(function(a, b) {
        return b - a;
    });

    $.each(selectedIndexes, function(index, selectedIndex) {
        studentData.splice(selectedIndex, 1);
    });

    localStorage.setItem('studentData', JSON.stringify(studentData));
    displayStudentRecords();
});

// Select all checkboxes
$('#selectAllCheckbox').change(function() {
    var checkboxes = $('.deleteCheckbox');
    checkboxes.prop('checked', $(this).is(':checked'));
});

// Individual checkbox change
$(document).on('change', '.deleteCheckbox', function() {
    var selectAllCheckbox = $('#selectAllCheckbox');
    selectAllCheckbox.prop('checked', $('.deleteCheckbox:checked').length === $('.deleteCheckbox').length);
});
});
