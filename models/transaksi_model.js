const mongoose = require("mongoose");

const transaksischema = mongoose.Schema(
    {
        nama_pelanggan: {
            type: String,
            required: [true, "Nama pelanggan harus diisi"],
            maxLength: 100,
        },
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        id_meja: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meja",
            required: true,
        },
        status_transaksi: {
            type: String,
            enum: ["lunas", "belum_bayar"],
            default: "belum_bayar",
        },
    },
    {
        timestamps: true,
    }
);

//Nama modelnya transaksi
const Transaksi = mongoose.model("Transaksi", transaksischema);
module.exports = Transaksi;
