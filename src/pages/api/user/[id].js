import {dbConnect} from "../../../../util/dbConnect";
import User from "../../../model/user";

dbConnect();

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req;
    console.log(req)
    switch (method) {
        case "GET":
            try {
                const user = await User.findById(id);
                if (!user) {
                    return res.status(400).json({
                        success: false,
                    })
                }
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
        case "PUT":
            try {
                const user = await User.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })
                if (!user) {
                    return res.status(400).json({
                        success: false,
                    })
                }
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
        case "DELETE":
            try {
                const deleteNote = await User.deleteOne({_id: id})
                if (!deleteNote) {
                    return res.status(400).json({
                        success: false,
                    })
                }
                res.status(200).json({
                    success: true,
                    message: "User Deleted"
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
