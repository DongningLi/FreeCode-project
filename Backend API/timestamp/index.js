// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  const dateString = req.params.date;

  const isVlalidDate = !isNaN(new Date(dateString));
  const isVlalidDateUnix = !isNaN(new Date(dateString * 1000));
  const isEmptyDate =
    dateString === "" || dateString === null || dateString === undefined;

  if (isEmptyDate) {
    const today_unix = new Date().getTime();
    const today_utc = new Date().toUTCString();

    return res.json({ unix: today_unix, utc: today_utc });
  } else if (isVlalidDate) {
    const date_unix = new Date(dateString).getTime();

    const date_utc = new Date(dateString).toUTCString();

    return res.json({ unix: date_unix, utc: date_utc });
  } else if (isVlalidDateUnix) {
    const date_utc = new Date(dateString * 1000).toUTCString();

    return res.json({ unix: dateString, utc: date_utc });
  } else {
    return res.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
