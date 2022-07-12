const jwt = require('jsonwebtoken');


module.exports.verifyToken = function (req, res, next) {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(' ')[1];

    try {
      jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(401).json("Token is invalid");
        }
        req.user = user;
        next();

      });

    } catch (err) {
      res.status(401).json("You're not authenticated");
    }
  }

}

module.exports.verifyTokenAndAdminAuth = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.id == req.params.id || req.user.admin) {
      next()
    }
    else {
      res.status(403).json("Action not allowed");
    }
  })
}