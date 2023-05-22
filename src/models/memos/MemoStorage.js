const db = require("../../config/db.config");

class MemoStorage {
  static insert({ id, title, content, date, userId }) {
    console.log(typeof date);

    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO memos(id, title, content, date, user_id) VALUES(?, ?, ? ,?, ?);";
      db.query(
        query,
        [id, title, content, new Date(date), userId],
        (err, data) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }

  static select(userId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM memos WHERE user_id = ?;";
      db.query(query, [userId], (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data);
      });
    });
  }
  static remove(id) {
    console.log(id);
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM memos WHERE id = ?;";
      db.query(query, [id], (err, data) => {
        console.log(data);
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    });
  }
  static update({id, title, content}) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE memos set title=?, content=? WHERE id = ?;";
      db.query(query, [title, content, id], (err, data) => {
        console.log(data);
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    });
  }
}

module.exports = MemoStorage;
