var request = require("request");
var cheerio = require("cheerio");

request({
  uri: "http://services-uswest.skytap.com:30047/DatabaseDemo/DatabaseDemo?mCount=10",
}, function(error, response, body) {

  var $ = cheerio.load(body);

    var names =[];
    $('li').each(function(i, elem) {
	names[i] = $(this).text();
	var title = names[i].split('(');
	console.log(title[0]);
	var url = "http://www.omdbapi.com/?t="+title[0]+"&y=&plot=short&r=json"; 
	request ({ uri: url, 
		 }, function(error, response, body) {

		     var json = JSON.parse(body);
		     console.log(json.Poster);

		 });

    });

});


