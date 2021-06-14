const mongoose = require("mongoose");

const bahanSchema = new mongoose.Schema({
    bahan: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Bahan = mongoose.model('bahan', bahanSchema);