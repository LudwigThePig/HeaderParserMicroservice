// server.js
// where your node app starts

// I can get the IP address, preferred languages (from header Accept-Language) and system infos (from header User-Agent) for my device.

// Example Output
// {"ipaddress":"159.20.14.100","language":"en-US,en;q=0.5","software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}


// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/api/whoami", function (req, res) {
  let ip = req.headers["x-forwarded-for"].split(",").slice(0,1).toString, //outputs 
      lang = req.get('Accept-Language'),
      software = req.get('User-Agent');
  res.json({"ipaddress": ip, "language": lang, "software": software});
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
