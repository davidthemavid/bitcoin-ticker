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
  let URL = "https://apiv2.bitcoinaverage.com/convert/global";
  //let finalURL = URL + crypto + fiat;
  let amount = req.body.amount;

  let options = {
    url: URL,
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body) {
    let data = JSON.parse(body);
    let price = data.price;
    // let high = data.high;
    // let low = data.low;
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
    res.send();
  });
});

app.listen(3000, function() {
  console.log("~~~Server running on port 3000~~~");
});
