// import jwt from "jsonwebtoken"

// export const generateToken=(payLoad)=>{
//     let token = jwt.sign(payLoad,process.env.JWT_KEY)
//     return token
// }


import jwt from 'jsonwebtoken';

console.log('JWT_KEY:', process.env.JWT_KEY); // Debug line to ensure JWT_KEY is being read

export const generateToken = (payload) => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is not defined');
    }
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '7d' });
};

