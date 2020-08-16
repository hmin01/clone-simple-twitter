var mysqlDB = require('../mysqldb');

userRegister =  (name, password, email,phonenumber,gender,profile,func) =>{
    const sql = 'INSERT INTO twitterdb.USER VALUES(?,?,?,?,?,?,NOW(),?)';
    mysqlDB.query(sql,[,name, password, email,phonenumber,gender,profile], func);
};

userDelete =  (email,func)=> {
    const sql = 'DELETE FROM twitterdb.USER WHERE email = ? ';
    mysqlDB.query(sql,[email], func);
};
module.exports ={
    userRegister : userRegister,
    userDelete: userDelete
};