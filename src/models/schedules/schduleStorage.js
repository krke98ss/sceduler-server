const db = require("../../config/db.config");


class SchduleStorage {

  static insert({id, title, start_date, end_date, userId}) {
    console.log("param :" + id);
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO schedules(id, title, start_date, end_date, user_id) VALUES(?, ?, ? ,?, ?);";
      db.query(
        query,
        [id, title, new Date(start_date), new Date(end_date), userId],
        (err, data) => {
          console.log(data);
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    }); 
  }

  static select(userId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM schedules WHERE user_id = ?;";
      db.query(query, [userId], (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data);
      });
    });
  }

  static remove(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM schedules WHERE id = ?;";
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    });
  }
}

module.exports = SchduleStorage;