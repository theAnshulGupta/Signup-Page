const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
//* This is to call a folder and consider the content to be static.
//*Note that the html does not refer to this folder since the node has already kept it inside of it

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

  const url = "https://us10.api.mailchimp.com/3.0/lists/19ef24005f";

  const options = {
    method: "POST",
    auth: "user:8e65a18c68ba0a1041c7120634a91f69-us10",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      console.log(response.statusCode);
      res.sendFile(__dirname + "/faliure.html");
    }

    response.on("data", function (data) {
      // console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
  console.log(res.statusCode);
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.post("/success", function (req, res) {
  console.log(": " + req.statusCode);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("running on 3000");
});

//? API
//! 8e65a18c68ba0a1041c7120634a91f69-us10
//? List ID
//! 19ef24005f