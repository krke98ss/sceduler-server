const jwt = require("jsonwebtoken");
const { select } = require('../models/users/UserStorage');

const auth = async (req, res, next) => {
  console.log("authenticate");
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_KEY);
    req.userId = data.id;
    return next();
    
    
  }catch(err) {
    if (err.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        msg: "토큰이 만료되었습니다.",
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        code: 401,
        msg: "유효하지 않은 토큰입니다.",
      });
    }
  }
}
  /* try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_KEY);
    const response = await UserStorage.select(data.id);
    if (response?.userId) {
      req.user = data.id;
      return next();
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        msg: "토큰이 만료되었습니다.",
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        code: 401,
        msg: "유효하지 않은 토큰입니다.",
      });
    }
  } */


module.exports = { auth };
