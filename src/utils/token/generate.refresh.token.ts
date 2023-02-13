import jwt from "jsonwebtoken";

interface User {
    _id: string;
    email: string;
}

function refreshToken(user: User): string {
    const refresh_token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.REFRESH_SECRET || "",
        {
            expiresIn: "5d",
        }
    );
    return refresh_token;
}

export default refreshToken;
