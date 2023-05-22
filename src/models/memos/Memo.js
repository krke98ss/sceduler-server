const { insert, select, remove, update} = require('./MemoStorage');


class Memo {
  constructor(prop) {
    this.prop = prop;
  }

  async addMemo() {
    return await insert(this.prop);
  }
  async fetchMemos() {
    return await select(this.prop);
  }
  async removeMemo() {
    return await remove(this.prop);
  }
  async modifyMemo() {
    return await update(this.prop);
  }


}

module.exports = Memo;