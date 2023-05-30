function deleteStudent(index) {
    // Retrieve student data from localStorage
    var storedData = JSON.parse(localStorage.getItem("studentData")) || [];

    // Remove the student data object at the specified index
    storedData.splice(index, 1);

    // Update the localStorage with the modified student data
    localStorage.setItem("studentData", JSON.stringify(storedData));

    // Reload the page
    window.location.reload();
  }

  // Retrieve student data from localStorage
  var storedData = JSON.parse(localStorage.getItem("studentData")) || [];

  // Function to filter the students based on search input
  function filterStudents() {
    var nameInput = document.getElementById("nameInput").value.toLowerCase();
    var idInput = document.getElementById("idInput").value.toLowerCase();

    // Clear the table body
    var dataBody = document.getElementById("dataBody");
    dataBody.innerHTML = "";

    // Filter the student data based on search input
    var filteredData = storedData.filter(function(student) {
      var nameMatch = student.name.toLowerCase().includes(nameInput);
      var idMatch = student.studentId.toLowerCase().includes(idInput);

      if (nameInput && idInput) {
        return nameMatch && idMatch;
      } else if (nameInput) {
        return nameMatch;
      } else if (idInput) {
        return idMatch;
      } else {
        return true; // No search input provided
      }
    });

    // Iterate over each filtered student data object and create table rows
    filteredData.forEach(function(student, index) {
      var row = document.createElement("tr");
      
      var serialNumberCell = document.createElement("td");
      var nameCell = document.createElement("td");
      var studentIdCell = document.createElement("td");
      var emailCell = document.createElement("td");
      var ageCell = document.createElement("td");
      var sessionCell = document.createElement("td");
      var actionsCell = document.createElement("td");

      serialNumberCell.textContent = index + 1; 
      nameCell.textContent = student.name;
      studentIdCell.textContent = student.studentId;
      emailCell.textContent = student.email;
      ageCell.textContent = student.age;
      sessionCell.textContent = student.session;


      var editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.style.backgroundColor="gold";
      editButton.style.color="black";
      // editButton.style.marginRight="15px";
      editButton.style.width="100px";
      editButton.style.border="3px solid black";
      editButton.style.fontSize="1em";
      editButton.style.fontWeight="bold";
      editButton.style.marginRight="5px";
      editButton.addEventListener("click", function() {
        editStudent(index);
      });

      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.style.backgroundColor="tomato";
      deleteButton.style.color="black";
      // deleteButton.style.marginRight="15px";
      deleteButton.style.width="100px";
      deleteButton.style.border="3px solid black";
      deleteButton.style.fontSize="1em";
     

      deleteButton.style.fontWeight="bold";
      deleteButton.addEventListener("click", function() {
        deleteStudent(index);
      });

      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);

      row.appendChild(serialNumberCell);
      row.appendChild(nameCell);
      row.appendChild(studentIdCell);
      row.appendChild(emailCell);
      row.appendChild(ageCell);
      row.appendChild(sessionCell);
    
      row.appendChild(actionsCell);

       dataBody.appendChild(row);
    });
  }

  // Function to edit a student
  function editStudent(index) {
    // Redirect to the edit page with the index as a URL parameter
    window.location.href = "edit.html?index=" + index;
  }

  // Call the filterStudents function initially to display all students
  filterStudents();

  // Add event listeners to the search inputs for filtering students
  document.getElementById("nameInput").addEventListener("input", function() {
    filterStudents();
  });

  document.getElementById("idInput").addEventListener("input", function() {
    filterStudents();
  });