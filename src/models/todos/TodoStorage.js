const db = require("../../config/db.config");
const { param } = require('../../controllers');

class TodoStorage {
  static insert({ id, date, content, time, tag_color, success, userId }) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO todos(id, date, content, time, tag_color,success, user_id ) VALUES(?, ?, ? ,?, ?, ?, ?);";
      db.query(
        query,
        [id, new Date(date), content, new Date(time), tag_color, success, userId],
        (err, data) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }
  static select(userId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM todos WHERE user_id = ?;";
      db.query(query, [userId], (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data);
      });
    });
  }
  static remove(params) {
    const query = `DELETE FROM todos WHERE
    ${params?.userId ? "date=? AND user_id=?" : "id=?"}`;
    
    const sqlParam = params?.userId ? [new Date(params.date), params.userId] : [params];
    
    
    return new Promise((resolve, reject) => {
      db.query(query, sqlParam, (err, data) => {
        console.log(data);
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    });
  }
  static update(params) {
    
    let query = `UPDATE todos SET ${params.content ? 'content=? ' : 'success=? '}`;
    let queryParam = [];

    if(params.content){
      queryParam.push(params.content);
    } 
    if(params.success !== null && params.success !== undefined){
      queryParam.push(params.success);
    }
    if(params.time){
      query +=', time=? '
      queryParam.push(new Date(params.time));
    }
    if(params.tagColor){
      query +=', tag_color=? '
      queryParam.push(params.tagColor);
    }
    query+='WHERE id=?'
    queryParam.push(params.id);

    console.log(query); 
    console.log(queryParam);
    
      return new Promise((resolve, reject) => {
      db.query(
        query,
        queryParam,
        (err, data) => {
          console.log(data);
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });   
  }
  static updateByDate ({userId, date, success}) {
    console.log(userId);
    const query = 'UPDATE todos set success = ? WHERE date = ? AND user_id = ?'
    
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [success, new Date(date), userId],
        (err, data) => {
          console.log(data);
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }
}

module.exports = TodoStorage;