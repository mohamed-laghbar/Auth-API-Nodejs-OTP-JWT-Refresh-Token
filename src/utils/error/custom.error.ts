class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const createError = (message: string, statusCode: number): CustomError => {
    return new CustomError(message, statusCode);
};


