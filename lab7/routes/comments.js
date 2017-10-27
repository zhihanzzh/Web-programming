const express = require("express");
const router = express.Router();
const data = require("../data");
const commentsData = data.comments;

router.get("/recipe/:recipeId", async (req, res) => {
  try {
    const commentWithRecipeId = await commentsData.getCommentByRecipeId(req.params.recipeId);
    res.json(commentWithRecipeId);
  } catch (e) {
    res.status(404).json({ error: "the comments of recipe not found" });
  }
});

router.get("/:commentId", async (req, res) => {
  try {
    const commentWithCommentId = await commentsData.getCommentByCommentId(req.params.commentId);
    res.json(commentWithCommentId );
  } catch (e) {
    res.status(404).json({ error: "comment not found" });
  }
});


router.post("/:recipeId", async (req, res) => {
  let commentData = req.body;
  try {
    const newPost = await commentsData.addComment(commentData.poster, commentData.comment, req.params.recipeId);
    res.json(newPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put("/:recipeId/:commentId", async (req, res) => {
  let updatedData = req.body;

  try {
    await commentsData.getCommentByCommentId(req.params.commentId);
  } catch (e) {
    res.status(404).json({ error: "Comment not found" });
  }

  try {
    const updatedComment = await commentsData.updateComment(req.params.commentId, updatedData);
    res.json(updatedComment);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await commentsData.getCommentByCommentId(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "comment not found" });
    return;
  }
  try {
    await commentsData.removeComment(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
module.exports = router;