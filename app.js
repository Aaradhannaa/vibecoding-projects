const express = require("express");
const fs = require("fs");
const path = require("path");
const { getTasks } = require("./work/work");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const PORT = 2222;

app.get("/", (req, res) => {
    const tasks = getTasks();
    res.render("index", { tasks });
});
app.post("/create", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    const fileName = title + ".txt";
    const filePath = path.join(__dirname, "public", "tasks", fileName);

    fs.writeFile(filePath, `Title: ${title}\n\nDescription:\n${description}`, (err) => {
        if (err) {
    console.log(err);
    return res.send("Error creating task: " + err.message);
}

        res.redirect("/");
    });
});
app.get("/task/:filename", (req, res) => {
    const filename = req.params.filename;

    const filePath = path.join(__dirname, "public", "tasks", filename);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return res.send("Task not found");
        }

        res.render("task", {
            title: filename.replace(".txt", ""),
            content: data
        });
    });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});