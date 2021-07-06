const jwt = require('jsonwebtoken');
const { jwtSecret } = process.env

exports.authenticateJWT = (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization'); 

    if (!token) {
        return res.status(400).json({
            errorMessage: 'No token. Authorization denied',
        });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        req.user = decoded.user;

        next();
    } catch (err) {
        console.log('jwt error: ', err);
        res.status(401).json({
            errorMessage: 'Invalid token',
        });
    }
};

exports.authenticateDeliveryJWT = (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization'); 

    if (!token) {
        return res.status(400).json({
            errorMessage: 'No token. Authorization denied',
        });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        req.user = decoded.user;

        next();
    } catch (err) {
        console.log('jwt error: ', err);
        res.status(401).json({
            errorMessage: 'Invalid token',
        });
    }
};


