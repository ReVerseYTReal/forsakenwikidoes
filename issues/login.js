// Get references to form and verification div
const loginForm = document.getElementById('loginForm');
const verificationDiv = document.getElementById('verification');

// Handle form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  if (!username) {
    verificationDiv.textContent = "Please enter your username.";
    return;
  }

  // Generate a random verification code
  const code = 'FW-' + Math.random().toString(36).substring(2, 10).toUpperCase();

  // Display instructions to user
  verificationDiv.innerHTML = `
    <p>Hi <strong>${username}</strong>, post this code on your Fandom message wall:</p>
    <strong>${code}</strong>
    <p>Once posted, click "Verify" below:</p>
    <button id="verifyBtn">Verify</button>
  `;

  // Save username and code temporarily in localStorage
  localStorage.setItem('fw_username', username);
  localStorage.setItem('fw_code', code);

  // Handle verify button click
  document.getElementById('verifyBtn').addEventListener('click', async () => {
    verificationDiv.textContent = "Checking Fandom wall...";

    const usernameStored = localStorage.getItem('fw_username');
    const codeStored = localStorage.getItem('fw_code');

    try {
      // Call serverless function to check the wall
      const res = await fetch('/.netlify/functions/verify-wall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameStored, code: codeStored })
      });

      const data = await res.json();

      if (data.verified) {
        // Mark user as verified
        localStorage.setItem('fw_verified', 'true');

        // Redirect to issue tracker
        window.location.href = "index.html";
      } else {
        verificationDiv.textContent = "Code not found on wall. Make sure it is posted correctly and try again.";
      }
    } catch (err) {
      console.error("Error verifying wall:", err);
      verificationDiv.textContent = "Error checking wall. Please try again later.";
    }
  });
});
