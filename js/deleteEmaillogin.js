function deleteEmailLogin() {
    localStorage.removeItem("email");
    alert("Email login deleted from local storage.");
}