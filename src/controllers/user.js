const GET = (req, res) => {
  let users = req.select("users");
  users.map((user) => {
    delete user.password;
  });
  res.json(users);
};

module.exports = {
  GET,
};
