// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'eu-west-2'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var queueURL = "https://sqs.eu-west-2.amazonaws.com/273521126402/test-queue";
exports.handler = function(event, context, callback) {

  var params = {
  AttributeNames: [
      "SentTimestamp"
  ],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: [
      "All"
  ],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0
  };

  sqs.receiveMessage(params, function(err, data) {
    if (err) {
      console.log("Receive Error", err);
    } else if (data.Messages) {

      console.log( data.Messages[0].Body)
      const results =  data.Messages.map(m => JSON.parse(m.Body));
      callback(null, results);

    }
  });
}