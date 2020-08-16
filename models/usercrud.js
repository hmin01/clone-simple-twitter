var mysqlDB = require('../mysqldb');

userRegister =  (name, password, email,phonenumber,gender,profile) =>{
    var checkRegister = false;
    mysqlDB.query('INSERT INTO twitterdb.USER VALUES(?,?,?,?,?,?,NOW(),?)',[,name, password, email,phonenumber,gender,profile], function (err, result, fields) {
        if(err) throw err;
        else{
            checkRegister = true;
        }
    });
    return checkRegister;
};

userLogin = function (email,password){
    var checkLogin = false;
    const sql = 'select * from twitterdb.USER where email =? and password=?';
    mysqlDB.query(sql,[email, password],  function (err, result, fields) {
        //var check = true;
        if(err) throw err;
        else{
            checkLogin = true;
        }
    });
    return checkLogin;
};

userInfoProfile =  (email) => {
    mysqlDB.query('select * from twitterdb.USER where email =? ',[email], function (err, result, fields) {
        if(err) throw err;
        else{
            return result;
        }
    });
};

userInfoUpdate =  (name,phonenumber,gender,profile,id) =>{
    var checkUpdate = false;
    mysqlDB.query('update twitterdb.USER set name =?, phonenumber=?,gender=?, profile=? where id=?',
        [name,phonenumber,gender,profile,id], function (err, result, fields) {
        if (err) throw err;
        else {
            checkUpdate= true;
        }
    });
    return checkUpdate;
};

userDelete =  (email)=> {
    var check = false;
    mysqlDB.query('DELETE FROM twitterdb.USER WHERE email = ? ',[email], function (err, result, fields) {
        if(err)throw err;
        else{
            check = true;
        }
    });
    return check;
};
module.exports ={
    userRegister : userRegister,
    userLogin: userLogin,
    userInfoProfile: userInfoProfile,
    userInfoUpdate: userInfoUpdate,
    userDelete: userDelete
};