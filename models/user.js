const query = require('../helper/db/query');

module.exports = {
    register: async (data) => {
        const selectQ = `INSERT INTO USER(name, password,email,phonenumber, gender, registerdate,profile) VALUES('${data.name}','${data.password}','${data.email}','${data.phonenumber}','${data.gender}',NOW(),'${data.profile}')`;
        return await query.selectSync(selectQ);
    },
    login: async(data) => {
        const selectQ = `select * from USER where email = '${data.email}'and password = '${data.password}'`;
        return await query.selectSync(selectQ);
    },
    update: async(data) => {
        const updateQ = `update USER set name ='${data.name}', phonenumber='${data.phonenumber}', profile='${data.profile}' where id='${data.id}'`;
        return await query.querySync(updateQ);
    },
    delete: async (data) => {
        const deleteQ = `DELETE FROM USER WHERE email = '${data.email}' and password = '${data.password}'`;
        return await query.querySync(deleteQ);
    }
};