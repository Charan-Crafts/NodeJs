const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT_KEY);
    return decoded; // must return decoded payload
}

const authMiddleware = async (req, res, next) => {
    try {
        const cookieHeader = req.headers.cookie;
        if (!cookieHeader) return res.status(401).json({ message: "No cookies found" });

        // Parse cookies
        const cookies = cookieHeader.split("; ").reduce((acc, cookie) => {
            const [key, value] = cookie.split("=");
            acc[key] = value;
            return acc;
        }, {});

        const token = cookies.accessToken;
        if (!token) return res.status(401).json({ message: "Access token missing" });

        // Verify token
        const decoded = verifyToken(token);
        req.user = decoded; // attach user info to request object

        next(); // continue to next middleware/route
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = {
    authMiddleware
};
