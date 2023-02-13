import { createError } from "../../utils/error/custom.error";
import UserService from "./user.service";
import { Router, Request, Response, NextFunction } from "express";
import session, { Session, SessionData } from "express-session";

interface Token {
    acces_token: string;
    refresh_token: string;
}

class UserController {
    private UserService = new UserService();
    private costumSession: any;

    public login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const loginResult = await this.UserService.login(email, password, next);

            if (typeof loginResult === "object" && "acces_token" in loginResult) {
                const { acces_token, refresh_token } = loginResult;
                return res.status(200).json({ acces_token, refresh_token });
            }
        } catch (error) {
            return next(error);
        }
    };

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body;

            const registerResult = await this.UserService.register(
                name,
                email,
                password,
                next
            );
            if (registerResult) {
                this.costumSession = req.session as Session & { email: string };

                this.costumSession.email = email;
                return res.status(201).json({ message: this.costumSession.email });
            }
            next();
        } catch (error) {
            return next(error);
        }
    };

    public verifyAccount = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { otp } = req.body;
            const userEmail = this.costumSession.email;

            const user = await this.UserService.verifyOtp(userEmail, otp, next);
            if (!user) return next(createError("Invalid OTP", 400));

            return res.json({ message: "You account is activated" });
        } catch (error) {
            return next(error);
        }
    };
}

export default UserController;
