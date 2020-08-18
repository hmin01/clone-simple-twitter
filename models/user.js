const query = require('../helper/db/query');

module.exports = {
    register: async (data) => {
        const selectQ = "";
        return await query.selectSync(selectQ);
    },
    login: async(data) => {
        const selectQ = "";
        return await query.selectSync(selectQ);
    },
    update: async(data) => {
        const updateQ = "";
        return await query.querySync(updateQ);
    },
    delete: async (data) => {
        const deleteQ = "";
        return await query.querySync(deleteQ);
    }
};