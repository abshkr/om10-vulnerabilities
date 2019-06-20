const express = require("express");
const newman = require("newman");
const _ = require("lodash");
const opn = require("opn");

const app = express();
const port = 9999;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

newman.run(
  {
    collection: require("./schema.json"),
    reporters: "progress"
  },
  (error, summary) => {
    console.log("Testing Complete. Summarizing... 🔎");

    const fails = summary.run.failures;
    const payload = [];

    if (fails.length > 0) {
      console.log(`Number of Errors Found: ${fails.length}`);

      _.forEach(fails, fail => {
        if (!!fail.error) {
          const url = fail.source.request.url;
          const constuct = `${url.protocol}://${url.host.join(".")}/${url.path.join("/")}`;

          if (fail.error.code !== "UNABLE_TO_VERIFY_LEAF_SIGNATURE") {
            payload.push({
              url: constuct,
              method: fail.source.request.method,
              code: fail.error.code,
              name: fail.error.name,
              message: fail.error.message,
              trace: fail.error.stack
            });
          }
        }
      });
      app.get("/", (req, res) => res.send(payload));
    } else {
      console.log("No Errors Found. 🎉");
    }

    if (payload.length > 0) {
      const question = () => {
        readline.question(`Do you want to see the detailed list?`, value => {
          const answer = value.toLowerCase();
          if (answer === "y") {
            opn(`localhost:${port}`, { app: "firefox" });
            app.listen(port, () => {
              setTimeout(() => {
                process.exit();
              }, 3000);
            });
            return readline.close();
          }

          if (answer === "n") {
            process.exit();
          } else {
            question();
          }
        });
      };
      question();
    }
  }
);
