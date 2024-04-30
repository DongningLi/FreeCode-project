require('dotenv').config()

let express = require('express');
let app = express();

let bodyParser = require('body-parser');
//challenge 10
/*
When using extended=false, values can be only strings or arrays. 
The object returned when using querystring does not prototypically inherit from the default JavaScript Object,
which means functions like hasOwnProperty, toString will not be available. 
The extended version allows more data flexibility, but it is outmatched by JSON.
*/
app.use(bodyParser.urlencoded({ extended: true }));


// console.log("Hello World")


//challenge 1
// app.get('/', function (req, res) {
//     res.send("Hello Express");
// })


//challenge 2
// app.get('/', function (req, res) {
//     const path = __dirname + "/views/index.html"
//     res.sendFile(path)
// })

//challenge 3
// const publicPath = __dirname + "/public";
// app.use("/public", express.static(publicPath))

//challenge 4
// app.get('/json', function (req, res) {
//     res.json({ "message": "Hello json" })
// })

//challenge 5
// const helloObj = "Hello json"
// app.get('/json', function (req, res) {
//     const messageStyle = process.env.MESSAGE_STYLE
//     res.json({ "message": messageStyle == "uppercase" ? helloObj.toUpperCase() : helloObj })
// })

//challenge 6
// app.use("/", function (req, res, next) {
//     const outputString = req.method + " " + req.path + " - " + req.ip
//     console.log(outputString);
//     next();
// })

//challenge 7
// app.use("/now", function (req, res, next) {
//     req.time = new Date().toString()
//     next();
// }, function (req, res) {
//     res.json({ time: req.time })
// })

//challenge 8
// app.get('/:word/echo', function (req, res) {
//     res.json({ echo: req.params.word });
// })

//challenge 9
// app.get('/name', function (req, res, next) {
//     query = req.query;
//     first = query.first
//     last = query.last

//     next();
// }, function (req, res) {
//     res.send({ name: `${first} ${last}` })

// })


//challenge 11
let postHandler = function (req, res) {
    res.json({ name: `${req.body.first} ${req.body.last}` });
};
app.route('/name').post(postHandler);

// app.post('/name', (req, res) => {
//     let name = req.body.first + ' ' + req.body.last;
//     res.json({ name: name });
// });



module.exports = app;
