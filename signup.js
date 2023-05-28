// Registration Page
function registerUser() {
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    var gender = document.getElementById("gender").value;
  
    // Save registration data to local storage
    var user = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      phone: phone,
      password: password,
      gender: gender
    };
    localStorage.setItem("user", JSON.stringify(user));
  
    alert("Registration successful!");
  }
  
  