const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TareaSchema = new Schema (
    {

        name: {
            type: String,
            Required: "Se requiere el label del Task"
        },
        Created_date:{ /// fecha de creacion
            type: Date,
            default: Date.now // fecha actual
        },
        status: {  /// estado actual de la tarea
            type: [{ /// se usan los [] porque va a recibir un arreglo del estado de la tarea
                type: String,
                enum: ['completada', 'en proceso', 'pendiente']
            }],
            default: ['pendiente']  /// en caso de que no este en alun estado poner pendiente 
        },
        user: { 
            type: Schema.Types.ObjectId, ref:"User",
            Required: "UsuId required" 
        }
    }); // obj schema 

    module.exports =  mongoose.model('Tasks', TareaSchema); /// se exporta como Tasks el objeto TareaSchema que es el formato que tendran las tareas en la bd
    