function login() {
    var email = document.getElementById("email").value;

    if (email.trim() === '') {
      alert("Please enter email.");
      return;
    }

    let emailResult = checkEmail(email);

    if (emailResult === "correct") {
      alert("Email is correct!");
    } else {
      alert("Error : Please verify your Email.");
    }
  }

  function checkEmail(email) {
    if (email.includes('@') && email.length >= 8) {
      return "correct";
    } else {
      return "incorrect";
    }
  }


