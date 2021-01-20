import {dbConnect} from "../../../../util/dbConnect";
import User from "../../../model/user";
import bcrypt from "bcryptjs"

const jwt = require('jsonwebtoken')

dbConnect();

export const searchUser = (email) => {
    return User.findOne({
        email: email
    })
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 12)
}

export const comparePassword = (password, oldPassword) => {
    return bcrypt.compare(password, oldPassword);
}

export const generateToken = (result) => {
    const secretkey = process.env.SECRET_KEY
    console.log(secretkey)
    const payload = {
        user: {
            id: result.id,
            email: result.email,
            first_name: result.user_name,
        }
    };
    return jwt.sign(
        payload,
        secretkey,
        {
            expiresIn: 3600
        },
    );
}

