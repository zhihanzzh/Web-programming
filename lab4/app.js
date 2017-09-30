const todoItems = require('./todo');
const connection = require("./mongoConnection");

async function main() {

    const task1 = await todoItems.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
    console.log("=======the first task=======")
    console.log(task1);
    const task2 = await todoItems.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
    console.log("====All the tasks have been added so far====");
    const tasks1 = await todoItems.getAllTasks();
    console.log(tasks1);

    const removeTask = await todoItems.removeTask(task1._id);
    const tasks2 = await todoItems.getAllTasks();
    console.log("====the remaining tasks after removing the first task====");
    console.log(tasks2);

    const finishedTask = await todoItems.completeTask(task2._id);
    console.log("====the task that has been completed====");
    console.log(finishedTask);

    const db = await connection();
    await db.close();

    console.log("The Database has been closed!");

}

main();