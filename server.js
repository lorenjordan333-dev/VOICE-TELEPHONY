const express = require("express");
const http = require("http");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("voice-telephony alive");
});

app.post("/voice", (req, res) => {
  const streamUrl = process.env.STREAM_WS_URL;

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="${streamUrl}" />
  </Connect>
</Response>`;

  res.set("Content-Type", "text/xml");
  res.status(200).send(twiml);
});

const PORT = process.env.PORT || 3000;

http.createServer(app).listen(PORT, () => {
  console.log("voice-telephony running on port " + PORT);
});
