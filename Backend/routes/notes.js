const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route:1 Get all the notes using: Get "/api/notes/getuser". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id });
      res.json(notes);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
   }
})


// Route:2 Add a new note using: Post "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
   body('title', 'title length should be geater than 2 characters').isLength({ min: 3 }),
   body('description', 'description length must be greater than 4 characters').isLength({ min: 5 }),
], async (req, res) => {
   try {
      const { title, description, tag } = req.body;
      // if there are errors then return Bad request with the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
         title, description, tag, user: req.user.id
      })
      const savedNote = await note.save();
      res.json(savedNote);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
   }
})

// Route:3 Update the existing note using: Put "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
   const { title, description, tag } = req.body;
   try {

      const newNote = {}; // create newnote object
      if (title) {
         newNote.title = title;
      }
      if (description) {
         newNote.description = description;
      }
      if (tag) {
         newNote.tag = tag;
      }

      // Find note to be updated and upadate to it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found"); }

      if (note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed"); }

      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
      res.send(note);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
   }
})


// Route:4 Delete the existing note using: Delete "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   try {
      // Find note to be deleted and delete to it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found"); }

      if (note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed"); }

      note = await Note.findOneAndDelete(req.params.id);
      res.json({ "Success": "Note has been deleted" });
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
   }
})

module.exports = router; 