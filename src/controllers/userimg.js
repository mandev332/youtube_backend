const GET = (req, res) => {
  let users = req.select("files2");
  users.map((user) => {
    delete user.password;
  });
  res.json(users);
};

module.exports = {
  GET,
};
