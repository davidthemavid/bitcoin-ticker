const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  let crypto = req.body.crypto;
  let fiat = req.body.fiat;
  console.log(crypto);
  let URL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  let finalURL = URL + crypto + fiat;

  request(finalURL, function(error, response, body) {
    let data = JSON.parse(body);
    let price = data.averages.week;
    let high = data.high;
    let low = data.low;
    let todaysDate = data.display_timestamp;
    console.log(data.last);
    res.write("<p>Today's date is: " + todaysDate + "</p>");
    res.write(
      "<h1>Current price of: " + crypto + " is " + price + " " + fiat + "</h1>"
    );
    res.write("<h2>High: " + high + " Low: " + low + "</h2>");

    console.log(price);
    console.log("Status code: " + response.statusCode);
  });
});

app.listen(3000, function() {
  console.log("~~~Server running on port 3000~~~");
});
