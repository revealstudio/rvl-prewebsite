var express = require('express');
var app = express();
var request = require('request-promise');

app.use('/',express.static('./build'));



app.listen(3000, function() {
    console.log('Server started: http://localhost:' + 3000);
});
