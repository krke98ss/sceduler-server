const jwt = require("jsonwebtoken");


const generateToken = (userInfo) => {

  const accessToken = jwt.sign(
    {
      id: userInfo.id,
    },
    process.env.ACCESS_KEY,
    {
      expiresIn: "60m",
      issuer: "YOONO",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: userInfo.id,
    },
    process.env.REFRESH_KEY,
    {
      expiresIn: "24h",
      issuer: "YOONO",
    }
  );
  return { accessToken, refreshToken };
}

const getAccessToken = () => {

}

const refreshToken = () => {

}


const deleteToken = () => {
  
}

module.exports= {generateToken}