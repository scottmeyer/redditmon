

var subreddit = 'dallas';
var wordsToMonitor = ['snow', '635', 'facebook'];
var sendTo = 'derpmailer@gmail.com';

var debug = false;

var username = 'derpmailer';
var password = 'isendemails';

var nodemailer = require('nodemailer'),
	request = require('request');

var permalinks = [];

Array.prototype.contains = function(k) {
  for(var p in this)
     if(this[p] === k)
        return true;
  return false;
};


var exlog = console.log;

console.log = function(message){
	if(debug){
		exlog("[" + new Date() + "] " + message);
	}
};

setInterval(function() {
	console.log('Permalink Count - ' + permalinks.length);
	var url = "http://www.reddit.com/r/" + subreddit + "/.json";
	console.log('Requesting http://www.reddit.com/r/' + subreddit);
	request({url : url,headers : {'User-Agent' : 'redditmon v0.1 ' + sendTo}}, function(err, res, body){
		if(!err && res.statusCode === 200){
			console.log('Received 200');
			var reddit = JSON.parse(body),
				stories = reddit.data.children.map(function(s) {
					return s.data;
				});

			var matches = {};
			var matched = false;
			stories.forEach(function(story){

				if(permalinks.contains(story.permalink)) return;

				wordsToMonitor.forEach(function(word){
					if(story.title.toLowerCase().indexOf(word.toLowerCase()) != -1){
						console.log('matched ' + story.permalink);

						if(!matches[word]){
							matches[word] = [];
						}
						matches[word].push("http://www.reddit.com" + story.permalink);
						matched = true;
						permalinks.push(story.permalink);
						return;
					}
				});
			
			});

			if(matched){
				var smtp = nodemailer.createTransport("SMTP",{
					service: "Gmail",
					auth: {
						user: username,
						pass: password
					}
				});

				var messageText = '';

				for(var m in matches) { 
					messageText += "[" + m + "]\r\n";
					matches[m].forEach(function(item){
						messageText += '\t' + item + '\r\n';
					});					
				}

				smtp.sendMail({
					text : messageText,
					to: sendTo,
					subject: "RedditMon Matches Found ['" + wordsToMonitor.join("','") + "']"
				}, function(err, message) { 
					if(err){
						console.log(err);
					} else {
						console.log('Sent email to ' + sendTo);
					}
				});
			}
		}
	});


}, 30000);


