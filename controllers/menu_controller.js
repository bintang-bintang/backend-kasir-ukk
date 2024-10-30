const fs = require("fs");
const path = require("path");

const { Menu } = require("../models/models");
const upload = require("../utils/upload_image").single("gambar_menu");

/*
1. Create menu
2. Read menu
3. Update menu
4. Delete menu
*/

exports.nota = async (req, res) => {
    try {
        let htmlResponse = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Coba HTML</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, quo!</p>
</body>
</html>
        `;

        res.send(htmlResponse);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

exports.createMenu = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    status: "fail",
                    message: err.message,
                });
            }

            const { nama_menu, jenis_menu, harga_menu, deskripsi_menu } =
                req.body;
            const gambar_menu = req.file ? req.file.filename : null;

            if (!nama_menu || !jenis_menu || !harga_menu || !deskripsi_menu) {
                return res.status(400).json({
                    status: "fail",
                    message: "All fields are required",
                });
            }

            const newMenu = await Menu.create({
                nama_menu,
                jenis_menu,
                harga_menu,
                deskripsi_menu,
                gambar_menu,
            });

            res.status(201).json({
                status: "success",
                data: {
                    menu: newMenu,
                },
            });
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
exports.getMenus = async (req, res) => {
    try {
        const menus = await Menu.find();

        res.status(200).json({
            status: "success",
            data: menus,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
exports.getMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({
                status: "fail",
                message: "Menu not found",
            });
        }

        res.status(201).json({
            status: "success",
            data: menu,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.updMenu = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    status: "fail",
                    message: err.message,
                });
            }
            const { id } = req.params;
            const menu = await Menu.findById(id);

            if (!menu) {
                return res.status(404).json({
                    status: "fail",
                    message: "Menu not found",
                });
            }

            const { nama_menu, jenis_menu, harga_menu, deskripsi_menu } =
                req.body;
            const gambar_menu = req.file ? req.file.filename : menu.gambar_menu;
            const dataMenu = {
                nama_menu,
                jenis_menu,
                harga_menu,
                deskripsi_menu,
                gambar_menu,
            };

            // Hanya mencoba menghapus file lama jika file tersebut benar-benar ada
            if (req.file && menu.gambar_menu) {
                const oldFilePath = path.join(
                    __dirname,
                    "../img",
                    menu.gambar_menu
                );
                fs.unlink(oldFilePath, (err) => {
                    if (err) {
                        console.error("Failed to delete image file:", err);
                    }
                });
            }

            await Menu.findByIdAndUpdate(id, dataMenu);

            const updatedMenu = await Menu.findById(id);
            res.status(201).json({
                status: "success",
                data: updatedMenu,
            });
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.delMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({
                status: "fail",
                message: "Menu not found",
            });
        }

        // Delete the image file if it exists
        if (menu.gambar_menu) {
            const filePath = path.join(__dirname, "../img", menu.gambar_menu);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Failed to delete image file:", err);
                }
            });
        }

        // Hapus record menu di database
        const deletedMenu = await Menu.findByIdAndDelete(id);

        res.status(201).json({
            status: "success",
            data: deletedMenu,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
