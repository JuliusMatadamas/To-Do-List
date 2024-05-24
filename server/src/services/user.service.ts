import "dotenv/config";
import UserModel from "../models/user.model";
import { User } from "../interfaces/user.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const privateKey = process.env.PRIVATE_KEY;

const insertUser = async (user:User) => {
    try {
        const userSaved = await UserModel.create(user);
        const token = jwt.sign({userId: userSaved._id, email: userSaved.email}, privateKey!, {expiresIn: '8h'})
        return { "_id": userSaved._id, "email": userSaved.email, "token": token};
    } catch (err:any) {
        throw new Error(`${err.message}`);
    }
}

const findUser = async (user:User) => {
    const { email, password } = user;

    try {
        const userFind = await UserModel.findOne({ email });
        if (!userFind) {
            throw new Error('Usuario no encontrado');
        }

        const passwordMatch = await bcrypt.compare(password, userFind.password);
        if (passwordMatch) {
            const token = jwt.sign({userId: userFind._id, email: userFind.email}, privateKey!, {expiresIn: '8h'});
            return { "_id": userFind._id, "email": userFind.email, "token": token};
        } else {
            throw new Error('Credenciales invalidas');
        }
    } catch (err:any) {
        throw new Error(`${err.message}`);
    }
}

export { insertUser, findUser };