import { Request, Response, NextFunction } from "express";

const ErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const expectedErrosMessage = [
        "Wrong Password",
        "Unable to find user with that email address",
        "User account is not verified",
        "Email already exist",
        "Can't register , try again",
        "User not found",
        "Invalid OTP",
    ];

    const errStatus = err.statusCode || 500;
    let errMsg = err.message || "Something went wrong";
    expectedErrosMessage.includes(errMsg) ? errMsg = err.message : errMsg = "Something went wrong";

    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
};

export default ErrorHandler;
