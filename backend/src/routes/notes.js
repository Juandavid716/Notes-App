const { Router } = require("express");
const router = Router();

const {
  getNotes,
  updateNote,
  deleteNote,
  createNote,
  getNote,
} = require("../controllers/notes.controllers");
router.route("/").get(getNotes).post(createNote);

router.route("/:id").delete(deleteNote).put(updateNote).get(getNote);

module.exports = router;
