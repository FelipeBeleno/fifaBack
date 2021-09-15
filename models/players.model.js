const { Schema, model } = require('mongoose');



const usuarioSchema = Schema({
    name: {
        type: String,
        require: [true, 'El nombre es requerido']
    },
    position: {
        type: String,
        require: [true, 'La posicion es requerida']
    },
    nation: {
        type: String,
        require: [true, 'La nacion es requerida']
    },
    team: {
        type: String
    }

});




module.exports = model( 'Player', usuarioSchema)



//{name: “Cristiano Ronaldo”, “position”: “ST”, “nation” : “Portugal” , “team”: “Juventus” }