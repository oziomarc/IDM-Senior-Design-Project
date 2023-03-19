// const express = require("express");
// const app = express();
// const path = require("path");
// const bodyParser = require("body-parser");
// const { v4: uuidv4 } = require("uuid");
// const fs = require("fs");

// app.use(bodyParser.json());

// app.post("/save-image", (req, res) => {
//   const imageData = req.body.image.split(",")[1];
//   const imageBuffer = Buffer.from(imageData, "base64");
//   const imageName = `${uuidv4()}.png`;
//   const imagePath = path.join(__dirname, "public", "images", imageName);
//   fs.writeFile(imagePath, imageBuffer, error => {
//     if (error) {
//       console.log(error);
//       res.json({ success: false, error: "Failed to save image" });
//     } else {
//       const imageUrl = `/images/${imageName}`;
//       res.json({ success: true, imageUrl });
//     }
//   });
// });

// app.get("/get-images", (req, res) => {
//   const imageDirectory = path.join(__dirname, "public", "images");
//   fs.readdir(imageDirectory, (error, files) => {
//     if (error) {
//       console.log(error);
//       res.json({ success: false, error: "Failed" })
//     }
//   })
// })


// app.use(express.static(path.join(__dirname, "public")));

// app.listen(3000, () => console.log("Server started"));
