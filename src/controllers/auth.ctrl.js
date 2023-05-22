const User = require('../models/users/User');
const bcrypt  = require('bcrypt');
const { generateToken } = require('../utils/tokenProcess');



const AuthController = {
  login: async (req, res) => {
    try {
      const user = new User(req.body);
      const response = await user.login();
      if(response.success){
        const { accessToken, refreshToken } = generateToken(response.info);
        res.cookie("accessToken", accessToken, {
          secure: false,
          httpOnly: true,
        });
        res.cookie("refreshToken", refreshToken, {
          secure: false,
          httpOnly: true,
        });
        return res.status(200).json(response);
      }
      return res.status(403).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  regist : async (req, res) => {
    try{
      const salt = parseInt(process.env.SALT);
      const hash = await bcrypt.hash(req.body.pw, salt);
      req.body.pw = hash;
      if (!req.body?.role) {
        req.body.role = 1001;
      }
      const user = new User(req.body);
      const response = await user.regist(); 
      return res.status(200).json(response);
      
    }catch(err) {
      return res.status(500).json(err);
    }
  },
  checkId : async (req, res) => {
    try{
      const user = new User(req.params.id)
      const response = await user.checkId();
      return res.status(200).json(response);

    }catch(err) {
      return res.status(500).json(err);
    
    }
  },

  modifyInfo : async (req, res) => {
    const param = {...req.body, userId : req.userId}
    
    try{
      const user = new User(param);
      const response = await user.modifyInfo();
      return res.status(200).json(response);

    }catch(err) {
      return res.status(500).json(err);
    
    }
  },
  updateProfile : async (req, res) => {
    const param = {profileImg : req.file.filename, userId : req.userId}
    console.log(req.file);
    try{
      const user = new User(param);

      const {success} = await user.modifyInfo();
      
      return res.status(200).json({success, profileImg : req.file.filename});
      

    }catch(err) {
      return res.status(500).json(err);
    
    }
  },
  remove : (req, res) => {

  }

  


}

module.exports = {AuthController};
