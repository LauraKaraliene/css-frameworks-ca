import { loginUser } from "../../api/authorization/login.js";
import { messageForUser } from "../../ui/messageForUser.js";
import * as utils from "../../utils/storage/storage.js";

export function loginFormHandler() {
  console.log("loginFormHandler called");
  const form = document.querySelector("#loginForm");
  form.addEventListener("submit", loginForm);
}

async function loginForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const entries = formData.entries();
  const userData = Object.fromEntries(entries);
  const fieldset = form.querySelector("fieldset");

  console.log(fieldset);

  try {
    fieldset.disabled = true;
    const { accessToken, name, email } = await loginUser(userData);

    if (accessToken) {
      utils.save("token", accessToken);
      utils.save("userName", name);
      utils.save("email", email);
      console.log(accessToken, name, email);
      form.reset();
      window.location.href = "/feed";
      // window.location.href = "/profile";
    }
  } catch (error) {
    console.error("Login error:", error.message);
    messageForUser("#loginMessage", "danger", error.message);
  } finally {
    fieldset.disabled = false;
  }
}
