var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var app = express();
var api = require('./routes/api');
var auth = require('./routes/auth');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

const uri = 'mongodb+srv://<username>:<password>@cluster0-<cluster>.mongodb.net/<tablename>?retryWrites=true&w=majority';
// Prints "MongoError: bad auth Authentication failed."
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).then(
    () => console.log('Conected...')
).catch(
    err => console.log(err.reason)
);

app.use('/api', api);
app.use('/auth', auth);

app.use(function(req, res, next){
    res.status(404).send('Not found');
});

app.listen(3000);