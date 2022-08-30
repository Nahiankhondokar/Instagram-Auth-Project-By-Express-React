import jwt from 'jsonwebtoken';


// create token
export const CreateToken = (data, expire = '7d') => {

    return jwt.sign({ data }, process.env.JWT_SECRET, {
                expiresIn : expire
            });

}