// Registration Page
function registerUser() {
  var firstName = $("#first-name").val();
  var lastName = $("#last-name").val();
  var username = $("#username").val();
  var email = $("#email").val();
  var phone = $("#phone").val();
  var password = $("#password").val();
  var gender = $("#gender").val();

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
