const BASE_URL = "http://localhost:4000/auth";

// REGISTER
async function register() {
  const name = regName.value;
  const email = regEmail.value;
  const password = regPass.value;

  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  alert(data.message || data.error);
}

// LOGIN
async function login() {
  const email = logEmail.value;
  const password = logPass.value;

  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert(data.error);
  }
}

// CHECK PROTECTED ROUTE
async function checkProfile() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/profile`, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();
  alert(JSON.stringify(data));
}
