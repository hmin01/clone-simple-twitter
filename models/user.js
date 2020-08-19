const query = require('../helper/db/query');

module.exports = {
    register: async (data) => {
       const selectQ = `INSERT INTO twitterdb.USER(name, password,email,phonenumber, gender, registerdate,profile) VALUES('${data.name}','${data.password}','${data.email}','${data.phonenumber}','${data.gender}',NOW(),'null')`;
        return await query.selectSync(selectQ);
    },
    login: async(data) => {
        //`select * from twitterdb.USER where email = '${userInfo.email}'and password = '${userInfo.password}'`
        const selectQ = "";
        return await query.selectSync(selectQ);
    },
    update: async(data) => {
        //`update USER set name ='${userInfo.name}', phonenumber='${userInfo.phonenumber}',gender='${userInfo.gender}', profile='${userInfo.profile}' where id='${userInfo.id}'`;
        const updateQ = "";
        return await query.querySync(updateQ);
    },
    delete: async (data) => {
        //`DELETE FROM USER WHERE email = '${userInfo.email}' and password = '${userInfo.password}'`
        const deleteQ = `DELETE FROM USER WHERE email = '${data.email}' and password = '${data.password}'`;
        return await query.querySync(deleteQ);
    }
};