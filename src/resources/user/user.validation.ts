import * as Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const schema = Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(3).required(),
});

const validateBody = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
    next();
};

export default validateBody;
