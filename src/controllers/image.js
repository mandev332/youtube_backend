const GET = (req, res) => {
  const { userId } = req.query;
  const files = req.select("videos");
  if (userId) {
    res.status(200).json(files.filter((file) => file.userId == userId));
  } else {
    res.status(200).json(files);
  }
};
const PUT = (req, res) => {
  const files = req.select("videos");
  let index = files.findIndex((el) => el.imageUrl == req.body.url);
  files[index].imageTitle = req.body.imageTitle;
  req.update("videos", files);
  res.status(201).json({ massage: "update file!" });
};
const DELETE = (req, res) => {
  const files = req.select("videos");
  let video = files.filter((el) => el.imageUrl != req.body.video);

  req.delete("videos", { infos: video, link: req.body.video });
  res.status(201).json({ massage: "deleted file!" });
};
module.exports = {
  GET,
  PUT,
  DELETE,
};
