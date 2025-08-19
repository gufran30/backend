const chatModel = require("../models/chat.model");

async function createChat(req, res) {
  const { title } = req.body;
  console.log("--------- title -------------->", title);

  const chat = await chatModel.create({
    user: req.user._id, // ✅ comes from auth.middleware
    title,
  });
  console.log("--------- chat -------------->", chat);

  res.status(201).json({
    msg: "Chat created successfully",
    chat: {
      _id: chat._id,
      title: chat.title,
      lastActivity: chat.lastActivity,
      user: chat.user,
    },
  });
}

module.exports = createChat;

