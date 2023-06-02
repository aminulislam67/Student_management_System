var storedData = JSON.parse(localStorage.getItem("studentData")) || [];
    var currentPage = 1;
    var pageSize = 2;
    var totalPages = Math.ceil(storedData.length / pageSize);
    var filteredData = [];

    function paginate() {
      // Clear the table body
      var dataBody = document.getElementById("dataBody");
      dataBody.innerHTML = "";

      var startIndex = (currentPage - 1) * pageSize;
      var endIndex = startIndex + pageSize;

      // Get the current page data
      var pageData = filteredData.slice(startIndex, endIndex);

      // Iterate over each student data object in the current page and create table rows
      pageData.forEach(function(student, index) {
        var row = document.createElement("tr");

        var checkboxCell = document.createElement("td");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "studentCheckbox";
        checkbox.value = startIndex + index;
        checkboxCell.appendChild(checkbox);
        row.appendChild(checkboxCell);

        var serialNumberCell = document.createElement("td");
        serialNumberCell.textContent = startIndex + index + 1;
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
        // Add your edit button styles here
        editButton.addEventListener("click", function() {
          editStudent(startIndex + index);
        });
        actionsCell.appendChild(editButton);

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        // Add your delete button styles here
        deleteButton.addEventListener("click", function() {
          deleteStudent(startIndex + index);
        });
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        dataBody.appendChild(row);
      });

      // Generate pagination links
      var paginationDiv = document.getElementById("pagination");
      paginationDiv.innerHTML = "";

      var previousButton = document.createElement("button");
      previousButton.textContent = "Previous";
      previousButton.disabled = currentPage === 1;
      previousButton.addEventListener("click", function() {
        currentPage--;
        paginate();
      });
      paginationDiv.appendChild(previousButton);

      var pageNumbers = document.createElement("div");
      pageNumbers.classList.add("pagination");

      var startPage = 1;
      var endPage = totalPages;
      var maxPageNumbers = 5;
      var ellipsisNeeded = false;

      if (totalPages > maxPageNumbers) {
        if (currentPage <= maxPageNumbers - 2) {
          endPage = maxPageNumbers - 1;
          ellipsisNeeded = true;
        } else if (currentPage >= totalPages - 2) {
          startPage = totalPages - maxPageNumbers + 2;
          ellipsisNeeded = true;
        } else {
          startPage = currentPage - Math.floor(maxPageNumbers / 2);
          endPage = currentPage + Math.floor(maxPageNumbers / 2);
          ellipsisNeeded = true;
        }
      }

      for (var i = startPage; i <= endPage; i++) {
        var pageLink = document.createElement("span");
        pageLink.textContent = i;
        pageLink.addEventListener("click", function(event) {
          currentPage = parseInt(event.target.textContent);
          paginate();
        });

        if (i === currentPage) {
          pageLink.classList.add("current");
        }

        pageNumbers.appendChild(pageLink);
      }

      if (ellipsisNeeded) {
        var ellipsis = document.createElement("span");
        ellipsis.textContent = "...";
        pageNumbers.insertBefore(ellipsis, pageNumbers.children[1]);
        pageNumbers.appendChild(ellipsis.cloneNode(true));

        var lastPageLink = document.createElement("span");
        lastPageLink.textContent = totalPages;
        lastPageLink.addEventListener("click", function() {
          currentPage = totalPages;
          paginate();
        });
        pageNumbers.appendChild(lastPageLink);
      }

      paginationDiv.appendChild(pageNumbers);

      var nextButton = document.createElement("button");
      nextButton.textContent = "Next";
      nextButton.disabled = currentPage === totalPages;
      nextButton.addEventListener("click", function() {
        currentPage++;
        paginate();
      });
      paginationDiv.appendChild(nextButton);
    }

    function filterStudents() {
      var searchInput = document.getElementById("searchInput").value.toLowerCase();
      filteredData = [];

      if (searchInput) {
        filteredData = storedData.filter(function(student) {
          var nameMatch = student.name.toLowerCase().includes(searchInput);
          var idMatch = student.studentId.toLowerCase().includes(searchInput);
          return nameMatch || idMatch;
        });
      } else {
        filteredData = storedData;
      }

      currentPage = 1;
      totalPages = Math.ceil(filteredData.length / pageSize);
      paginate();
    }

    function deleteStudent(index) {
      storedData.splice(index, 1);
      localStorage.setItem("studentData", JSON.stringify(storedData));
      filterStudents();
    }

    function deleteSelected() {
      var checkboxes = document.querySelectorAll('input[name="studentCheckbox"]:checked');
      var indexesToDelete = Array.from(checkboxes).map(function(checkbox) {
        return parseInt(checkbox.value);
      });

      indexesToDelete.sort(function(a, b) {
        return b - a;
      }).forEach(function(index) {
        storedData.splice(index, 1);
      });

      localStorage.setItem("studentData", JSON.stringify(storedData));
      filterStudents();
    }

    function editStudent(index) {
      window.location.href = "edit.html?index=" + index;
    }

    document.getElementById("searchButton").addEventListener("click", function() {
      filterStudents();
    });

    var deleteSelectedButton = document.getElementById("deleteSelectedButton");
    deleteSelectedButton.addEventListener("click", deleteSelected);

    var selectAllCheckbox = document.getElementById("selectAllCheckbox");
    selectAllCheckbox.addEventListener("change", function() {
      var checkboxes = document.querySelectorAll('input[name="studentCheckbox"]');
      checkboxes.forEach(function(checkbox) {
        checkbox.checked = selectAllCheckbox.checked;
      });
    });

    filterStudents();