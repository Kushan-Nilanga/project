let express = require("express");

let app = express();

app.listen(3000, function () {
  console.log("Notes service listening on port 3000!");
});

// response body structure
// {
//   message: "Hello World from Notes Service!",
//   notes: [
//     {
//       id: 1,
//       title: "Note 1",
//       body: "This is the body of note 1",
//       created_at: "2018-01-01T12:00:00Z",
//       updated_at: "2018-01-01T12:00:00Z",
//     },
//   ],
// };

/******************** GET / **********************/
app.get("/", function (req, res) {
  resp_body = handleGet();
  res.send(resp_body);
});

/** handle GET_
 * @returns {object} response_body
 */
function handleGet() {
  response_body = {
    message: "Hello World from Notes Service!",
    notes: [],
  };

  return response_body;
}

/******************** GET /notes/:user_id **********************/
app.get("/notes/:user_id", function (req, res) {
  resp_body = handleGetNotesUserId(req.params.user_id);
  res.send(resp_body);
});

/** handle GET /notes/:user_id
 * @param {string} user_id
 * @returns {object} response_body
 * @returns {string} response_body.message
 * @returns {object[]} response_body.notes
 * @returns {string} response_body.notes[].id
 * @returns {string} response_body.notes[].title
 * @returns {string} response_body.notes[].body
 * @returns {string} response_body.notes[].created_at
 * @returns {string} response_body.notes[].updated_at
 */
function handleGetNotesUserId(user_id) {
  response_body = {
    message: "success",
    notes: [],
  };

  return response_body;
}

/******************** GET /notes/:user_id/:note_id **********************/
app.get("/notes/:user_id/:note_id", function (req, res) {
  resp_body = handleGetNotesUserIdNoteId(
    req.params.user_id,
    req.params.note_id
  );
  res.send(resp_body);
});

/** handle GET /notes/:user_id/:note_id
 * @param {string} user_id
 * @param {string} note_id
 * @returns {object} response_body
 * @returns {string} response_body.message
 * @returns {object[]} response_body.notes
 * @returns {string} response_body.notes[].id
 * @returns {string} response_body.notes[].title
 * @returns {string} response_body.notes[].body
 * @returns {string} response_body.notes[].created_at
 * @returns {string} response_body.notes[].updated_at
 */
function handleGetNotesUserIdNoteId(user_id, note_id) {
  response_body = {
    message: "success",
    notes: [],
  };

  return response_body;
}

/******************** POST /notes/:user_id **********************/
app.post("/notes/:user_id", function (req, res) {
  resp_body = handlePostNotesUserId(req.params.user_id, req.body);
  res.send(resp_body);
});

/** handle POST /notes/:user_id
 * @param {string} user_id
 * @param {object} body
 * @param {string} body.title
 * @param {string} body.body
 * @returns {object} response_body
 * @returns {string} response_body.message
 * @returns {object[]} response_body.notes
 * @returns {string} response_body.notes[].id
 * @returns {string} response_body.notes[].title
 * @returns {string} response_body.notes[].body
 * @returns {string} response_body.notes[].created_at
 * @returns {string} response_body.notes[].updated_at
 */
function handlePostNotesUserId(user_id, body) {
  response_body = {
    message: "success",
    notes: [],
  };

  return response_body;
}

/******************** PUT /notes/:user_id/:note_id **********************/
app.put("/notes/:user_id/:note_id", function (req, res) {
  resp_body = handlePutNotesUserIdNoteId(
    req.params.user_id,
    req.params.note_id,
    req.body
  );
  res.send(resp_body);
});

/** handle PUT /notes/:user_id/:note_id
 * @param {string} user_id
 * @param {string} note_id
 * @param {object} body
 * @param {string} body.title
 * @param {string} body.body
 * @returns {object} response_body
 * @returns {string} response_body.message
 * @returns {object[]} response_body.notes
 * @returns {string} response_body.notes[].id
 * @returns {string} response_body.notes[].title
 * @returns {string} response_body.notes[].body
 * @returns {string} response_body.notes[].created_at
 * @returns {string} response_body.notes[].updated_at
 */
function handlePutNotesUserIdNoteId(user_id, note_id, body) {
  response_body = {
    message: "success",
    notes: [],
  };

  return response_body;
}

/******************** DELETE /notes/:user_id/:note_id **********************/
app.delete("/notes/:user_id/:note_id", function (req, res) {
  resp_body = handleDeleteNotesUserIdNoteId(
    req.params.user_id,
    req.params.note_id
  );
  res.send(resp_body);
});

/** handle DELETE /notes/:user_id/:note_id
 * @param {string} user_id
 * @param {string} note_id
 * @returns {object} response_body
 * @returns {string} response_body.message
 * @returns {object[]} response_body.notes
 * @returns {string} response_body.notes[].id
 * @returns {string} response_body.notes[].title
 * @returns {string} response_body.notes[].body
 * @returns {string} response_body.notes[].created_at
 * @returns {string} response_body.notes[].updated_at
 */
function handleDeleteNotesUserIdNoteId(user_id, note_id) {
  response_body = {
    message: "success",
    notes: [],
  };

  return response_body;
}
