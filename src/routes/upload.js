module.exports = {
  UPLOADVIDEO: async (req, res) => {
    try {
      let { video } = req.files;
      let fileName = video.name.replace(/\s/g, "");
      if (
        video.mimetype.split("/")[1] != "mp4" ||
        video.size / 1024 / 1024 > 200 ||
        req.body.title.length > 50
      ) {
        throw new Error(
          "can only mp4 (limit 200 mb) and limit of title 50 letters"
        );
      }

      let memory = Math.floor(video.size / 1024 / 1024);
      let vidLink =
        video.name.split(" ")[0] + (video.name.split(" ")[1] || " ");

      let data = new Date();
      let nowdata =
        data.getFullYear() +
        "/" +
        (data.getMonth() + 1) +
        "/" +
        data.getDay() +
        " | " +
        data.getHours() +
        ":" +
        data.getMinutes().toString();

      let obj = {
        imageUrl: "/videos/" + fileName,
        imageLink: vidLink,
        userId: req.body.userId,
        data: nowdata,
        imageTitle: req.body.title,
        memory: memory + " MB",
      };
      req.insert("videos", obj);

      const filePath = path.join(__dirname, "videos", fileName);
      await video.mv(filePath);
      res.end("5555");
    } catch (error) {
      res.status(400).json({ massage: error.massage });
    }
  },
  UPLOADIMAGE: async (req, res) => {
    const { image } = req.files;

    const fileName = image.name.replace(/\s/g, "");
    if (
      !["jpg", "jpeg", "png"].includes(image.mimetype.split("/")[1]) ||
      image.size / 1024 / 1024 > 10
    ) {
      throw new Error(
        "can only jpg (limit 10 mb) and limit of title 20 letters"
      );
    }
    let data = {
      imageUrl: "/files/" + fileName,
      imageLink: fileName,
      userId: req.body.userId,
    };
    req.insert("files2", data);

    const filePath = path.join(__dirname, "files", fileName);
    await image.mv(filePath);
    res.end("5555");
  },
};
