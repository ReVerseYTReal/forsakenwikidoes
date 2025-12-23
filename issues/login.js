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
  const code = 'FW-' + Math.random().toString(36).substring(2,10).toUpperCase();

  // Display instructions
  verificationDiv.innerHTML = `
    <p>Hi ${username}, post this code on your Fandom message wall:</p>
    <strong>${code}</strong>
    <p>Then click "Verify".</p>
    <button id="verifyBtn">Verify</button>
  `;

  // Save username & code in localStorage temporarily
  localStorage.setItem('fw_username', username);
  localStorage.setItem('fw_code', code);

  // Handle verify button click
  document.getElementById('verifyBtn').addEventListener('click', async () => {
    verificationDiv.textContent = "Checking Fandom wall...";

    try {
      const res = await fetch('/.netlify/functions/verify-wall', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, code })
      });
      const data = await res.json();
      if(data.verified) {
        localStorage.setItem('fw_verified', 'true');
        window.location.href = "index.html";
      } else {
        verificationDiv.textContent = "Code not found on wall. Make sure it is posted and try again.";
      }
    } catch(e) {
      verificationDiv.textContent = "Error checking wall. Try again later.";
      console.error(e);
    }
  });
});
