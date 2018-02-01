
class InvalidArgumentError extends Error{
    constructor(msg = 'Argument supplied to function is invalid'){
        super(msg);
    }
}

module.exports = {
    InvalidArgumentError
};