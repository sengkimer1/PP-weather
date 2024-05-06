function login() {
  var email = document.getElementById("email").value;

  if (email.trim() === '') {
    alert("Please enter email.");
    return;
  }

  checkEmail(email)
    .then(emailResult => {
      if (emailResult === "correct") {
        alert("Email is correct!");
        // Save email to local storage
        localStorage.setItem('loggedInEmail', email);
        window.location.href = "../home/index.html"; 
      } else {
        alert("Email is incorrect");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function checkEmail(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // Simulating asynchronous validation
      if (email.includes('@') && email.length >= 8) {
        resolve("correct");
      } else {
        reject("incorrect");
      }
    }, 1000); // Simulated delay of 1000 milliseconds (1 second)
  });
}
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve email from the input field
  const userEmail = document.getElementById('email').value;

  // Store the email in local storage
  localStorage.setItem('loggedInEmail', userEmail);

  // Redirect or perform other actions after login
  // window.location.href = '/dashboard.html'; // Example: Redirect to dashboard page
});


  


