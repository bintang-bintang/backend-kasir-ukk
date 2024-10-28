const { User } = require("../models/models");
const bcrypt = require("bcrypt");
// const dotenv = require('dotenv');
// dotenv.config();

//tambah user
exports.addUser = async (req, res) => {
    try {
        const { username, password, role, email } = req.body;

        const cariEmail = await User.findOne({ email: email });

        if (cariEmail) {
            return res.status(500).json({ message: "email sudah terdaftar" });
        }

        //================== Hashing password dengan bcrypt ==================

        //Enkripsi password dengan bcrypt + salt(di .env)
        const passwordAman = await bcrypt.hash(
            password,
            parseInt(process.env.SALT_ROUNDS)
        );

        //================== Hashing password dengan bcrypt ==================
        const userBaru = await User.create({
            username,
            password: passwordAman,
            email: email,
            role,
        });

        res.status(201).json(userBaru);
    } catch (error) {
        res.json({ message: error.message });
    }
};

//get semua user
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get user tertentu
exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//edit data user
exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        const updatedUser = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete user berdasarkan id
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await User.findByIdAndDelete(id);
        res.status(201).json({
            message: "User Deleted",
            data: deleteUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
