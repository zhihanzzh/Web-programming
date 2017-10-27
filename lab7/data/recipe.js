const mongoCollections = require("../config/mongoCollections");
const recipe = mongoCollections.recipe;
const comments = require("./comments");
const uuid = require('node-uuid');

let exportedMethods = {
    // getAllUsers() {
    //     return users().then((userCollection) => {
    //         return userCollection.find({}).toArray();
    //     });
    // },
    // // This is a fun new syntax that was brought forth in ES6, where we can define
    // // methods on an object with this shorthand!
    async getRecipeById(id) {
        const recipeCollection = await recipe();
        const recipeWithId = await recipeCollection.findOne({ _id: id });

        if (recipeWithId === null) {
            throw "There is no recipe with that id"
        }

        return recipeWithId;
    },

    async getAllrecipe() {
        const recipeCollection = await recipe();
        const recipeWithId = await recipeCollection.find({}).toArray();
        let result = [];
        for (i = 0; i < recipeWithId.length; i++) {
            result[i] =
                {
                    _id: recipeWithId[i]._id,
                    title: recipeWithId[i].title
                };
        }
        return result;
    },

    async addRecipe(title, ingredients, steps, comments) {
        const recipeCollection = await recipe();
        let newRecipe =
            {
                title: title,
                ingredients: ingredients,
                steps: steps,
                comments: comments,
                _id: uuid.v1()
            };
        const recipeInfo = await recipeCollection.insertOne(newRecipe);

        if (recipeInfo.insertedCount === 0) {
            throw "Could not add recipe";
        }

        const newId = recipeInfo.insertedId;

        const addedRecipe = await this.getRecipeById(newId);

        return addedRecipe;

    },

    async updateRecipe(id, updatedRecipe) {
        const recipeCollection = await recipe();
        let updateRecipeData = {};
        if (updatedRecipe.title) {
            updateRecipeData.title = updatedRecipe.title;
        }

        if (updatedRecipe.ingredients) {
            updateRecipeData.ingredients = updatedRecipe.ingredients;
        }

        if (updatedRecipe.steps) {
            updateRecipeData.steps = updatedRecipe.steps;
        }

        let updateCommand = {
            $set: updateRecipeData
        };

        const result = await recipeCollection.updateOne({ _id: id }, updateCommand);

        const newRecipe = await this.getRecipeById(id);

        return newRecipe;
    },

    async removeRecipe(id) {
        const recipeCollection = await recipe();
        const deletionInfo = await recipeCollection.removeOne({ _id: id });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete recipe with id of ${id}`;
        }
    },
    // updateUser(id, updatedUser) {
    //     return this.getUserById(id).then((currentUser) => {
    //         let userUpdateInfo = {
    //             firstName: updatedUser.firstName,
    //             lastName: updatedUser.lastName
    //         };

    //         let updateCommand = {
    //             $set: userUpdateInfo
    //         };

    //         return users().then((userCollection) => {
    //             return userCollection.updateOne({ _id: id }, updateCommand).then(() => {
    //                 return this.getUserById(id);
    //             });
    //         });
    //     });
    // },
    // addPostToUser(userId, postId, postTitle) {
    //     return this.getUserById(id).then((currentUser) => {

    //         return userCollection.updateOne({ _id: id }, {
    //             $addToSet: {
    //                 posts: {
    //                     id: postId,
    //                     title: postTitle
    //                 }
    //             }
    //         });
    //     });
    // },
    // removePostFromUser(userId, postId) {
    //     return this.getUserById(id).then((currentUser) => {
    //         return userCollection.updateOne({ _id: id }, {
    //             $pull: {
    //                 posts: {
    //                     id: postId
    //                 }
    //             }
    //         });
    //     });
    // }
}

module.exports = exportedMethods;