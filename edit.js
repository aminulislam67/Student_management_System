// Retrieve the index from the URL query parameters
var urlParams = new URLSearchParams(window.location.search);
var index = urlParams.get("index");

// Retrieve student data from localStorage
var storedData = JSON.parse(localStorage.getItem("studentData")) || [];

// Retrieve the student data object at the specified index
var data = storedData[index];

// Populate the form with the data values
$("#name").val(data.name);
$("#studentId").val(data.studentId);
$("#email").val(data.email);
$("#age").val(data.age);
$("#session").val(data.session);

$("#editForm").on("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  var name = $("#name").val();
  var studentId = $("#studentId").val();
  var email = $("#email").val();
  var age = $("#age").val();
  var session = $("#session").val();

  // Update the data object with the new values
  data.name = name;
  data.studentId = studentId;
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
