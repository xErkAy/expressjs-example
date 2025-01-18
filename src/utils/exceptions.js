export class CustomErrorMessage extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'CustomErrorMessage';
        this.statusCode = code ?? 400;
    }
}

export class AuthenticationErrorMessage extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationErrorMessage';
        this.statusCode = 401;
    }
}