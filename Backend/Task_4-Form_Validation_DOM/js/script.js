
const form = document.getElementById("registerForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let valid = true;

  const fullname = document.getElementById("fullname");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirm = document.getElementById("confirmPassword");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const confirmError = document.getElementById("confirmError");
  const successMsg = document.getElementById("successMsg");

  if (fullname.value.trim().length < 2) {
    nameError.textContent = "Enter a valid name";
    valid = false;
  } else {
    nameError.textContent = "";
  }

  if (!email.value.includes("@")) {
    emailError.textContent = "Enter a valid email";
    valid = false;
  } else {
    emailError.textContent = "";
  }

  if (password.value.length < 6) {
    document.getElementById("strengthText").textContent = "Weak password";
    document.getElementById("strengthText").style.color = "red";
    valid = false;
  }

  if (password.value !== confirm.value) {
    confirmError.textContent = "Passwords do not match";
    valid = false;
  } else {
    confirmError.textContent = "";
  }

  if (valid) {
    successMsg.classList.remove("hidden");
    successMsg.textContent = "Registration Successful 🎉";

    form.reset();
    document.getElementById("strengthText").textContent = "";
  }
});

document.getElementById("password").addEventListener("input", function () {
  const text = document.getElementById("strengthText");
  const pwd = this.value;

  if (pwd.length === 0) {
    text.textContent = "";
  } else if (pwd.length < 6) {
    text.textContent = "Weak password";
    text.style.color = "red";
  } else if (pwd.length < 10) {
    text.textContent = "Medium strength";
    text.style.color = "orange";
  } else {
    text.textContent = "Strong password";
    text.style.color = "green";
  }
});

document.getElementById("toggleBoxBtn").addEventListener("click", () => {
  const box = document.getElementById("dynamicBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
});
