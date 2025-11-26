document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    let valid = true;

    [name, email, message].forEach(el => el.classList.remove("is-invalid","is-valid"));

    if (name.value.trim().length < 2) { name.classList.add("is-invalid"); valid = false; } else name.classList.add("is-valid");
    if (!email.value.includes("@")) { email.classList.add("is-invalid"); valid = false; } else email.classList.add("is-valid");
    if (message.value.trim().length < 10) { message.classList.add("is-invalid"); valid = false; } else message.classList.add("is-valid");

    if (!valid) return;

    status.classList.remove("visually-hidden");
    status.classList.add("text-success");
    status.innerText = "Message sent (demo) — you can mention this in your video.";

    status.animate([{opacity:0},{opacity:1}], {duration:420, easing:"ease-out"});
    setTimeout(()=> {
      [name,email,message].forEach(el => el.classList.remove("is-valid"));
    }, 1600);
  });
});
