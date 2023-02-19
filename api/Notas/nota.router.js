const { Router } = require('express');
const NotesControllers = require('./notas.infraestructure');

const router = Router();

router

  .get( '/', NotesControllers.getAllNotes )
  .get( '/:id', NotesControllers.getNoteByID )

  .post( '/', NotesControllers.saveNote )

  .put( '/:id', NotesControllers.editNote )

  .delete( '/:id', NotesControllers.deleteNote )

module.exports.NotesRouter = router;