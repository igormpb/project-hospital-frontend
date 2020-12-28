import jwt from 'jsonwebtoken';

function decodedJwt(token){
    return jwt.decode(token)
}

export default decodedJwt;