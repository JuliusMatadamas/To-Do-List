import { Document } from "mongoose";

export interface JwtPayloadInterface extends Document {
    userId: string;
    email: string;
}
