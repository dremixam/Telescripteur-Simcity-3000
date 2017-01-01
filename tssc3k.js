var config = require('./config.json');
var fs = require('fs');
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token_key: config.access_token_key,
    access_token_secret: config.access_token_secret
});

function tweet() {
    fs.readFile('phrases.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }

        var lines = data.split('\n');

        var line = lines[Math.floor(Math.random() * lines.length)];

        var status = {
            status: line
        };

        client.post('statuses/update', status, function (error, tweet, response) {
            if (error) {
                console.log(error);
                console.log(status);
            }
        });
    });
}

tweet();
setInterval(tweet, config.interval);
