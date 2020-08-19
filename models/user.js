const query = require('../helper/db/query');

module.exports = {

    login: async(data) => {
        const selectQ = `select * from USER where email = '${data.email}'and password = '${data.password}'`;
        //console.log(selectQ);
        return await query.selectSync(selectQ);
    },
    update: async(data) => {
        const updateQ = `update USER set name ='${data.name}', phonenumber='${data.phonenumber}',gender='${data.gender}', profile='${data.profile}' where id='${data.id}'`;
        console.log(updateQ);
        return await query.querySync(updateQ);
    }
};