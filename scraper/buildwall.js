var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
var vm = require("vm");
var os = require("os");

request({
        uri: "http://services-uswest.skytap.com:30047/DatabaseDemo/DatabaseDemo?mCount=50"
}, function(error, response, body) {

    var $ = cheerio.load(body);

	fs.writeFile("./wall.html", "<div class=\"grid\" id=\"container\">" + os.EOL, function(err) {
        if(err) {
            return console.log(err);
            } } );
    fs.appendFile("./wall.html", "<div class=\"grid-sizer\"> </div>" + os.EOL, function(err) {
        if(err) {
            return console.log(err);
            } } );
    var names = [];
    $('li').each(function(i, elem) {
	       names[i] = $(this).text();
	       var title = names[i].split('(');
//	       console.log(title[0]);
	       var url = "http://www.omdbapi.com/?t=" + title[0] +"&y=&plot=short&r=json";
	request ({ uri: url }, function(error, response, body) {

            var json = JSON.parse(body);
		     
		     fs.appendFile("./wall.html", "<div class=\"grid-item\"> <a href=\"" + json.Poster + "\" title=\"" + title[0] + "\"><img src =\"" + json.Poster + "\" alt=\"" + json.Title + "\"></a></div>" + os.EOL, function(err) {
    			if(err) {
        		return console.log(err);
   			 }});
		     
//		     console.log(json.Poster);

		 });	 

    });
    
    
});
    


