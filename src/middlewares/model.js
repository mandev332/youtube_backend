const path = require("path");
const fs = require("fs");

const model = (req, res, next) => {
  req.select = function (fileName) {
    let files = fs.readFileSync(
      path.join(process.cwd(), "src", "database", fileName + ".json"),
      "UTF-8"
    );
    files = files ? JSON.parse(files) : [];
    return files;
  };

  req.insert = function (fileName, data) {
    let file = fs.readFileSync(
      path.join(process.cwd(), "src", "database", fileName + ".json"),
      "UTF-8"
    );
    file = file ? JSON.parse(file) : [];
    file.push(data);
    let files = fs.writeFileSync(
      path.join(process.cwd(), "src", "database", fileName + ".json"),
      JSON.stringify(file, null, 4)
    );
    return true;
  };
  req.delete = function (fileName, data) {
    let files = fs.writeFileSync(
      path.join(process.cwd(), "src", "database", fileName + ".json"),
      JSON.stringify(data.infos, null, 4)
    );
    let link = data.link.split("/")[2];
    let deletevideo = fs.unlinkSync(
      path.join(process.cwd(), "src", "videos", link)
    );
    return true;
  };
  req.update = function (fileName, data) {
    let files = fs.writeFileSync(
      path.join(process.cwd(), "src", "database", fileName + ".json"),
      JSON.stringify(data, null, 4)
    );
    return true;
  };

  return next();
};

module.exports = model;
