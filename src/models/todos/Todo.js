const { insert, select, remove, update, updateByDate } = require('./TodoStorage');




class Todo {
  constructor(prop) {
    this.prop = prop;
  }

  async addTodo() {
    return await insert(this.prop);
  }
  async fetchTodos() {
    return await select(this.prop);
  }
  async removeTodo() {
    return await remove(this.prop);
  }
  async modifyTodo() {
    if(!this.prop?.userId){
      return await update(this.prop);
    }else {
      
      return await updateByDate(this.prop);
    }
  }
}

module.exports = Todo;