// script.js
document.querySelector(".show-password").addEventListener("click", function () {
  const passwordField = document.getElementById("password");
  if (passwordField.type === "password") {
    passwordField.type = "text";
    this.textContent = "Hide";
  } else {
    passwordField.type = "password";
    this.textContent = "Show";
  }
});

document.querySelector(".login-form").addEventListener("submit", function (e) {
  const username = document.getElementById("username");
  if (!username.value) {
    document.querySelector(".error").style.display = "block";
    e.preventDefault();
  }
});

// Select the "Use token" checkbox
const useTokenCheckbox = document.getElementById("useToken");
const tokenCont = document.getElementById("token-cont");

// Check if the checkbox is checked
if (useTokenCheckbox.checked) {
  console.log("Token checkbox is checked");
  tokenCont.style.display = "block";
} else {
  console.log("Token checkbox is not checked");
  tokenCont.style.display = "none";
}

// Add an event listener to detect changes
useTokenCheckbox.addEventListener("change", (event) => {
  if (event.target.checked) {
    tokenCont.style.display = "block";
  } else {
    tokenCont.style.display = "none";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const formGroups = document.querySelectorAll(".form-group");
  const submitButton = document.querySelector('button[type="submit"]');
  const apiUrl = "https://649ac56abf7c145d023971ee.mockapi.io/api/V1/Users";

  // Handle form submission
  submitButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent actual form submission

    const formData = {};
    let isValid = true;

    formGroups.forEach((group) => {
      const input = group.querySelector("input");
      const errorSpan = group.querySelector(".error");

      // Collect form data
      formData[input.name] = input.value;

      // Validate required fields (skip token)
      if (input.id !== "token" && input.value.trim() === "") {
        errorSpan.style.display = "inline-block";
        isValid = false;
      } else {
        errorSpan.style.display = "none";
      }
    });

    if (!isValid) {
      console.log("Validation failed. Fill all required inputs.");
      return; // Stop if validation fails
    }

    // Send data to the mock API
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Data submitted successfully:", responseData);
      } else {
        console.error(
          "Failed to submit data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  });

  // Add focus and blur event listeners to inputs
  formGroups.forEach((group) => {
    const input = group.querySelector("input");
    const errorSpan = group.querySelector(".error");

    input.addEventListener("focus", () => {
      errorSpan.style.display = "none"; // Hide error on focus
    });

    input.addEventListener("blur", () => {
      if (input.id !== "token" && input.value.trim() === "") {
        errorSpan.style.display = "inline-block"; // Show error on unfocus for required fields
      }
    });
  });
});
