const express = require('express');

const app = express();
const port = 3000;
const controller = require("./controller");
app.use( express.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post("/notes", controller.createNote)

app.get("/notes", controller.getAllNotes)

app.get("/notes/:id", controller.getOneNote)

app.put("/notes/:id", controller.updateOneNote);

app.delete("/notes/:id", controller.deleteOneNote)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});