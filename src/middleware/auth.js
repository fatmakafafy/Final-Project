import jwt from "jsonwebtoken"

export const userAuth = (req, res, next) => {
    const  token = req.header('token')
    jwt.verify(token,process.env.JWT_KEY, async function (err, decoded) {
        if (err) {
            res.json({ meesage: "error in token or token not provided", err })
        } else {
            req.userId = decoded.userId
            next()
        }
    });
}
