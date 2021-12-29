const jwt = require('jsonwebtoken');
secret = 'asgedom secret'
class JwtManager{

        // ! JWT generate
        generate(data){ 
            const token =jwt.sign(data,secret);
            return token;
        }
        // ! token verification
        verify(token){ 
            const data=jwt.verify(token,secret);
            return data;
        }
}

module.exports = new JwtManager();