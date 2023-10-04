const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../helpers/env");

module.exports = {
  auth: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({data: "Token required"})
      }
      const token = authorization.split(" ")[1];
      const decode = await jwt.verify(token, JWT_SECRET);
      req.userData = decode._doc;
      next();
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Internal Server Error"
      })
    }
  },
  isAdmin: async (req, res, next) => {
    try {
      const user = req.userData;
      if (user.role === "0") {
        next();
      } else {
        return res.status(401).json({data: "Only Admin"})
      }
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Internal Server Error"
      })
    }
  },
  isUser: async (req, res, next) => {
    try {
      const user = req.userData;
      if (user.role === "1") {
        next();
      } else {
        return res.status(401).json({data: "Only User"})
      }
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Internal Server Error"
      })
    }
  },
};
