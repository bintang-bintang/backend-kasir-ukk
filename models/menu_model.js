const mongoose = require("mongoose");

const menuschema = mongoose.Schema(
    {
        nama_menu: {
            type: String,
            required: [true, "Nama menu harus diisi"],
            maxLength: 100,
        },
        jenis_menu: {
            type: String,
            enum: ["makanan", "minuman"],
            required: [true, "Jenis menu harus diisi"],
            maxLength: 100,
        },
        harga_menu: {
            type: Number,
            required: [true, "Harga menu harus diisi"],
        },
        deskripsi_menu: {
            type: String,
            required: [true, "Deskripsi menu harus diisi"],
            maxLength: 200,
        },
        gambar_menu: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

//Nama modelnya menu
const Menu = mongoose.model("Menu", menuschema);
module.exports = Menu;
