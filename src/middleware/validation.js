

// export const validation = (schema) => {
//     return (req,res, next) => {
//         let { error } = schema.validate(req.body, { abortEarly: false })
//         console.log(error);
//         if (!error) { 
//             next()
//         } else {
//             res.json(error.details)
//         }
//     }
// }


export const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
        } else {
            next();
        }
    };
};
