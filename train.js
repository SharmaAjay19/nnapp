var brain = require('brain');
var net = new brain.NeuralNetwork();
var succeed = 0;
var trainingData = [{input: [0, 0], output: [0]},
           {input: [0, 1], output: [1]},
           {input: [1, 0], output: [1]},
           {input: [1, 1], output: [0]}];

var trainFunc = function(modelName, callback){
	net.train(trainingData);
	succeed = 1;
	callback(succeed);
};

exports.trainModel = function(modelName, callback){
	trainFunc(modelName, function(succeed){
		if (succeed==1){
			callback(modelName+'Trained');
		}
		console.log("Training complete");
	});
};

exports.getPrediction = function(modelName, inputVec, callback){
	trainFunc(modelName, function(succeed){
		var output = net.run(inputVec);
		if (succeed==1){
			callback(output[0]);
		}
	});
};