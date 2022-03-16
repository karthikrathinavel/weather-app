const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
	
	const query = req.body.city;
	const apiKey = YOUR API KEY;
	const units = "metric";
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
	https.get(url, function(response){
		console.log(response.statusCode);
		console.log(query);
		response.on("data",function(data){
			const weatherData = JSON.parse(data); //it creates a JSON Object notation(well organized)
			//JSON.stringfy(data) = well organized JSON object to a single line string format
			const temp = weatherData.main.temp;
			const des = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
			res.write("<h1>The temperature in "+query+" is " + temp + " degrees Celcius</h1>");
			res.write("<p>The weather is currently " + des + "</p>");
			res.write("<img src="+imageURL+">");
			res.send();
		});
	});
});
app.listen(3000,function(){
	console.log("server is running on 3000");
})
