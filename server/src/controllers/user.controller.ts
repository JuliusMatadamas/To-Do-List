import { Request, Response } from "express";
import { findUser, insertUser } from "../services/user.service";

const getUser = async (req:Request, res:Response) => {
    try {
        const resUser = await findUser(req.body);
        res.status(200).json({
            "message":"Usuario verificado.",
            "data":resUser
        })
    } catch (e:any) {
        res.status(500).json({
            "message":e.message,
            "data":null
        });
    }
}

const createUser = async (req:Request, res:Response) => {
    try {
        const resUser = await insertUser(req.body);
        res.status(200).json({
            "message":"Usuario registrado correctamente.",
            "data":resUser
        })
    } catch (e:any) {
        res.status(500).json({
            "message": e.message,
            "data":null
        });
    }
}

const closeUser = (req:Request, res:Response) => {
    try {
        res.send(req.body);
    } catch (e:any) {
        res.status(500).json({
            "message":e.message,
            "data":null
        });
    }
}


export { getUser, createUser, closeUser };