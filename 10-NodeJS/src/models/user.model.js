import mongoose from "mongoose";

// el schema tiene los contratos de qué es un usuario
// aca declaras la tabla como era en phpMyAdmin, 
// todo lo que le configurabamos a las columnas que queriamos que tenga 
// podes pasarle objetos a las propiedades con todas las config de la tabla.
const userSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        created_at: {
            type: Date, 
            default: Date.now
        },
        modified_at: {
            type: Date, 
            default: Date.now
        },
        active: {
            type: Boolean,
            default: true
        }
        

    }
)