const express = require('express');
const cors = require( 'cors' );

const api = require( '../routes/index.routes' );

const { dbConnection } = require( '../database/config' );

class Server{

  constructor(){ 
    
    this.app = express();

    // Conectar la base de datos
    this.conectDB();

    // Middlewares
    this.middlewares();

    this.routes();

  }

  listen() { 
  this.app.listen(
    process.env.PORT, () => 
      { console.log('Servidor corriendo en el puerto', process.env.PORT); }
    );
  }
 
  async conectDB(){ await dbConnection(); }

  middlewares(){

    this.app.use( cors() );

    //Lectura y parseo a formato JSON del body
    this.app.use( express.json() );

  }

  routes(){ this.app.use( process.env.ROUTES_PREFIX , api ); }

}

module.exports = Server;