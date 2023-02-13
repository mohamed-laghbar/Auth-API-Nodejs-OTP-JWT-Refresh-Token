import * as Joi from '@hapi/joi';
import { Request, Response, NextFunction , RequestHandler } from 'express';

const schema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(3).required(),
});
 

const validateBody = (schema: Joi.ObjectSchema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error } = schema.validate(req.body);
            if (error)
                return res.status(400).json({
                    message: error.message,
                });

            next()
        } catch (error) {
            next(error);
        }

    };
};



export default validateBody;