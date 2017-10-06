var express = require('express');
var app = express();
var train = require('./train.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.get('/', function(req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end("NNAPP");
});

var featureFlags = {"train": false, "test": true};



if (featureFlags["train"]==true){
	app.post('/train', function(req, res){
		var modelName = req.body.modelName;
		train.trainModel(modelName, function(mdName){
			res.writeHead(200, {"Content-Type": "application/json"});
			res.end('{"modelName": "' + mdName + '"}');
		});
	});
}

if (featureFlags["test"]==true){
	app.post('/test', function(req, res){
		var modelName = req.body.modelName;
		var inputData = req.body.inputData;
		train.getPrediction(modelName, inputData, function(result){
			res.writeHead(200, {"Content-Type": "application/json"});
			res.end('{"result": "' + result + '"}');
		});
	});
}

var port = 1234;

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});