// Function to update the endpoint with the token
async function updateToken(userId, token) {
  try {
    // Send a PUT request to update the user with the token
    const response = await fetch(
      `https://649ac56abf7c145d023971ee.mockapi.io/api/V1/Users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    if (response.ok) {
      console.log("Token updated successfully.");
    } else {
      console.error("Failed to update the token.");
    }
  } catch (error) {
    console.error("An error occurred while updating the token:", error);
  }
}

// Event listener for OTP submission
const otpButton = document.getElementById("otpBtn");
const otpInput = document.querySelector("#otp");
const error = document.getElementById("error");

otpButton.addEventListener("click", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("rdr");
  const otp = otpInput.value;

  if (userId && otp) {
    await updateToken(userId, otp);
    window.location.href = "dashboard.html";
    // alert("OTP verified and stored successfully.");
  } else {
    // alert("Please enter a valid OTP.");
    error.textContent = "Please enter a valid OTP.";
    error.style.display = "block";
  }
});
