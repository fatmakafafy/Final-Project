import { userModel } from "../../../database/models/user.model.js"
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken.js";



export const signup = async (req, res) => {
    const { name, email, password } = req.body
        let user = await userModel.findOne({ email })
        console.log(email)
        if (user) {
            res.json({ message: "Email is already in use" })
        } else {
            bcrypt.hash(password,Number(process.env.ROUND), async function (err, hash) {
                // Store hash in your password DB.
                // console.log(password)
                await userModel.insertMany({ name, email, password: hash })
                // console.log(hash)
                res.json({ message: "Success" })
            });
        }
}


export const signIn = async (req, res) => {
    const { email, password } = req.body
    
        let user = await userModel.findOne({ email })
        if (user) {
            //Check password
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                let token = generateToken({ name: user.name, userId: user._id, role: user.role })
                res.json({ message: "LogIn", token })
            } else {
                res.json({ message: 'Wrong password' })
            }
        } else {
            res.json({ message: 'Wrong email or password' })
        }
    
}

// export const signIn = async (req, res) => {
//     const { email, password } = req.body;
    
//     try {
//         let user = await userModel.findOne({ email });
//         if (user) {
//             // Check if user object has password field
//             if (user.password) {
//                 const match = await bcrypt.compare(password, user.password);
//                 if (match) {
//                     let token = generateToken({ name: user.name, userId: user._id, role: user.role });
//                     res.json({ message: "LogIn", token });
//                 } else {
//                     res.json({ message: 'Wrong password' });
//                 }
//             } else {
//                 res.json({ message: 'User password not found' });
//             }
//         } else {
//             res.json({ message: 'Wrong email or password' });
//         }
//     } catch (error) {
//         console.error('Error during sign-in:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

