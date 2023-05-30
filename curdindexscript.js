    // Retrieve the index from the URL query parameters
    var urlParams = new URLSearchParams(window.location.search);
    var index = urlParams.get("index");

    // Retrieve student data from localStorage
    var storedData = JSON.parse(localStorage.getItem("studentData")) || [];

    // Retrieve the student data object at the specified index
    var data = storedData[index];

    // Populate the form with the data values
    document.getElementById("name").value = data.name;
    document.getElementById("studentId").value = data.studentId;
    document.getElementById("email").value = data.email;
    document.getElementById("age").value = data.age;
    document.getElementById("session").value = data.session;

    document.getElementById("editForm").addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission

      // Get form values
      var name = document.getElementById("name").value;
      var studentId = document.getElementById("studentId").value;
      var email = document.getElementById("email").value;
      var age = document.getElementById("age").value;
      var session = document.getElementById("session").value;

      // Update the data object with the new values
      data.name = name;
      data.email = email;
      data.age = age;
      data.session = session;

      // Update the student data object in the storedData array
      storedData[index] = data;

      // Update the localStorage with the modified student data
      localStorage.setItem("studentData", JSON.stringify(storedData));

      // Redirect to the display page
      window.location.href = "display.html";
    });