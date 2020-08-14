var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'jiwon',
  database : 'twitterdb'
});

connection.connect((err)=>{
  if(!err){
    console.log("Connected");
  }
  else {
    console.log("Connect Failed");
  }
});

/*
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret : 'jiwon', // 세션의 비밀 키, 쿠키값 변조를 막기 위해서 암호화 하여 저장
  resave:false,//세션을 항상 저장할지 여
  saveUnitialized :true,// 세션이 저장되기전에 초기화되지 않은 상태로 만들어 저
  cookie:{secure:true}// 쿠키 설정
}))


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

connection.end();

module.exports = app;
