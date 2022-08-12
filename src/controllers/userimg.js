const GET = (req, res) => {
  let users = req.select("files2");
  res.json(users);
};

module.exports = {
  GET,
};
