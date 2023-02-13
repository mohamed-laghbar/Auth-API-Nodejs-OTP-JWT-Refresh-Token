import { Document } from "mongoose";

export interface UserInterface extends Document {
    name: string;
    email: string;
    password: string;
    refresh_token: string;
    otp: number;
    isVerified: boolean;
}


