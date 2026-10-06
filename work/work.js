const fs = require("fs");
const path = require("path");

const tasksPath = path.join(__dirname, "..", "public", "tasks");

function getTasks() {
    return fs.readdirSync(tasksPath);
}

module.exports = { getTasks };