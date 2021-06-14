const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    //get token from header 
    const token = req.header("x-auth-token");

    if(!token){
        return res.status(400).json({ msg: "No token, authorization denied" });
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(400).json({ msg:"Token is not valid" });
    }
}