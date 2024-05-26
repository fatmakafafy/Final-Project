// import jwt from "jsonwebtoken"

// export const userAuth = (req, res, next) => {
//     const  token = req.header('token')
//     jwt.verify(token,process.env.JWT_KEY, async function (err, decoded) {
//         if (err) {
//             res.json({ meesage: "error in token or token not provided", err })
//         } else {
//             req.userId = decoded.userId
//             next()
//         }
//     });
// }


import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
    const token = req.header('token');
    console.log('Token:', token); // Debug: Check if token is received
    console.log('JWT_KEY:', process.env.JWT_KEY); // Debug: Check if JWT_KEY is loaded

    if (!process.env.JWT_KEY) {
        return res.status(500).json({ message: 'JWT_KEY is not defined in environment variables' });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.json({ message: "error in token or token not provided", err });
        } else {
            req.userId = decoded.userId;
            next();
        }
    });
};