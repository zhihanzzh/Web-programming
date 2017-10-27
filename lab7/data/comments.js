const mongoCollections = require("../config/mongoCollections");
const comments = mongoCollections.recipe;
const recipe = require("./recipe");
const uuid = require("node-uuid");

const exportedMethods = {
  async getCommentByRecipeId(recipeId) {
    if (!recipeId) throw "No recipeId provided";

    const commentsCollection = await comments();
    const recipe = await commentsCollection.findOne({ _id: recipeId });

    if (recipe === null) {
      throw "There is no comment with that recipe id"
    }
    let result = [];
    for (let i = 0; i < recipe.comments.length; i++) {
      const comment = recipe.comments[i]
      result[i] = {
        _id: comment._id,
        recipeId: recipe._id,
        recipeTitle: recipe.title,
        poster: comment.poster,
        comment: comment.comment
      };
    };
    return result;
  },

  async getCommentByCommentId(commentId) {
    if (!commentId) throw "No commentId provided";

    const commentsCollection = await comments();
    const commentWithCommmentId = await commentsCollection.findOne({ "comments._id": commentId });

    if (commentWithCommmentId === null) {
      throw "There is no comment with that comment id"
    }
    for (let i = 0; i < commentWithCommmentId.comments.length; i++) {
      if (commentWithCommmentId.comments[i]._id == commentId) {
        return {
          _id: commentWithCommmentId.comments[i]._id,
          recipeId: commentWithCommmentId._id,
          recipeTitle: commentWithCommmentId.title,
          poster: commentWithCommmentId.comments[i].poster,
          comment: commentWithCommmentId.comments[i].comment,
        }
        // return commentWithCommmentId.comments[a];
      }
    }
  },

  async addComment(poster, comment, recipeId) {
    const commentsCollection = await comments();
    let newComment =
      {
        poster: poster,
        comment: comment,
        _id: uuid.v1()
      };

    const updateInfo = await commentsCollection.update({ _id: recipeId }, { $addToSet: { "comments": newComment } });

    return await this.getCommentByRecipeId(recipeId);
  },

  async updateComment(commentId, comment) {
    const commentsCollection = await comments();
    let updatecommentData = {};
    if (comment.poster) {
      updatecommentData["comments.$.poster"] = comment.poster;
    }
    if (comment.comment) {
      updatecommentData["comments.$.comment"] = comment.comment;
    }
    let updatecommand = {
      $set: updatecommentData
    };

    const updateInfo = await commentsCollection.update({ "comments._id": commentId }, updatecommand);

    if (updateInfo.modifiedCount === 0) {
      throw "could not update this todoItem successfully";
    }

    return await this.getCommentByCommentId(commentId);
  },

  async removeComment(commentId) {
    const commentsCollection = await comments();
    let comment = await exportedMethods.getCommentByCommentId(commentId);
    await commentsCollection.update({ "comments._id": commentId }, { $pull: { "comments": comment } });
    // if (deletionInfo.deletedCount === 0) {
    //   throw `Could not delete post with id of ${id}`;
    // }
  }

};

module.exports = exportedMethods;