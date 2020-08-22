const query = require('../helper/db/query');

module.exports = {
    write: async (data) => {
        const selectQ = `INSERT INTO BOARD(contents, image_path,reg_date,mod_date,user_id) VALUES('${data.contentswrite}','${data.image_path}',NOW(),NOW(),'${data.user_id}')`;
        return await query.selectSync(selectQ);
    },
    search: async () => {
        const selectQ = 'SELECT user.id, user.name, board.b_id, board.contents,board.image_path,board.mod_date from board INNER JOIN user on board.user_id = user.id ORDER BY board.reg_date DESC';
        return await query.selectSync(selectQ);
    },
    update: async (data) => {
        const selectQ =`update board set contents = '${data.contents}' where b_id = '${data.b_id}'`;
        return await query.querySync(selectQ);
    },
    updateselect: async (data) => {
        const selectQ =`SELECT contents from board  where b_id = '${data.b_id}'`;
        return await query.selectSync(selectQ);
    },
    delete: async (data) => {
        const selectQ = `DELETE FROM board WHERE b_id = '${data.b_id}'`;
        return await query.querySync(selectQ);
    },
};