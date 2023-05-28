// Login Page
function loginUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Retrieve registration data from local storage
    var storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      var user = JSON.parse(storedUser);
      if (username === user.username && password === user.password) {
        alert("Login successful!");
        window.location.href="home.html"
        // Redirect to a success page or perform other actions
      } else {
        alert("Invalid username or password. Please try again.");
      }
    } else {
      alert("User not found. Please register first.");
    }
  }