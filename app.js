// const api = require("./apiKeys");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
const b = "7999a3617e";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  
  const firstName = req.body.First;
  const lastName = req.body.Last;
  const email = req.body.Email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const l = "19ef24";
  const m = "005f";

  const url = "https://us10.api.mailchimp.com/3.0/lists/" + l + m;

  const a = "4776304a5e9e";
  const c = "94225ac054-us10";

  const options = {
    method: "POST",
    auth: "user:" + a + b + c,
    
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/faliure.html");
    }

    response.on("data", function (data) {
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.post("/success", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {});