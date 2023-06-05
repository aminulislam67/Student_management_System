// Login Page
function loginUser() {
  var username = $("#username").val();
  var password = $("#password").val();

  // Retrieve registration data from local storage
  var storedUser = localStorage.getItem("user");

  if (storedUser) {
    var user = JSON.parse(storedUser);
    if (username === user.username && password === user.password) {
      window.location.href = "display.html";
      // Redirect to a success page or perform other actions
    } else {
      alert("Invalid username or password.");
    }
  }
}
