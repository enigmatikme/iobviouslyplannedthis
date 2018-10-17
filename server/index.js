var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo/index.js');
// const key = require('../config/google.js')

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.get('/savedLikes', function (req, res) {
  db.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200).send(data);
    }
  });
});

app.post('/savedLikes', function(req, res) {
  console.log("req.body is", req.body);
  db.updateLikedRestaurant(req.body, (err, result) => {
    if (err) {
      res.sendStatus(400).send();
    } else {
      console.log("post request success", result);
      res.sendStatus(200).send()
    }
  })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

