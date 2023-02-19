const mongoose = require('mongoose');

const dbConnection = async () => {

  try {

    mongoose.set('strictQuery', true);
        
    mongoose.connect(process.env.MONGO_URL);
    console.log('Base de datos Online');

  } catch (error) {
    console.log(error);
    throw new Error('Error en la base de datos');
  }

}

module.exports = {
  dbConnection
}