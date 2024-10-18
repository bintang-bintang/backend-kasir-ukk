const { User } = require("../models/models");
const jwt = require(`jsonwebtoken`);
const bcrypt = require("bcrypt");

const authenticate = async (req, res) => {
    try {
        const { password, email } = req.body;

        let dataUser = await User.findOne({ email: email });

        if (!password || !dataUser) {
            return res.status(500).json({ message: "Kesalahan!" });
        }


        // Pengecekan apakah password benar
        const compare = await bcrypt.compare(password, dataUser.password);
        if (!compare) {
            return res.status(500).json({ message: "Password Salah" });
        }

        /** if data user exists */
        if (dataUser) {
            /** set payload for generate token.
             * payload is must be string.
             * dataUser is object, so we must convert to string.
             */
            let payload = JSON.stringify(dataUser);
            /** generate token */
            let token = jwt.sign(payload, process.env.SECRET_CODE);
            /** define res */
            return res.json({
                success: true,
                logged: true,
                message: `Authentication Success`,
                token: token,
                data: dataUser,
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const authorize = (req, res, next) => {
    /** get "Authorization" value from req's header */
    const authHeader = req.headers.authorization;
    /** check nullable header */
    try {
        if (authHeader) {
            /** when using Bearer Token for authorization,
             * we have to split `headers` to get token key.
             * valus of headers = `Bearers tokenKey`
             */
            const token = authHeader.split(" ")[1];
            /** verify token using jwt */
            let verifiedUser = jwt.verify(token, process.env.SECRET_CODE);
            if (!verifiedUser) {
                return res.json({
                    success: false,
                    auth: false,
                    message: `User Unauthorized`,
                });
            }
            console.log(verifiedUser);
            req.user = verifiedUser; // payload

            /** if there is no problem, go on to controller */
            next();
        } else {
            return res.json({
                success: false,
                auth: false,
                message: `User Unauthorized`,
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            auth: false,
            message: error.message,
        });
    }
};

module.exports = { authenticate, authorize };
