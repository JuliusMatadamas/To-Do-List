import { model, Schema } from "mongoose";
import { Todo } from "../interfaces/todo.interface";

const isValidDate = (date: string) => {
    return !isNaN(Date.parse(date));
};

const TodoSchema = new Schema<Todo>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'El título debe tener al menos 2 caracteres'],
        maxlength: [50, 'El título no puede tener más de 50 caracteres']
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'La descripción debe tener al menos 2 caracteres']
    },
    date: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: isValidDate,
            message: 'La fecha debe ser válida'
        }
    },
    status: {
        type: String,
        enum: ["Incompleta", "Atrasada", "Completada"],
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false
});

const TodoModel = model('todos', TodoSchema);
export default TodoModel;
