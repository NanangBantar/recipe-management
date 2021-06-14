const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const resepSchema = new mongoose.Schema({
    kategori: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "kategori"
    },
    makanan:{
        type: String,
        required: true,
        unique:true
    },
    bahan: [
        {
           id_bahan:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "bahan"
           },
           jml_bahan:{
               type:String
           }
        }
    ],
    status:{
        type: String,
        default:"Not"
    },
    date: {
        type: Date,
        default: Date.now
    },

});

resepSchema.plugin(mongoosePaginate);
module.exports = Resep = mongoose.model('resep', resepSchema);