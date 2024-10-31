const { User, Meja, Transaksi, Detailmenu } = require("../models/models");

exports.addTransaksi = async (req, res) => {
    try {
        const dataUser = await User.findById(req.body.id_user);
        const dataMeja = await Meja.findById(req.body.id_meja);

        console.log(dataUser);

        if (!dataUser) {
            return res.status(404).send({
                message: "User kasir not found",
            });
        }
        if (dataUser.role != "kasir") {
            return res.status(404).send({
                message: "User not authorized",
            });
        }
        if (!dataMeja) {
            return res.status(404).send({
                message: "Meja not found",
            });
        }
        if (dataMeja.status_meja == false) {
            return res.status(404).send({
                message: "Meja is already booked",
            });
        }

        const data = {
            nama_pelanggan: req.body.nama_pelanggan,
            id_user: dataUser._id,
            id_meja: dataMeja._id,
        };

        const transaksiBaru = await Transaksi.create(data);
        // Update meja ketika menuju transaksi
        await Meja.findByIdAndUpdate(dataMeja._id, { status_meja: false });

        const detailBaru = await Detailmenu.create({
            id_transaksi: transaksiBaru._id,
            order_menu: [],
        });

        res.status(201).send({
            message: "Transaksi terbuat dan juga detail menu",
            data: transaksiBaru,
            detailmenu: detailBaru,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.handleBayarTransaksi = async (req, res) => {
    try {
        const { id } = req.params;
        const dataTransaksi = await Transaksi.findById(id);
        const dataMeja = await Meja.findById(dataTransaksi.id_meja);

        await dataTransaksi.updateOne({ status_transaksi: "lunas" });
        await dataMeja.updateOne({ status_meja: true });

        const updatedTransaksi = await Transaksi.findById(id);

        res.status(200).send({
            message: "Transaksi berhasil dibayar",
            data: updatedTransaksi,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTransaksis = async (req, res) => {
    try {
        const data = await Transaksi.find()
            .populate("id_user")
            .populate("id_meja");
        res.status(200).json({
            message: "success",
            data_length: data.length,
            data: data,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getTransaksi = async (req, res) => {
    try {
        const data = await Transaksi.findById(req.params.id)
            .populate("id_user")
            .populate("id_meja");
        res.status(200).json({
            message: "success",
            data_length: data.length,
            data: data,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAllTransaksi = async (req, res) => {
    try {
        const transaksimenu = await Transaksi.deleteMany({});
        if (!transaksimenu) {
            return res.status(404).send({
                message: "Transaksimenu not found",
            });
        }
        res.status(200).json({
            message: "Success",
            data: transaksimenu,
        });
    } catch (error) {
        res.status(500).json({ message: error, a: "a" });
    }
};
