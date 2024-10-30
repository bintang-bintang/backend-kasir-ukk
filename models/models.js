/** @type {import('mongoose').Model} */
const User = require('./user_model');
const Meja = require('./meja_model');
const Menu = require('./menu_model');
const Traksaksi = require('./transaksi_model');
const Detailmenu = require('./detailmenu_model');

module.exports = { User, Meja, Menu, Traksaksi, Detailmenu };
