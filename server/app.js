var express = require('express');
var cookieParser = require('cookie-parser');;
var mongoose=require('mongoose')
var cors = require('cors')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var contentRouter=require('./routes/content')
var testRouter = require('./routes/test');

var config=require('./config/config.js')

var app = express();

mongoose.connect(config.url)
.then(() => console.log('MongoDB connection is made.'))
.catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/test', testRouter);
app.use('/api/content', contentRouter);

module.exports = app;

app.set('port',process.env.PORT||3000);
var server=app.listen(app.get('port'),function(){
  console.log('Express server listening on port '+server.address().port);
});
