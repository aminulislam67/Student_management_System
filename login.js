// Login Page
function loginUser() {
  
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Retrieve registration data from local storage
    var storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      var user = JSON.parse(storedUser);
      if (username === user.username && password === user.password) {
        window.location.href="crudindex.html"
        // Redirect to a success page or perform other actions
      } else {
        alert("Invalid username or password.");
      }
    }
  }

  //

  function loginUserByRetriving() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Retrieve registration data from local storage
        //usage:
        readJsonFile("user.json", function(text){
          var data = JSON.parse(text);
          console.log(data);
        });

    var storedUser = localStorage.getItem("user");
  
    // if (storedUser) {
    //   var user = JSON.parse(storedUser);
    //   if (username === user.username && password === user.password) {
    //     window.location.href="crudindex.html"
    //     // Redirect to a success page or perform other actions
    //   } else {
    //     alert("Invalid username or password.");
    //   }
    // }
  }

  function readJsonFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
  }
  
