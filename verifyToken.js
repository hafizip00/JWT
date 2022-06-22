const jwt = require('jsonwebtoken');

function verify(req ,res , next){
    const token = req.header("auth-token")
    if (!token) {
        return res.status(401).json("Access Denied")
    }

    try {
        const verified = jwt.verify(token , process.env.TOKEN_SECRET)
        req.user = verified
            next()
    } catch (error) {
        res.status(400).json("Invalid Token")
    }
}

module.exports = verify