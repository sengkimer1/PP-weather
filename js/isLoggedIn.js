function isLoggedIn() {
    var email = localStorage.getItem("email");
    return email !== null && email.trim() !== '';
  }
  function isLoggedIn() {
    return localStorage.getItem("email") !== null;
}
