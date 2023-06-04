const User = require('../models/users/User');
const bcrypt  = require('bcrypt');
const fs  = require('fs');
const qs = require('qs');
const { generateToken } = require('../utils/tokenProcess');
const {OAuth2Client, GoogleAuth} = require('google-auth-library');
const axios = require('axios');

const AuthController = {
  login: async (req, res) => {
    try {
      const user = new User(req.body);
      const response = await user.login();
      if (response.success) {
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
  googleLogin: async (req, res) => {
    const {token} = req.body;
    let url = 'https://www.googleapis.com/oauth2/v2/userinfo';

    const response = await axios.get(url, {
      headers : {
        Authorization: `Bearer ${token}`,
      }
    })
    console.log(response.data);
    const {email, name} = response.data
    const userInfo = {
      id : email,
      name : name
    }

    const { accessToken, refreshToken } = generateToken(userInfo);
        res.cookie("accessToken", accessToken, {
          secure: false,
          httpOnly: true,
        });
        res.cookie("refreshToken", refreshToken, {
          secure: false,
          httpOnly: true,
        });

    res.status(201).json(userInfo);
    
  },

  kakaoLogin: async (req, res) => {


    const {code} = (req.body);

    const config = {
      'client_id': process.env.KAKAO_CLIENT_ID,
      'redirect_uri': process.env.KAKAO_REDIRECT_URL,
      'grant_type': 'authorization_code',
      'code' : code,
    }
  try{
    const {data} = await axios.post('https://kauth.kakao.com/oauth/token',
    qs.stringify(config),
    {
      headers : {
        "content-type" : "application/x-www-form-urlencoded"
      },
    })
    
    const access_token = data['access_token'];

    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers : {
        "Authorization" : `Bearer ${access_token}`
      },
    }) 
    const {id} = response.data;
    
    }catch(err) {
      console.log(err);
    }

  },
  regist: async (req, res) => {
    try {
      const salt = parseInt(process.env.SALT);
      const hash = await bcrypt.hash(req.body.pw, salt);
      req.body.pw = hash;
      if (!req.body?.role) {
        req.body.role = 1001;
      }
      const user = new User(req.body);
      const response = await user.regist();
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  checkId: async (req, res) => {
    try {
      const user = new User(req.params.id);
      const response = await user.checkId();
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  modifyInfo: async (req, res) => {
    const param = { ...req.body, userId: req.userId };

    try {
      const user = new User(param);
      const response = await user.modifyInfo();
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateProfile: async (req, res) => {
    const param = {
      profileImg: "http://localhost:5500/uploads/" + req.file.filename,
      userId: req.userId,
    };

    try {
      const user = new User(param);

      const { success } = await user.updateProfileImg();

      return res.status(200).json({ success, profile_img: param.profileImg });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  removeProfile: async (req, res) => {
    const file_path = req.body.profile_img;
    const file_name = file_path.split("uploads/")[1];

    try {
      if (fs.existsSync("uploads/" + file_name)) {
        fs.unlinkSync("uploads/" + file_name);
        const user = new User(req.userId);
        const response = await user.removeProfileImg();
        return res.status(200).json(response);
      }
      return res.status(200).json("");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  remove: (req, res) => {},
};

module.exports = {AuthController};
