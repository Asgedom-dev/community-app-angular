const jwtManager = require('../jwt/JwtManager');

// ! Middleware
class userMiddleware {
    checkToken(req, res, next) {
        if (req.url === '/login' || req.url === '/signup') {
            next();
            return;
        }
        const token = req.headers.authorization;
        if (!token) {
            
            return res.status(401).json({ status: 'authorization error' });
            
        } else {
            const data = jwtManager.verify(token);
            req._id = data._id;
            req.fullname = data.fullname
            req.email=data.email
            req.city=data.city
            req.address=data.address
            req.state=data.state
            req.phonenumber=data.phonenumber
            req.zip=data.zip
            
            // console.log(data);
            
            if (!data) {
                return res.json({ status: 'authhorization error' });
            }
            

            next();
        }
    }
}

module.exports = new userMiddleware();