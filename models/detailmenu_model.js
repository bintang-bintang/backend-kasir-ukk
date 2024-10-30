const mongoose = require("mongoose");

const detailmenuschema = mongoose.Schema(
    {
        id_transaksi: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaksi",
            required: true,
        },
        order_menu: [
            {
                id_menu: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Menu",
                    require: true,
                },
                kuantitas: {
                    type: Number,
                    require: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

//Nama modelnya detailmenu
const Detailmenu = mongoose.model("Detailmenu", detailmenuschema);
module.exports = Detailmenu;
