const mongoose = require("mongoose");

const kategoriSchema = new mongoose.Schema({
    kategori: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Kategori = mongoose.model('kategori', kategoriSchema);