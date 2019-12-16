const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
  if (req.body.user === "9999" && req.body.password === "12345") {
    res.status(200).json({
      id: req.body.user,
      email: "john.smith@diamondkey.com",
      displayName: "John Smith",
      idToken:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ1OThkYjVjZjE1ZWNhOTI0OWJhZTUzMDYzOWVkYzUzNmMzYzViYjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGlkZS04YTM4YSIsImF1ZCI6InRpZGUtOGEzOGEiLCJhdXRoX3RpbWUiOjE1NzY0NTEwMjYsInVzZXJfaWQiOiI5YlpvS3J2MEE0WktTR0hsTkYzTFBxQnZhU2MyIiwic3ViIjoiOWJab0tydjBBNFpLU0dIbE5GM0xQcUJ2YVNjMiIsImlhdCI6MTU3NjQ1MTAyNiwiZXhwIjoxNTc2NDU0NjI2LCJlbWFpbCI6Im1vYmlsQGRpYW1vbmRrZXkuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm1vYmlsQGRpYW1vbmRrZXkuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.IIajeSfbb6ZkzkQGINQ_0zsjtkRmaySsgP7CgCev9Ewh4Grv2UMUFBvQtwX-MDMgT44qfWpsIs1lrr60lI8GDZs3LU_oXyVaaj29x6STf24-l6GNppLZ1V5asOh_G7fcdfalD-WsaP4zxCG9JAE9KqcOFD5LFbB63-f4C4s7ch5isOwn9mj07x-q0CRfMpAN3f6VfXeUzx2zR2jgm9jd5xAOnd4dvbNT0ikAZCwD0cLU6yBEiZ7FIqJQ9flkaqsddZIgVtbY5wrAcakZvT9MpDEHHey6P6BGiKnmk6Kr1D58Gm6LfG1b-_teYzUZKk2YfHcmG95nWVc-fTSVjo4wzA",
      refreshToken:
        "AEu4IL3qG1o7rlkDmOKQOhehwp0_J2M7aVmKyz-UYw8p3CI8iTRCLhQsfSTHucyeWSEhBf-3pA7lCYA8yqWwxjSEXWRm7mWodZabWiA_86PfmzCwuyj1SttFxUc4ovgx7Dg3VwdE4xPoI4Uxc4tSLlPhPK8kWT68GCLtWAjaGu4YsCWjcFXQnxZNzkQeIA-vLrKJMIMjd4WW",
      expiresIn: "3600"
    });
  } else {
    res.status(400).json({
      error: {
        code: 400,
        message: "INVALID_DETAILS",
        errors: [
          {
            message: "INVALID_DETAILS",
            domain: "global",
            reason: "invalid"
          }
        ]
      }
    });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
