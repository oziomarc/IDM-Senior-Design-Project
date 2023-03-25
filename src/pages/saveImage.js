const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/save-image', (req, res) => {
  const imageData = req.body.image;
  // Save the imageData to a database or file system
  // ...
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});