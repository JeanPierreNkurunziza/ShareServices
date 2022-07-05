const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const userRepository = require("../repository/user-repository")

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
isAdmin = (req, res, next) => {
  userRepository.getOne(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].role === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};
isMember = (req, res, next) => {
  userRepository.getOne(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].role === "member") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require member Role!"
      });
    });
  });
};
isMemberOrAdmin = (req, res, next) => {
  userRepository.getOne(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].role === "member") {
          next();
          return;
        }
        if (roles[i].role === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isMember: isMember,
  isMemberOrAdmin: isMemberOrAdmin
};
module.exports = authJwt;
