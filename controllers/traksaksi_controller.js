const { User, Meja, Transaksi, Detailmenu } = require("../models/models");
const PDFDocument = require("pdfkit");
const fs = require("fs");

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
exports.PDFdetailTransaksi = async (req, res) => {
    try {
        const { id } = req.params;
        const transaksi = await Transaksi.findById(id)
            .populate("id_user")
            .populate("id_meja");

        if (!transaksi) {
            return res.status(404).json({ message: "Transaksi not found" });
        }

        const detailmenu = await Detailmenu.findOne({
            id_transaksi: id,
        }).populate("order_menu.id_menu");

        const doc = new PDFDocument();
        let filename = `transaksi_${id}.pdf`;
        filename = encodeURIComponent(filename);
        res.setHeader(
            "Content-disposition",
            `attachment; filename="${filename}"`
        );
        res.setHeader("Content-type", "application/pdf");

        doc.pipe(res);

        doc.fontSize(25).text("Wikusama Caffee", 100, 20);
        doc.fontSize(25).text(`Transaksi ID:`, 100, 65);
        doc.fontSize(25).text(`${transaksi._id}`, 100, 90);
        doc.fontSize(20).text(
            `Tanggal: ${new Date(transaksi.createdAt).toLocaleDateString(
                "id-ID"
            )}`,
            100,
            120
        );
        doc.fontSize(20).text(`Kasir: ${transaksi.id_user.username}`, 100, 160);
        doc.fontSize(20).text(
            `Nama Pelanggan: ${transaksi.nama_pelanggan}`,
            100,
            200
        );
        doc.fontSize(20).text(`Meja: ${transaksi.id_meja.nama_meja}`, 100, 240);
        doc.fontSize(20).text(
            `Status Pembayaran: ${transaksi.status_transaksi}`,
            100,
            280
        );

        doc.fontSize(20).text("Order Menu:", 100, 320);
        let yPosition = 360;
        let total = 0;
        detailmenu.order_menu.forEach((item, index) => {
            const itemTotal = item.kuantitas * item.id_menu.harga_menu;
            total += itemTotal;
            doc.fontSize(15).text(
                `${index + 1}. ${item.id_menu.nama_menu} - ${
                    item.kuantitas
                } x Rp ${item.id_menu.harga_menu} = Rp ${itemTotal}`,
                100,
                yPosition
            );
            yPosition += 20;
        });

        doc.fontSize(20).text(`Total Harga: Rp ${total}`, 100, yPosition + 20);

        doc.end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
