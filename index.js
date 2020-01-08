const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  request(
    "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD",
    function(error, response, body) {
      let data = JSON.parse(body);
      let price = data.averages.week;
      res.send("Current average price: " + price + " USD");

      console.log(price);
      console.log("Status code: " + response.statusCode);
    }
  );
});

app.listen(3000, function() {
  console.log("~~~Server running on port 3000~~~");
});
