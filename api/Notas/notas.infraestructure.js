const sendRes = require('../assets/send.res');
const NoteModel = require('./notas.model');
const isValidMongoId = require("mongodb").ObjectId

const getAllNotes = async (req, res) => {

  try {

    const notes = await NoteModel.find();

    return sendRes(res, 200, true, 'crud_mess_0', notes );

  } catch (error) { return sendRes(res, 500, false, 'mess_0', error.message ); }

}

const getNoteByID = async(req, res) => {

  try {
    
    const note = await NoteModel.findOne(
      ( isValidMongoId.isValid( req.params.id ) )
      ? { _id: req.params.id }
      : { title: req.params.id }
    );

    if( !note ){ return sendRes(res, 500, false, 'crud_mess_7', '' ); }
      
    return sendRes(res, 200, true, 'crud_mess_0', note );

  } catch (error) { return sendRes(res, 500, false, 'mess_0', error.message ); }

}

const saveNote = async (req, res) => {

  try {

    let { title, description } = req.body;

    const existingNote = await NoteModel.findOne({
      title: title,
    });

    if ( existingNote ) {
      return sendRes(res, 500, false, 'crud_mess_8', '' );
    }

    const note = new NoteModel({
      title: title,
      description: description,
    });

    await note.save();

    return sendRes(res, 200, true, 'crud_mess_1', note._id );

  } catch (error) { return sendRes(res, 500, false, 'mess_0', error.message ); }

}

const editNote = async (req, res) => {

  try {

    let { title, description } = req.body;
    const existingNote = await NoteModel.findOne({ _id: req.params.id });
    
    if ( !existingNote ) { return sendRes(res, 500, false, 'crud_mess_7', '' ); }

    const updateNote = {
      title: title ?? existingNote.title,
      description: description ?? existingNote.description,
    }

    NoteModel.updateOne( existingNote , { $set: updateNote })
      .then(() => { return sendRes(res, 200, true, 'crud_mess_3', '' ); })
      .catch((err) => { return sendRes(res, 500, false, 'crud_mess_4', err ); });

  } catch (error) { return sendRes(res, 500, false, 'mess_0', error.message ); }

}

const deleteNote = async (req, res) => {

  try {

    const existingNote = await NoteModel.findOne({ _id: req.params.id });

    if ( !existingNote ) { return sendRes(res, 500, false, 'crud_mess_7', '' ); } 

    NoteModel.deleteOne( existingNote )
      .then(() => { return sendRes(res, 200, true, 'crud_mess_5', '' ); })
      .catch((err) => { return sendRes(res, 500, false, 'crud_mess_6', err ); });

  } catch (error) { return sendRes(res, 500, false, 'mess_0', error.message ); }
}

module.exports = {
  getAllNotes,
  getNoteByID,
  saveNote,
  editNote,
  deleteNote,
}