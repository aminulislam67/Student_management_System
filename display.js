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
        editButton.classList.add("btn", "btn-primary");
        editButton.addEventListener("click", function() {
          editStudent(startIndex + index);
        });
        actionsCell.appendChild(editButton);

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger");
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
      previousButton.classList.add("btn", "btn-primary");
      previousButton.disabled = currentPage === 1;
      previousButton.addEventListener("click", function() {
        currentPage--;
        paginate();
      });
      paginationDiv.appendChild(previousButton);

      var pageNumbers = document.createElement("div");
      pageNumbers.textContent = "Pages: ";

      var firstPageLink = document.createElement("a");
      firstPageLink.href = "#";
      firstPageLink.textContent = "1";
      firstPageLink.dataset.page = 1;
      firstPageLink.addEventListener("click", function(event) {
        currentPage = parseInt(event.target.dataset.page);
        paginate();
      });
      pageNumbers.appendChild(firstPageLink);

      if (currentPage > 3) {
        var ellipsisStart = document.createElement("span");
        ellipsisStart.textContent = "...";
        pageNumbers.appendChild(ellipsisStart);
      }

      var startPage = currentPage > 2 ? currentPage - 1 : 2;
      var endPage = currentPage < totalPages - 1 ? currentPage + 1 : totalPages - 1;
      for (var i = startPage; i <= endPage; i++) {
        var pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.dataset.page = i;
        pageLink.classList.add("pagination-link");
        pageLink.addEventListener("click", function(event) {
          currentPage = parseInt(event.target.dataset.page);
          paginate();
        });
        pageNumbers.appendChild(pageLink);
      }

      if (currentPage < totalPages - 2) {
        var ellipsisEnd = document.createElement("span");
        ellipsisEnd.textContent = "...";
        pageNumbers.appendChild(ellipsisEnd);
      }

      if (totalPages > 1) {
        var lastPageLink = document.createElement("a");
        lastPageLink.href = "#";
        lastPageLink.textContent = totalPages;
        lastPageLink.dataset.page = totalPages;
        lastPageLink.classList.add("pagination-link");
        lastPageLink.addEventListener("click", function(event) {
          currentPage = parseInt(event.target.dataset.page);
          paginate();
        });
        pageNumbers.appendChild(lastPageLink);
      }

      paginationDiv.appendChild(pageNumbers);

      var nextButton = document.createElement("button");
      nextButton.textContent = "Next";
      nextButton.classList.add("btn", "btn-primary");
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
          var fullName = student.name.toLowerCase();
          var studentId = student.studentId.toLowerCase();
          return fullName === searchInput || studentId === searchInput;
        });
      } else {
        filteredData = storedData;
      }

      currentPage = 1;
      totalPages = Math.ceil(filteredData.length / pageSize);
      paginate();
    }

    function deleteSelectedStudents() {
      var checkboxes = document.getElementsByName("studentCheckbox");
      var selectedIndexes = [];

      checkboxes.forEach(function(checkbox, index) {
        if (checkbox.checked) {
          selectedIndexes.push(parseInt(checkbox.value));
        }
      });

      selectedIndexes.sort(function(a, b) {
        return b - a;
      });

      selectedIndexes.forEach(function(index) {
        storedData.splice(index, 1);
      });

      localStorage.setItem("studentData", JSON.stringify(storedData));

      filterStudents();
    }

    function editStudent(index) {
     
       window.location.href = "edit.html?index=" + index;
    }

    function deleteStudent(index) {
      storedData.splice(index, 1);
      localStorage.setItem("studentData", JSON.stringify(storedData));
      filterStudents();
    }

    document.getElementById("searchButton").addEventListener("click", filterStudents);
    document.getElementById("selectAllCheckbox").addEventListener("change", function() {
      var checkboxes = document.getElementsByName("studentCheckbox");
      checkboxes.forEach(function(checkbox) {
        checkbox.checked = event.target.checked;
      });
    });
    document.getElementById("deleteSelectedButton").addEventListener("click", deleteSelectedStudents);

    filterStudents()