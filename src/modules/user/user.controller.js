// import { userModel } from "../../../database/models/user.model.js"
// import bcrypt from "bcrypt";
// import { generateToken } from "../../utils/generateToken.js";



// export const signup = async (req, res) => {
//     const { name, email, password } = req.body
//         let user = await userModel.findOne({ email })
//         console.log(email)
//         if (user) {
//             res.json({ message: "Email is already in use" })
//         } else {
//             bcrypt.hash(password,Number(process.env.ROUND), async function (err, hash) {
//                 // Store hash in your password DB.
//                 // console.log(password)
//                 await userModel.insertMany({ name, email, password: hash })
//                 // console.log(hash)
//                 res.json({ message: "Success" })
//             });
//         }
// }


// export const signIn = async (req, res) => {
//     const { email, password } = req.body
    
//         let user = await userModel.findOne({ email })
//         if (user) {
//             //Check password
//             const match = await bcrypt.compare(password, user.password);
//             if (match) {
//                 let token = generateToken({ name: user.name, userId: user._id, role: user.role })
//                 res.json({ message: "LogIn", token })
//             } else {
//                 res.json({ message: 'Wrong password' })
//             }
//         } else {
//             res.json({ message: 'Wrong email or password' })
//         }
    
// }



import { userModel } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken.js";

//signup Api
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        res.json({ message: "Email is already in use" });
    } else {
        bcrypt.hash(password, Number(process.env.ROUND), async function (err, hash) {
            await userModel.insertMany({ name, email, password: hash });
            res.json({ message: "Success" });
        });
    }
};

//signIn Api
export const signIn = async (req, res) => {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            let token = generateToken({ name: user.name, userId: user._id, role: user.role });
            res.json({ message: "LogIn", token });
        } else {
            res.json({ message: 'Wrong password' });
        }
    } else {
        res.json({ message: 'Wrong email or password' });
    }
};


// Display user information
export const getUserInfo = async (req, res) => {
    let users = await userModel.find()
    res.json({ message: "Success", users })
}


// update user information

// export const updateUserInfo = async (req, res) => {
//     const { name,email, password } = req.body
//     let user = await userModel.findOne({ email },{name, password }, { new: true });
//     if (user) {
//         res.json({ message: "Success", user })
//     } else {
//         res.json({ message: "not found" })
//     }
// }

// update user information

// export const updateUserInfo = async (req, res) => {
//     const { name, email, password , _id } = req.body
//     bcrypt.hash(password, Number(process.env.ROUND), async function (err, hash) {
//         let user = await userModel.findOneAndUpdate({ email }, { name, password: hash }, { new: true });
//         res.json({ message: "Success" });
//         if (user) {
//             res.json({ message: "Success", user })
//         } else {
//             res.json({ message: "not found" })
//         }
//     });
// }

// update user information
export const updateUserInfo = async (req, res) => {
    const { name, email, password, _id } = req.body;

    // Hash the new password if provided
    if (password) {
        bcrypt.hash(password, Number(process.env.ROUND), async function (err, hash) {
            if (err) {
                return res.json({ message: "Error hashing password", err });
            }
            // Update user information with the hashed password
            let user = await userModel.findByIdAndUpdate(_id, { name, email, password: hash }, { new: true });
            if (user) {
                res.json({ message: "Success", user });
            } else {
                res.json({ message: "User not found" });
            }
        });
    } else {
        // Update user information without changing the password
        let user = await userModel.findByIdAndUpdate(_id, { name, email }, { new: true });
        if (user) {
            res.json({ message: "Success", user });
        } else {
            res.json({ message: "User not found" });
        }
    }
};


