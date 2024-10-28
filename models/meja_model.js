const mongoose = require("mongoose");

const mejaschema = mongoose.Schema(
    {
        nama_meja: {
            type: String,
            required: [true, "Nama meja harus diisi"],
            maxLength: 100,
        },
        status_meja: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

//Nama modelnya meja
const Meja = mongoose.model("Meja", mejaschema);
module.exports = Meja;
