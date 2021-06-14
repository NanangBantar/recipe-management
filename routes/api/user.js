const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const User = require("../../model/User");

router.post("/", [
    check("email", "Please enter a valid Email").isEmail(),
    check("password", "Please enter password with ").isLength({
        min: 6
    })
], async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: [{ msg: "Invalid user credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: [{ msg: "Invalid user credentials" }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecret"),
            {
                expiresIn: 360000
            }, (err, token) => {
                if(err) throw err;
                res.json({ token });
            });
    } catch (error) {
        console.log(error.message);
        res.status(400).send("Server Error");

    }
});

module.exports = router;