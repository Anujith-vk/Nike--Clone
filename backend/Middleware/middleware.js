const jwt = require('jsonwebtoken');

const isauthenticated = async function (req, res, next) {
    const auth = req.headers.authorization;
    try {
        const token = auth.split(" ")[1]; 
        jwt.verify(token, process.env.jwt_key, (error, decoded) => {
            if (error) {
                return res.status(400).json({ message: "Please Login First" });
            }
            req.user = decoded; 
            next();  
        });
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occurred", error: error.message });
    }
};

module.exports = isauthenticated;
