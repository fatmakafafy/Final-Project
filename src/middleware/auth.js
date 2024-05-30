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


// import jwt from "jsonwebtoken";

// export const userAuth = (req, res, next) => {
//     const token = req.header('token');
//     jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
//         if (err) {
//             res.json({ message: "error in token or token not provided", err });
//         } else {
//             req.userId = decoded.userId;
//             next();
//         }
//     });
// };


import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
    const authHeader = req.header('token');
    if (!authHeader) {
        return res.json({ message: "Token not provided" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.json({ message: "Token not provided" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.json({ message: "Error in token", err });
        }
        req.userId = decoded.userId;
        next();
    });
};

