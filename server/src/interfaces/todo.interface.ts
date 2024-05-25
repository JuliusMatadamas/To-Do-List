import { Document, Types } from "mongoose";

export interface Todo extends Document {
    userId: Types.ObjectId;
    title: string;
    description: string;
    status: "Incompleta" | "Atrasada" | "Completada";
}
