const multer = require("multer");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "img");
    },
    filename: function (req, file, cb) {
        const originalName = path.parse(file.originalname).name; // Nama file tanpa ekstensi
        cb(null, `menu_${originalName}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

// File filter to allow only certain file types
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error("Only .jpeg, .jpg, and .png files are allowed!"));
    }
};

// Initialize multer with storage configuration and file filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: fileFilter,
});

module.exports = upload;
