const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const { v4: uuid4 } = require("uuid");

const createPostController = async (req, res) => {
  const file = req.file; /* image will come here */
  // console.log("----------file recieved------->", file);

  // covering buffer to base64Image
  const base64Image = new Buffer.from(file.buffer).toString("base64");

  
  // // now give this file to AI, for caption generation
  // const caption = await generateCaption(base64Image);   /* <------------------------------ */

  // // uplaoding file to ImageKit
  // const result = await uploadFile(                     /* <------------------------------ */
  //   file.buffer,
  //   `${uuid4()}` /* generate unique file name */
  // );

  /* optimized code for above two <----------------- */
  const [caption, result] = await Promise.all([
    generateCaption(base64Image),
    uploadFile(file.buffer, `${uuid4()}`),
  ]);

  const post = await postModel.create({
    caption: caption,
    image: result.url,
    user: req.user._id,
  });

  res.status(201).json({
    msg: "Post created successfully",
    post,
  });
};

module.exports = createPostController;
