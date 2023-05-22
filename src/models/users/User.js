
const bcrypt  = require('bcrypt');
const { select, insert, update } = require('./UserStorage');



class User {
  constructor(user) {
    this.user = user;
  }
  async login() {
    const response = await select(this.user.id);
    if(response?.id) {
      const match = await bcrypt.compare(this.user.pw, response.pwd);
      if(match) {
        const {pwd, ...others} = response; 
        return {success : true, info : others}
      } 
    }
    return {success : false, msg : "아이디 또는 비밀번호를 다시 확인해주세요"}
  }

  async regist() {
    
    return await insert(this.user);
  
  }


  async checkId () {
    const response = await select(this.user);
    return response
    ? {duplicate : true}
    : {duplicate : false}

  }

  async modifyInfo () {
    return await update(this.user);
  }
}

module.exports = User;