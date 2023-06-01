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
        
        var checkboxCell = document.createElement("td");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "studentCheckbox";
        checkbox.value = index;
        checkboxCell.appendChild(checkbox);
        row.appendChild(checkboxCell);

        var serialNumberCell = document.createElement("td");
        serialNumberCell.textContent = index + 1;
        row.appendChild(serialNumberCell);

        var nameCell = document.createElement("td");
        nameCell.textContent = student.name;
        row.appendChild(nameCell);

        var studentIdCell = document.createElement("td");
        studentIdCell.textContent = student.studentId;
        row.appendChild(studentIdCell);

        var emailCell = document.createElement("td");
        emailCell.textContent = student.email;
        row.appendChild(emailCell);

        var ageCell = document.createElement("td");
        ageCell.textContent = student.age;
        row.appendChild(ageCell);

        var sessionCell = document.createElement("td");
        sessionCell.textContent = student.session;
        row.appendChild(sessionCell);

        var actionsCell = document.createElement("td");
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
        editButton.textContent = "Edit";
        // Add your edit button styles here
        editButton.addEventListener("click", function() {
          editStudent(index);
        });
        actionsCell.appendChild(editButton);

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.backgroundColor="tomato";
        deleteButton.style.color="black";
        // deleteButton.style.marginRight="15px";
        deleteButton.style.width="100px";
        deleteButton.style.border="3px solid black";
        deleteButton.style.fontSize="1em";
       
  
        deleteButton.style.fontWeight="bold";
        // Add your delete button styles here
        deleteButton.addEventListener("click", function() {
          deleteStudent(index);
        });
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        dataBody.appendChild(row);
      });
    }

    // Function to delete a student
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

    // Function to delete multiple students
    function deleteSelected() {
      var checkboxes = document.querySelectorAll('input[name="studentCheckbox"]:checked');
      var indexesToDelete = Array.from(checkboxes).map(function(checkbox) {
        return parseInt(checkbox.value);
      });

      // Retrieve student data from localStorage
      var storedData = JSON.parse(localStorage.getItem("studentData")) || [];

      // Remove the selected student data objects
      indexesToDelete.sort(function(a, b) {
        return b - a;
      }).forEach(function(index) {
        storedData.splice(index, 1);
      });

      // Update the localStorage with the modified student data
      localStorage.setItem("studentData", JSON.stringify(storedData));

      // Reload the page
      window.location.reload();
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

    // Add a click event listener to the "Delete Selected" button
    var deleteSelectedButton = document.getElementById("deleteSelectedButton");
    deleteSelectedButton.style.backgroundColor="tomato";
    deleteSelectedButton.style.color="black";
    // deleteButton.style.marginRight="15px";
    deleteSelectedButton.style.width="100px";
    deleteSelectedButton.style.border="3px solid black";
    deleteSelectedButton.style.fontSize="1em";
   

    deleteSelectedButton.style.fontWeight="bold";
    deleteSelectedButton.addEventListener("click", deleteSelected);

    // Add event listener for the select all checkbox
    var selectAllCheckbox = document.getElementById("selectAllCheckbox");
    selectAllCheckbox.addEventListener("change", function() {
      var checkboxes = document.querySelectorAll('input[name="studentCheckbox"]');
      checkboxes.forEach(function(checkbox) {
        checkbox.checked = selectAllCheckbox.checked;
      });
    });