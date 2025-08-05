const generateCaption = require("../service/ai.service");

const createPostController = async (req, res) => {
  const file = req.file; /* image will come here*/
  // console.log("-----------------> file recieved: ", file);

  // convering buffer to base64Image
  const base64Image = new Buffer.from(file.buffer).toString("base64");
  // console.log(base64Image);

  // now give this file to AI, so that it will genrate caption for that
  const caption = await generateCaption(base64Image);
  // console.log(caption);
  res.status(200).json({
    caption: caption,
  });
};

module.exports = createPostController;
