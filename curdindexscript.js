// document.getElementById("myForm").addEventListener("submit", function(event) {
//   event.preventDefault(); // Prevent form submission

function crud() {
  // Get form values
  var name = $("#name").val();
  var studentId = $("#studentId").val();
  var email = $("#email").val();
  var age = $("#age").val();
  var session = $("#session").val();

  // Create an object to store the values
  var studentData = {
    name: name,
    studentId: studentId,
    email: email,
    age: age,
    session: session,
  };

  // Get existing student data from localStorage or initialize empty array
  var existingData = JSON.parse(localStorage.getItem("studentData")) || [];

  // Add the new student data to the existing data array
  existingData.push(studentData);

  // Store the updated student data in localStorage
  localStorage.setItem("studentData", JSON.stringify(existingData));

  // Log the existing data for debugging purposes
  console.log("Existing Data:", existingData);

  // Redirect to the display page
  console.log("Redirecting to display.html");
  window.location.href = "display.html";
}

