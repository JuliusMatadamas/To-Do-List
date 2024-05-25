import { Request, Response } from "express";
import { getAll, getAllPendings, getAllCompletes, getById, registerTodo, modifyTodo, eraseTodo, eraseTodoCompletes } from "../services/todo.service";

const findAll = async (req:Request, res:Response) => {
    try {
        const resTodo = await getAll(req.body.userId);
        res.status(200).json({
            "message":"Tareas recuperadas.",
            "data":resTodo
        })
    } catch (e:any) {
        res.status(500).json({
            "message":e.message,
            "data":null
        });
    }
}

const findAllPendings = async (req:Request, res:Response) => {
    try {
        const resTodo = await getAllPendings(req.body.userId);
        res.status(200).json({
            "message":"Tareas pendientes recuperadas.",
            "data":resTodo
        })
    } catch (e:any) {
        res.status(500).json({
            "message":e.message,
            "data":null
        });
    }
}

const findAllCompletes = async (req:Request, res:Response) => {
    try {
        const resTodo = await getAllCompletes(req.body.userId);
        res.status(200).json({
            "message":"Tareas completadas recuperadas.",
            "data":resTodo
        })
    } catch (e:any) {
        res.status(500).json({
            "message":e.message,
            "data":null
        });
    }
}


const findById = async (req:Request, res:Response) => {
    const { _id, userId } = req.body;
    try {
        const resTodo = await getById(_id, userId);
        console.log(resTodo);
        res.status(200).json({
            "message":"Tarea recuperada.",
            "data":resTodo
        })
    } catch (e:any) {
        res.status(500).json({
            "message": e.message,
            "data":null
        });
    }
}

const createTodo = async (req:Request, res:Response) => {
    try {
        const resTodo = await registerTodo(req.body);
        res.status(200).json({
            "message":"Tarea registrada correctamente.",
            "data":resTodo
        })
    } catch (e:any) {
        res.status(500).json({
            "message":e.message,
            "data":null
        });
    }
}

const updateTodo = async (req:Request, res:Response) => {
    try {
        const resTodo = await modifyTodo(req.body);
        res.status(200).json({
            "message":"Tarea actualizada correctamente.",
            "data":resTodo
        })
    } catch (e:any) {
        res.status(500).json({
            "message":e.message,
            "data":null
        });
    }
}

const deleteTodo = async (req:Request, res:Response) => {
    const { _id, userId } = req.body;
    try {
        const resTodo = await eraseTodo(_id, userId)
        res.status(200).json({
            "message":"Tarea eliminada correctamente.",
            "data":resTodo
        })
    } catch (e:any) {
        res.status(500).json({
            "message":e.message,
            "data":null
        });
    }
}

const deleteTodoCompletes = async (req:Request, res:Response) => {
    const { _id, userId } = req.body;
    try {
        const resTodo = await eraseTodoCompletes(userId)
        res.status(200).json({
            "message":"Tareas completadas eliminadas correctamente.",
            "data":resTodo
        })
    } catch (e:any) {
        res.status(500).json({
            "message":e.message,
            "data":null
        });
    }
}


export { findAll, findAllPendings, findAllCompletes, findById, createTodo, updateTodo, deleteTodo, deleteTodoCompletes };