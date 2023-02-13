import mongoose, { Schema } from "mongoose";
import { UserInterface } from '../../utils/interface/user.interface'



const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
        required: false,
        default: ''
    },
    otp: {
        type: Number,
        required: false,
        default: '',
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: false
    },

},
    { timestamps: true }
);

export default mongoose.model<UserInterface>("User", UserSchema);
