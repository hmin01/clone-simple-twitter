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
        const deleteContentQ = `DELETE FROM BOARD WHERE b_id ='${data.b_id}'`;
        console.log(deleteContentQ);
        return await query.querySync(deleteContentQ);
    },
    selectMyContents : async(data) =>{
        //세션이 일치하는 것을 조회
        const selectMyContents = `SELECT * FROM WHERE user_id ='${data.user_id}'`;
        return await query.selectSync(selectMyContents);
    },
    updateContents : async(data) =>{
        //세션이 일치하는 것을 조회
        const updateMyContents = `UPDATE BOARD SET CONTENTS = '${data.contents}' where b_id = '${data.b_id}'`;
        return await query.querySync(updateMyContents);
    },
    updateContentsBoard : async (data) =>{
        const updateContentsBoard = `SELECT CONTENTS, MOD_DATE FROM BOARD WHERE b_id = '${data.b_id}'`;
        return await query.selectSync(updateContentsBoard);
    },
    comment : async (data) =>{
        const commetInput = `INSERT INTO COMMENT(reg_date,b_id,user_id,contents) VALUES(NOW(),'${data.board_id}', '${data.user_id}','${data.comment}')`
        //console.log(commetInput);
        return await query.querySync(commetInput);
    },
    selectComment : async(data) =>{
        const suchBoardComment = `SELECT comment.contents,comment.com_id,comment.b_id,comment.user_id,user.name,date_format(comment.reg_date,'%Y-%m-%d') from comment INNER JOIN user on user.id = comment.user_id where comment.b_id = '${data.b_id}'ORDER BY comment.reg_date ASC`;
        //console.log(suchBoardComment);
        return await query.selectSync(suchBoardComment);
    },
    updateComment : async(data) =>{
        const updateComment = `UPDATE COMMENT SET CONTENT='${data.contents}' where comment_id='${data.com_id}'`;
        console.log(updateComment);
        //console.log(suchBoardComment);
        return await query.querySync(updateComment);
    },
    updateCommentsBoard : async (data) =>{
        const updateCommentsBoard = `SELECT CONTENTS FROM COMMENT WHERE com_id = '${data.com_id}'`;
        console.log(updateCommentsBoard);
        return await query.selectSync(updateCommentsBoard);
    },
    deleteComment : async(data) =>{
        const deleteContentQ = `DELETE FROM comments WHERE com_id ='${data.com_id}'`;
        console.log(deleteContentQ);
        return await query.querySync(deleteContentQ);
    },

}