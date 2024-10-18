const mongoose = require("mongoose");

const userschema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username harus diisi"],
            maxLength: 100,
        },
        email: {
            type: String,
            required: [true, "email harus diisi"],
            unique: true, // Pastikan email unik
            lowercase: true, // Simpan email dalam huruf kecil
            match: [
                // Regex untuk validasi format email
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Email tidak valid",
            ],
        },
        password: {
            type: String,
            required: [true, "password harus diisi"],
        },
        role: {
            type: String,
            enum: ["admin", "kasir", "manager"],
            default: "admin",
        },
    },
    {
        timestamps: true,
    }
);

//Nama modelnya user
const User = mongoose.model("User", userschema);
module.exports = User;
