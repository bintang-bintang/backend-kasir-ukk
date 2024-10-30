/** @type {import('mongoose').Model} */
const { Meja } = require("../models/models");

/*
1. Create meja
2. Read meja
3. Update meja
4. Delete meja
*/

exports.createMeja = async (req, res) => {
    try {
        const { nama_meja } = req.body;

        const mejaBaru = await Meja.create({
            nama_meja,
        });

        res.status(201).json(mejaBaru);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getMejas = async (req, res) => {
    try {
        const meja = await Meja.find();

        res.status(200).json(meja);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getMeja = async (req, res) => {
    try {
        const meja = await Meja.findById(req.params.id);

        res.status(200).json(meja);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.updMeja = async (req, res) => {
    try {
        const { nama_meja, status_meja } = req.body;

        await Meja.findByIdAndUpdate(req.params.id, {
            nama_meja,
            status_meja,
        });

        const updatedMeja = await Meja.findById(req.params.id);

        res.status(201).json(updatedMeja);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.delMeja = async (req, res) => {
    try {
        const { id } = req.params;
        const meja = await Meja.findById(id);
        if (!meja) {
            return res.status(404).json({ message: "Meja not found" });
        }
        await Meja.findByIdAndDelete(id);

        res.status(200).json({ message: "Meja Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.delMejaAll = async (req, res) => {
    try {
        await Meja.deleteMany();

        res.status(200).json({ message: "Meja Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

