const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const { payload, agent } = jwt.verify(req.headers.token, "KEYCODE");
    if (req["headers"]["user-agent"] != agent)
      throw new Error("You use Fake Token! ");
    return next();
  } catch (error) {
    res.status(401).json({ message: "error.message" });
  }
};
