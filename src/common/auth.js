require("dotenv").config();
var jwt = require("jsonwebtoken");
const { logger } = require("./log");

const calcToken = (decoded) => {
  let token = jwt.sign({ id: decoded.id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE_MINUTE + "m",
  });
  return token;
};

const checkAuthentication = async (req) => {
  var token = req.headers.authorization;
  if (!token) {
    throw new Error("Unautorization!");
  }
  try {
    var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    throw new Error("TOKEN_EXPIRED");
  }

  token = await calcToken(decoded);
  return token;
};

const isAuth = async (req, res, next) => {
  try {
    req.token = await checkAuthentication(req);
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
    logger.error(`${req.ip} ${error.message}`);
    return;
  }
};

module.exports = {
  calcToken,
  checkAuthentication,
  isAuth,
};
