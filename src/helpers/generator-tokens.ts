import jwt from 'jsonwebtoken';

let generateToken = (
    properties: Object,
    key: string,
    expiration: string | number,
    delay: string | number = 0
): string => {
    const token = jwt.sign(properties, key, {
        expiresIn: expiration,
        notBefore: delay,
    });
    return token;
}

export default generateToken;