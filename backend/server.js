require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const sgMail = require("@sendgrid/mail");

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(cors());
app.use(express.json());

/* ======================
   STATIC FILES
   (FRONTEND SERVED HERE)
====================== */
app.use(express.static(path.join(__dirname, "public")));

/* ======================
   ENV CHECKS
====================== */
if (!process.env.SENDGRID_API_KEY) {
  console.error("❌ SENDGRID_API_KEY missing");
  process.exit(1);
}

if (!process.env.FROM_EMAIL || !process.env.TO_EMAIL) {
  console.error("❌ FROM_EMAIL or TO_EMAIL missing");
  process.exit(1);
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (req, res) => {
  res.send("✅ DL SYSTEMS backend running");
});

/* ======================
   ARCHITECTURE PAGE
   /architecture FIX
====================== */
app.get("/architecture", (req, res) => {
  console.log("📐 /architecture HIT");
  res.sendFile(path.join(__dirname, "public", "unified-llm.html"));
});

/* ======================
   CONTACT ENDPOINT
====================== */
app.post("/contact", async (req, res) => {
  console.log("🔥 /contact HIT");
  console.log("BODY:", req.body);

  const { name, email, message, company } = req.body;

  // Honeypot
  if (company) {
    return res.json({ success: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const msg = {
    to: process.env.TO_EMAIL,
    from: {
      email: process.env.FROM_EMAIL,
      name: "DL Systems Website",
    },
    replyTo: email,
    subject: `New Contact Message — ${name}`,
    text: `
Name: ${name}
Email: ${email}

Message:
${message}
    `,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  };

  try {
    const response = await sgMail.send(msg);
    console.log("✅ SendGrid response:", response[0].statusCode);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ SENDGRID FAILURE");
    console.error(error.response?.body || error);
    res.status(500).json({ error: "SendGrid error" });
  }
});

/* ======================
   404 FALLBACK
====================== */
app.use((req, res) => {
  res.status(404).send("❌ Route not found");
});

/* ======================
   START SERVER
====================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
