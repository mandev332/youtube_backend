const registerValidator = (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username) throw new Error("username is required!");
        if (!password) throw new Error("password is required!");

        if (
            typeof username !== "string" ||
            username.length < 1 ||
            username.length > 20
        ) {
            throw new Error("Invalid username!");
        }

        if (
            password.length < 4 ||
            password.length > 15 ||
            !/[A-Za-z]/.test(password) ||
            !/[@!#$^&*._%+-]/.test(password) ||
            !/[0-9]/.test(password)
        ) {
            throw new Error(
                "Invalid password! You must input in symbol, letter and number"
            );
        }

        return next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginValidator = (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username) throw new Error("username is required!");
        if (!password) throw new Error("password is required!");

        return next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    registerValidator,
    loginValidator,
};
