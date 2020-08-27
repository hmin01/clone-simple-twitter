const query = require('../helper/db/query');

module.exports = {
    createContents: async (data) => {
        const selectQ = `INSERT INTO BOARD(contents, image_path,reg_date,mod_date,user_id) VALUES('${data.contentswrite}','${data.image_path}',NOW(),NOW(),'${data.user_id}')`;
        return await query.selectSync(selectQ);
    },
    boardList: async () => {
        const selectQ = `SELECT user.id, user.name, board.b_id, board.contents,board.image_path,date_format(board.mod_date, '%Y-%m-%d %h:%i:%s') from board INNER JOIN user on board.user_id = user.id ORDER BY board.reg_date DESC`;
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
    comment : async (data) =>{
        const createQ =`insert into COMMENT(reg_date,b_id,u_id, contents) VALUES(NOW(),'${data.b_id}','${data.u_id}','${data.comment}')`;
        return await query.querySync(createQ);

    },
    selectComment : async (data) =>{
        const createQ = `select USER.id, user.name, comment.com_id, comment.b_id, date_format(comment.reg_date, '%Y-%m-%d %h:%i:%s'), comment.user_id, COMMENT.contents from COMMENT inner join user on comment.user_id = user.id where b_id = '${data.b_id}' ORDER BY comment.reg_date DESC;`;
        return await query.querySync(createQ);
    },
    deleteComment : async(data) =>{
        const deleteContentQ = `DELETE FROM comment WHERE com_id ='${data.com_id}'`;
        console.log(deleteContentQ);
        return await query.querySync(deleteContentQ);
    },
    updateComment : async(data) =>{
        //세션이 일치하는 것을 조회
        const updateMyComment = `UPDATE comment SET CONTENT = '${data.upcomment}',reg_date, "%Y-%m-%d %h:%i:%s") = NOW()  where com_id = '${data.com_id}'`;
        console.log(updateMyComment)
        return await query.querySync(updateMyContents);
    },
    updateCommentscomment : async (data) =>{
        const updateCommentscomment = `SELECT  com_id ,CONTENT, date_format(mod_date, "%Y-%m-%d %h:%i:%s") FROM comment WHERE com_id = '${data.com_id}'`;
        console.log(updateCommentscomment);
        return await query.selectSync(updateCommentscomment);
    },
};
