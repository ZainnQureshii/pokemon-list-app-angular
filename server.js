var express = require('express');
var app = express()

app.use(express.static(__dirname + '/dist'));
app.get('/assets', function(req, res) {
  res.sendFile(__dirname + '/dist/assets')
})

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/pokemon-list-app/')
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(('server is running on port: ' + port + '.'))
})