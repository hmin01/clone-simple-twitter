var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysqlDB = require('./mysqldb');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var userRegisterRouter = require('./routes/register');
var userDeleteRouter = require('./routes/delete');
var app = express();

//mysqlDB 연결
mysqlDB.connect((err)=>{
  if(!err){
    console.log("Connected");
  }
  else {
    console.log(err.message);
  }
});
app.use(session({
  key:'sid',
  secret : 'jiwon', // 세션의 비밀 키, 쿠키값 변조를 막기 위해서 암호화 하여 저장
  resave:false,//세션을 항상 저장할지 여
  saveUnitialized :true,// 세션이 저장되기전에 초기화되지 않은 상태로 만들어 저
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/register',userRegisterRouter);
app.use('/delete',userDeleteRouter);


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

module.exports = app;
