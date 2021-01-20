import {comparePassword, generateToken, searchUser} from "../helper/authHelper";

export default async (req, res) => {
    const {method} = req
    switch (method) {
        case "POST":
            try {
                if (!req.body) {
                    res.status(400).json({
                        success: false,
                        message: "Req body is empty"
                    })
                }
                const {
                    email, password
                } = req.body
                if (!email || !password) {
                    res.status(400).json({
                        success: false,
                        message: "Req body is empty"
                    })
                }
                const userExist = await searchUser(email)
                if (!userExist) {
                    res.status(400).json({
                        success: false,
                        message: "Credentails Incorrect"
                    })
                }
                const isMatch = await comparePassword(password, userExist.password)
                if (!isMatch) {
                    res.status(400).json({
                        success: false,
                        message: "Credentails Incorrect"
                    })
                }
                const token = await generateToken(userExist)
                if (!token) {
                    res.status(400).json({
                        success: false,
                        message: "Internal Server Error"
                    })
                }
                res.status(200).json({
                    success: true,
                    user: {
                        user_name: userExist.user_name,
                        email: userExist.email,
                        id: userExist.id
                    },
                    token: 'Bearer ' + token
                })
            } catch (e) {
                res.status(400).json({
                    success: false,
                })
            }
            break;
        default:
    }
}
