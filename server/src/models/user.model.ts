import { model, Schema } from "mongoose";
import { User } from "../interfaces/user.interface";
import bcrypt from "bcrypt";

const emailValidator = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
};

const passwordValidator = (password: string) => {
    return password.length >= 5 && password.length <= 10 && !/\s/.test(password);
};

const UserSchema = new Schema<User>({
    email: {
        required: true,
        trim: true,
        type: String,
        unique: true,
        validate: {
            validator: emailValidator,
            message: props => `${props.value} no es una dirección de email válida!`
        }
    },
    password: {
        required: true,
        trim: true,
        type: String,
        validate: {
            validator: passwordValidator,
            message: 'El password debe tener entre 5 y 10 caracteres sin espacios en blanco.'
        }
    }
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.pre<User>('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error: any) {
        next(error);
    }
});

const UserModel = model('users', UserSchema);
export default UserModel;
