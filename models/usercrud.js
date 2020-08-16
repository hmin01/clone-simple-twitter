var connection = require('../connectMysql');
const crypto = require('crypto');

userLogin = function (email,password,func){

    const hashstring = crypto.createHash('sha512').update("CNC").digest('hex');
    const hashSalt = email + hashstring;
    var hashpassword = crypto.createHash('sha512').update(password+hashSalt).digest('hex');

    const sql = 'select * from twitterdb.USER where email =? and password=?';
    connection.query(sql,[email, hashpassword],  func);

};

userInfoProfile =  (id, func) => {
    connection.query('select * from twitterdb.USER where id =? ',[id], func);
};

userInfoUpdate =  (name,phonenumber,gender,profile,id , func) =>{
    const sql = 'update twitterdb.USER set name =?, phonenumber=?,gender=?, profile=? where id=?';
    connection.query(sql, [name,phonenumber,gender,profile,id], func);
};


module.exports ={

    userLogin: userLogin,
    userInfoProfile: userInfoProfile,
    userInfoUpdate: userInfoUpdate,
};




