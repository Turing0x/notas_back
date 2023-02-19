const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({

  title: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    required: false,
  }

});

module.exports = mongoose.model( 'notes', NotesSchema )