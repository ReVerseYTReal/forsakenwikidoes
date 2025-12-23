const loginForm = document.getElementById('loginForm');
const verificationDiv = document.getElementById('verification');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();

  if(!username) {
    verificationDiv.textContent = "Please enter your username.";
    return;
  }

  // Generate a random verification code
  const code = 'FW-' + Math.random().toString(36).substring(2, 10).toUpperCase();

  // For now, just display the code
  verificationDiv.innerHTML = `
    <p>Hi ${username}, your verification code is:</p>
    <strong>${code}</strong>
    <p>Post this code on your Fandom message wall, then click "Verify".</p>
    <button id="verifyBtn">Verify</button>
  `;

  // Store username + code in localStorage for now
  localStorage.setItem('fw_username', username);
  localStorage.setItem('fw_code', code);

  // Handle verify click
  document.getElementById('verifyBtn').addEventListener('click', () => {
    alert("Verification will check Fandom wall (to be implemented).");
    // Later: call backend to check wall for code
    // If valid: redirect to index.html
  });
});
