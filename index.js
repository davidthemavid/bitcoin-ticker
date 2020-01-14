const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// TODO: Figure out how to apply css file to index.html

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  let crypto = req.body.crypto;
  let fiat = req.body.fiat;
  let amount = req.body.amount;

  //sends crypto value with desired fiat outcome
  let option1 = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  //sends crypto type & fiat to get desired crypto highs and lows
  let option2 = {
    url:
      "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + crypto + fiat,
    method: "GET"
  };

  request(option1, function(error, response, body) {
    let data = JSON.parse(body);
    let price = data.price;
    let todaysDate = data.time;
    res.write("<p>Today's date is: " + todaysDate + "</p>");
    console.log("Status code: " + response.statusCode);
    res.write(
      "<h1>" +
        amount +
        " " +
        crypto +
        " is currently " +
        price +
        " " +
        fiat +
        "</h1>"
    );

    request(option2, function(error, response, body) {
      let data2 = JSON.parse(body);
      let high = data2.high;
      let low = data2.low;
      res.write("<h2>High: " + high + " Low: " + low + "</h2>");
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("~~~Server running on port 3000~~~");
});
