var crypto = require('crypto');

module.exports = {
    hashValue : (email, password)=>{

        var hashstring = crypto.createHash('sha512').update("CNC").digest('hex');
        var hashSalt = email + hashstring;
        var hashpassword = crypto.createHash('sha512').update(password+hashSalt).digest('hex');

        return hashpassword;
}
}