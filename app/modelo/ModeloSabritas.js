const mongoose = require('mongoose');

const SabritasSchema = new mongoose.Schema({
    codigo:{
        type: String,
        required:true,
        unique: true
    },
    nombre:{
        type: String,
        required:true
    },
    gramos:{
        type: Number,
        required:true
    },
    precio:{
        type: Number,
        required:true
    },
    fecharegistro:{
        type: Date,
        default:Date.now
    }
})

const Sabritas = mongoose.model('Sabritas', SabritasSchema);

module.exports = Sabritas;