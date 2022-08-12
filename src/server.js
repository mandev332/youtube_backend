const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const app = express();

app.use("/videos/", express.static(path.join(__dirname, "videos")));
app.use("/files/", express.static(path.join(__dirname, "files")));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use("/getFile", express.static(path.join(__dirname, "files")));
app.use(fileUpload());

const modelMiddleware = require("./middlewares/model.js");
const authTokenMiddleware = require("./middlewares/authToken.js");
const { UPLOADIMAGE, UPLOADVIDEO } = "./routes/upload.js";

app.use(express.json());
app.use(modelMiddleware);

const userRouter = require("./routes/user.js");
const userimgRouter = require("./routes/userimg.js");
const authRouter = require("./routes/auth.js");
const imageRouter = require("./routes/image.js");

app.get("/download/:fileLink", (req, res) => {
  res.download(path.join(__dirname, "videos", req.params.fileLink));
});

app.use(authTokenMiddleware);
app.use("/auth", authRouter);
app.use("/files2", userimgRouter);
app.use("/images", imageRouter);
app.use("/users", userRouter);

app.post("/upload", UPLOADVIDEO);

app.post("/uploadvideo", UPLOADIMAGE);

app.listen(PORT, () =>
  console.log("server Backend is running on http://localhost:" + PORT)
);
