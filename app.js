// get data from external server 
// weather api

// server - own

const express = require("express");
// we use http package(native) for handling request and response to other server
const http = require("https");
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
})


 app.post('/',function(request,response){
    const location = request.body.city;
    const app_id = "4f338a67a58fb569795849fd38a1f8cd";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+app_id+"&units="+units;

    http.get(url,function(res){
        // to read actual data use on method of response
        res.on('data',function(data){
            // buffer version bytes of data
            // console.log(data)  --> bytes of data
            // use JSON parse method to convert to acutal data
            var data = JSON.parse(data);
            var temperature = data.main.temp;
            // response.send("<p> The temperature is: "+temperature+"</p>");
            // response.write is used to write all the necessary stuff to be send to browser
            response.write("<h1> Hello world Temp check?</h1>");
            response.write("<br>");
            response.write("<p> The current temperature at "+location+" is:"+temperature+"</p>");
            response.send();  
        })

    })
})
app.listen(3000,function(){
    console.log("server started");
})