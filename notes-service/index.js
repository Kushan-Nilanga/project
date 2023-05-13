let express = require("express");
let mongoose = require("mongoose");
let mongo_user = process.env.MONGO_INITDB_ROOT_USERNAME;
let mongo_pass = process.env.MONGO_INITDB_ROOT_PASSWORD;
let mongo_server = process.env.MONGO_SERVER;

console.log("mongo_user", mongo_user);
console.log("mongo_pass", mongo_pass);

mongoose.connect(
  `mongodb://${mongo_user}:${mongo_pass}@${mongo_server}:27017/notes?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let app = express();
app.use(express.json());

let Note = mongoose.model("Note", {
  user_id: String,
  title: String,
  body: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

app.listen(80, async () => {
  console.log("Notes service listening on port 3000!");
});

/******************** GET / **********************/
app.get("/", async (req, res) => {
  res.send("Hello World from Notes Service!");
});

/******************** POST /api/note/:user_id *************/
app.post("/api/note/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { title, body } = req.body;
    const note = new Note({
      user_id,
      title,
      body,
    });
    await note.save();

    res.send({
      message: "Note created successfully!",
      note,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating note!",
      error,
    });
  }
});

/******************** PUT /api/note/:user_id/:id **********/
app.put("/api/note/:user_id/:id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { id } = req.params;
    const { title, body } = req.body;

    // update the note that matches the id
    const note = await Note.findByIdAndUpdate(
      id,
      {
        user_id,
        title,
        body,
        updated_at: Date.now(),
      },
      { new: true }
    );

    res.send({
      message: "Note updated successfully!",
      note,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error updating note!",
      error,
    });
  }
});

/******************** DELETE /api/note/:user_id/:id *******/
app.delete("/api/note/:user_id/:id", async (req, res) => {
  try {
    const { user_id, id } = req.params;

    // delete the note that matches the id
    const note = await Note.findByIdAndDelete(id);

    res.send({
      message: "Note deleted successfully!",
      note,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting note!",
      error,
    });
  }
});

/******************** GET /api/note/:user_id **************/
app.get("/api/note/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    // get all notes that match the user_id
    const notes = await Note.find({ user_id });

    res.send({
      message: "Notes retrieved successfully!",
      notes,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving notes!",
      error,
    });
  }
});

/******************** GET /api/note/:user_id/:id **********/
app.get("/api/note/:user_id/:id", async (req, res) => {
  try {
    const { user_id, id } = req.params;

    // get the note that matches the id
    const note = await Note.findById(id);

    res.send({
      message: "Note retrieved successfully!",
      note,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving note!",
      error,
    });
  }
});

/**
 * Summary
 *
 * POST /api/note/:user_id        : { title, body }
 * PUT /api/note/:user_id/:id     : { title, body }
 * DELETE /api/note/:user_id/:id  : {}
 * GET /api/note/:user_id         : {}
 * GET /api/note/:user_id/:id     : {}
 *
 */
