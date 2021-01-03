const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();

app.use(fileUpload());
const PORT = 5000;

let reqPath = path.join(__dirname, "../");

//upload endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No File Was Uploaded" });
  }
  const file = req.files.file;
  console.log(file)
  file.mv(`${reqPath}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(PORT, console.log(`app is now running at port ${PORT}`));
