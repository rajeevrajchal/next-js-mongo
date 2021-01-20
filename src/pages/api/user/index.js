import {dbConnect} from "../../../../util/dbConnect";
import User from "../../../model/user";
import {hashPassword} from "../helper/authHelper";

dbConnect();

export default async (req, res) => {
    const {method} = req;
    switch (method) {
        case "GET":
            try {
                const user = await User.find({});
                res.status(200).json({
                    success: true,
                    data: user
                })
            } catch (e) {
                res.status(400).json({
                    success: false,
                })
            }
            break
        case "POST":
            try {
                const userData = {
                    email: req.body.email,
                    user_name: req.body.user_name,
                    password: await hashPassword(req.body.password)
                }
                const user = await User.create(
                    userData
                );
                res.status(200).json({
                    success: true,
                    data: user
                })
            } catch (e) {
                res.status(400).json({
                    success: false,
                })
            }
            break
        default:
            res.status(400).json({
                success: false,
            })
            break

    }
}
