const jwt = require('jsonwebtoken');

module.exports.verifyToken = function(req, res, next) {
  const token = req.headers.authorization
  
  try {
    const verified = jwt.verify(token, 'hahaha');
    req.admin = verified;
    res.send(req.admin)
  } catch(err) {
    res.status(400);
  }
}