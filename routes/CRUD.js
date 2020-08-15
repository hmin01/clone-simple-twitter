var express = require('express');
var connection= require('../connectMysql');

const Login = function(email, password){

     connection.query('SELECT * FROM USER where email =? and password=?',[email,password],function (err, result, fields) {
        if(err){
            console.log("err" + err);
        }else{
            console.log("result");
            return result;
        }
    });
}

module.exports = Login;