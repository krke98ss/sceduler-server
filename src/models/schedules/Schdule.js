const { insert, select, remove } = require('./schduleStorage');


class Schdule {
  constructor(prop) {
    this.prop = prop;
  }

  async addSchdule() {
    return await insert(this.prop);
  }
  async fetchSchedules() {
    return await select(this.prop);
  }
  async removeSchedule() {
    return await remove(this.prop);
  }
  
}

module.exports = Schdule;