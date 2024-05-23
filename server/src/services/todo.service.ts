import { Todo } from "../interfaces/todo.interface";
import TodoModel from "../models/todo.model";

const getAll = async (userId:string) => {
    try {
        return await TodoModel.find({ userId });
    } catch (err: any) {
        throw new Error(`${err.message}`);
    }
}

const getById = async (todoId:string, userId:string) => {
    try {
        const t = await TodoModel.findOne({ _id:todoId, userId});

        if (!t) {
            throw new Error(`No se encontró la tarea.`);
        }

        return t;
    } catch (err: any) {
        throw new Error(`${err.message}`);
    }
}

const registerTodo = async (todo:Todo) => {
    try {
        return await TodoModel.create(todo);
    } catch (err: any) {
        throw new Error(`${err.message}`);
    }
}

const modifyTodo = async (todo:Todo) => {
    const { _id, userId, title, description, date, status } = todo;
    try {
        const updatedTodo = await TodoModel.findOneAndUpdate(
            { _id, userId },
            { title, description, date, status },
            { new: true }
        );

        if (!updatedTodo) {
            throw new Error('Tarea no encontrada o no pertenece al usuario');
        }

        return updatedTodo;
    } catch (err: any) {
        throw new Error(`${err.message}`);
    }
}

const eraseTodo = async (todoId:string,userId:string) => {
    try {
        const deletedTodo = await TodoModel.findOneAndDelete({ _id: todoId, userId });

        if (!deletedTodo) {
            throw new Error('Tarea no encontrada o no pertenece al usuario');
        }

        return deletedTodo;
    } catch (err: any) {
        throw new Error(`${err.message}`);
    }
}

export { getAll, getById, registerTodo, modifyTodo, eraseTodo };