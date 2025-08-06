// File: api/exchange.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { api_key, request_token, checksum } = req.body;

    const formBody = new URLSearchParams({
      api_key,
      request_token,
      checksum,
    });

    const response = await fetch("https://api.kite.trade/session/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody.toString()
    });

    const data = await response.json();

    if (response.ok) {
    

res.status(200).json({
  status: "success",
  access_token: data.data.access_token,
  //user_id: data.user_id,
  //login_time: data.login_time,
  //data  // optional: preserve full response
});

      
    } else {
      res.status(400).json({ status: "error", message: data.message || "Unknown error" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
