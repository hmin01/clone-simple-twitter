const query = require('../helper/db/query');

module.exports = {
    createContents : async(data) =>{
        const createQ = `INSERT INTO BOARD(contents,image_path,reg_date,mod_date,user_id) VALUES('${data.contents}','${data.image_path}',NOW(),NOW(),'${data.user_id}')`
        return await query.querySync(createQ);
    },
    boardList : async() =>{
        const boardListQ = 'SELECT user.id, user.name, board.b_id, board.contents,board.image_path,board.mod_date from board INNER JOIN user on board.user_id = user.id ORDER BY board.reg_date DESC';
        return await query.selectSync(boardListQ);
    },
    deleteContents : async(data) =>{
        //usersession이랑 연동시키
        const deleteContentQ = `DELETE FROM BOARD WHERE b_id ='${$data.b_id}`;
        return await query.querySync(deleteContetQ);
    },
    selectMyContents : async(data) =>{
        //세션이 일치하는 것을 조회
        const selectMyContents = `SELECT * FROM WHERE user_id ='${data.user_id}'`;
        return await query.selectSync(selectMyContents);
    }
}