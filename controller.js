const pool = require("./db")

exports.createNote = async (req, res) => {
    try {
        console.log(req.body);
        const { description } = req.body;
        const newNote = await pool.query("INSERT INTO note (description) VALUES($1) RETURNING *", [description])
        res.json(newNote.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
}

exports.getAllNotes = async (req, res) => {
    try {
        const allNotes = await pool.query("SELECT * FROM note");
        res.json(allNotes.rows);

    } catch (err) {
        console.error(err.message)
    }
}

exports.getOneNote = async (req, res) => {
    try {
        const { id } = req.params;
        const oneNote = await pool.query("SELECT * FROM note WHERE note_id = $1", [id]);
        res.json(oneNote.rows[0]);

    } catch (err) {
        console.error(err.message)
    }
}

exports.updateOneNote = async (req, res) => {
    try {

        const { id } = req.params;
        const { description } = req.body

        const updatedNote = await pool.query("UPDATE note SET description = $1 WHERE note_id= $2", [description, id])

        res.json("Note has been updated")
    } catch (err) {
        console.error(err.message)

    }
};

exports.deleteOneNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteNote = await pool.query("DELETE FROM note WHERE note_id = $1", [id]);
        res.json("Note has been deleted");
    } catch (err) {
        console.error(err.message)

    }
}   