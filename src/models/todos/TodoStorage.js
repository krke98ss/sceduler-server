const db = require("../../config/db.config");
const { param } = require('../../controllers');

class TodoStorage {
  static insert({ id, date, content, success, userId }) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO todos(id, date, content, success, user_id) VALUES(?, ?, ? ,?, ?);";
      db.query(
        query,
        [id, new Date(date), content, success, userId],
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
    const query = `UPDATE todos set 
    ${params.content ? "content" : "success"}=? WHERE id=?;`;
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [params?.content || params?.success, params.id],
        (err, data) => {
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