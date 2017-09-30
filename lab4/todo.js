const uuidv1 = require('uuid/v1');
const mongoCollections = require("./mongoCollections");
const todoItems = mongoCollections.todoItems;

module.exports = {

    async getTask(id) {
        if (!id) {
            throw "You must provide an id for your task";
        }

        const todoCollection = await todoItems();
        const todoItem = await todoCollection.findOne({ _id: id });
        if (todoItem === null) {
            throw "No todoItem with that id";
        }
        return todoItem;

    },

    async createTask(title, description) {
        if (!title) {
            throw "You must provide a valid title for your todoItem";
        }


        if (!description) {
            throw "You must provide a valid description";
        }

        const todoCollection = await todoItems();
        let newTodo = {
            _id: uuidv1(),
            title: title,
            description: description,
            completed: false,
            completedAt: null
        };

        const insertInfo = await todoCollection.insertOne(newTodo);
        if (insertInfo.insertedCount === 0) {
            throw "Could not add todeItem";
        }

        const newId = insertInfo.insertedId;

        const todo = await this.getTask(newId);
        return todo;
    },

    async getAllTasks() {
        const todoCollection = await todoItems();
        const todo = await todoCollection.find({}).toArray();
        return todo;
    },

    async completeTask(taskId) {
        if (!taskId) {
            throw "You must provide an id for your task";
        }
        let timeNow = new Date();

        const todoCollection = await todoItems();
        const todo = await this.getTask(taskId);
        const updatedTodoItem = {
            _id: todo._id,
            title: todo.title,
            description: todo.description,
            completed: true,
            completedAt: timeNow
        };

        const updateInfo = await todoCollection.updateOne({ _id: taskId }, updatedTodoItem);

        if (updateInfo.modifiedCount === 0) {
            throw "could not update this todoItem successfully";
        }

        return await this.getTask(taskId);
    },

    async removeTask(id) {
        if (!id) {
            throw "You must provide an id for your task";
        }
        const todoCollection = await todoItems();
        const deletionInfo = todoCollection.removeOne({ _id: id });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete todoItem with id of ${id}`;
        }
    }

};