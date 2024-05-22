import jwt from "jsonwebtoken"

export const generateToken=(payLoad)=>{
    let token = jwt.sign(payLoad,process.env.JWT_KEY)
    return token
}