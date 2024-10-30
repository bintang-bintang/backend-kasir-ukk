const { Traksaksi, Menu, Detailmenu } = require("../models/models");

exports.coba = async (req, res) => {
    try {
        const dataTraksaksi = await Traksaksi.findById(req.body.id_transaksi);
        const dataMenu = await Menu.findById(req.body.id_menu);

        if (!dataMenu) {
            return res.status(404).send({
                message: "Menu not found",
            });
        }
        if (!dataTraksaksi) {
            return res.status(404).send({
                message: "Transaksi not found",
            });
        }

        const data = {
            id_transaksi: dataTraksaksi._id,
            id_menu: dataMenu._id,
            harga: dataMenu.harga_menu,
        };

        await Detailmenu.create(data);
        res.status(200).json({
            message: "Data inserted",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

exports.detailFromTransaksi = async (req, res) => {
    try {
        const dataTraksaksi = await Traksaksi.findById(req.body.id_transaksi);

        if (!dataTraksaksi) {
            return res.status(404).send({
                message: "Transaksi not found",
            });
        }

        const data = {
            id_transaksi: dataTraksaksi._id,
            order_menu: [],
        };

        if (req.body.order_menu.length > 0) {
            for (let i = 0; i < req.body.order_menu.length; i++) {
                const getMenu = await Menu.findById(
                    req.body.order_menu[i].id_menu
                );
                if (!getMenu) {
                    return res
                        .status(404)
                        .json({ success: false, message: "Menu Not Found" });
                }
                data.order_menu.push({
                    id_menu: getMenu._id,
                    kuantitas: req.body.order_menu[i].kuantitas,
                });
            }
        }

        const newDetailmenu = await Detailmenu.create(data);

        return res.status(201).json({
            success: true,
            message: "Data inserted",
            data: newDetailmenu,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.editDetailmenu = async (req, res) => {
    try {
        const detailmenu = await Detailmenu.findById(req.params.id);

        if (!detailmenu) {
            return res.status(404).send({
                message: "Detailmenu not found",
            });
        }

        // Menggunakan findByIdAndUpdate untuk menghindari query dua kali
        const updatedDetailMenu = await Detailmenu.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Menggunakan $set untuk mengupdate spesifik fields di dalam detail menu
            { new: true } // Mengembalikan data setelah update
        );

        res.status(200).json({
            message: "Success",
            data: updatedDetailMenu,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllDetailmenu = async (req, res) => {
    try {
        const detailmenu = await Detailmenu.find()
            .populate("id_transaksi")
            .populate("order_menu.id_menu");
        res.status(200).send({
            message: "Success",
            length: detailmenu.length,
            data: detailmenu,
        });
    } catch (error) {
        res.status(500).json({ message: error, a: "a" });
    }
};

exports.getByIdTransaksi = async (req, res) => {
    try {
        const { id } = req.params;
        const detailTransaksi = await Detailmenu.findOne({ id_transaksi: id })
            // .populate("id_transaksi")
            // .populate("order_menu.id_menu");
        res.status(200).send({
            message: "Success",
            length: detailTransaksi.length,
            data: detailTransaksi,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAllDetail = async (req, res) => {
    try {
        const detailmenu = await Detailmenu.deleteMany({});
        if (!detailmenu) {
            return res.status(404).send({
                message: "Detailmenu not found",
            });
        }
        res.status(200).json({
            message: "Success",
            data: detailmenu,
        });
    } catch (error) {
        res.status(500).json({ message: error, a: "a" });
    }
};
