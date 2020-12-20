const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");

const app= express();

app.use(express.static("public")); // this is to render all the static files like our css files and images.
// we use express.static method to render our static files

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    const firstName= req.body.first;
    const lastName= req.body.last;
    const email= req.body.email;

    const data= {
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };
    const jsonData= JSON.stringify(data);

    const url="https://us7.api.mailchimp.com/3.0/lists/30d2faa888"

    const options={
        method: "POST",
        auth: "Pranav: <your mail-chimp API key>"
    }

    const request=https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });

        request.write(jsonData);
        request.end();
    });
});

app.listen("3000", function(){
    console.log("Server is up and running on port 3000");
});

