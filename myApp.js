let express = require('express');
let app = express();
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}));

const greet = "Hello Express";
console.log(greet);

//----------------------------
//root
const root = "/";
const absfile = __dirname + '/views/index.html';
app.get(root, (req, res) => res.sendFile(absfile));

//json
const json = "/json"
const jsonItem = {"message": "Hello json"}
app.get(json, (req, res) => {
  if(process.env.MESSAGE_STYLE == 'uppercase'){
    jsonItem.message = jsonItem.message.toUpperCase();
  };
  res.json(jsonItem);
})

//now
const now = "/now";
const midNow = (req, res, next) => {
  req.time = new Date().toString();
  next();
}
app.get("/now", midNow, (req, res) => res.json({time: req.time}))

//echo
app.get('/:word/echo', (req, res) => res.json({echo: req.params.word}))

//name
app.get('/name', (req, res) => res.json({name : `${req.query.first} ${req.query.last}`})).post('/name', (req, res) => res.json({name : `${req.body.first} ${req.body.last}`}));

//----------------------------
//public
const public = "/public";
const abspublic = __dirname + "/public";
app.use(public, express.static(abspublic));

//middleware
const middle = (req, res, next) =>{
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  if(req.time){
    console.log(req.time);
  }
  next();
}
app.use(middle);





















module.exports = app;
