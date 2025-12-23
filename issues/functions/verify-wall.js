import fetch from 'node-fetch'; // Node fetch

export async function handler(event, context) {
  // Parse POST body
  const { username, code } = JSON.parse(event.body);

  if (!username || !code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ verified: false, error: "Missing username or code" }),
    };
  }

  // Fandom wall URL
  const wallURL = `https://forsaken2024.fandom.com/wiki/Message_Wall:${username}`;

  try {
    const response = await fetch(wallURL);
    if (!response.ok) {
      return { statusCode: 404, body: JSON.stringify({ verified: false, error: "Wall not found" }) };
    }

    const html = await response.text();

    // Check if the code exists in the wall HTML
    const verified = html.includes(code);

    return {
      statusCode: 200,
      body: JSON.stringify({ verified }),
    };

  } catch (err) {
    console.error("Error fetching wall:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ verified: false, error: "Server error" }),
    };
  }
}
