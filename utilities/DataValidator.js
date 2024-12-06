function validateRequest(expectedSchema) {
    return (req, res, next) => {
        const body = req.body;

        for (const key in expectedSchema) {
            const expectedType = expectedSchema[key];
            
            // Validar si falta un campo
            if (!(key in body)) {
                return res.status(400).json({ error: `Hay un campo faltante: ${key}` });
            }

            // Validar el tipo del campo
            if (typeof body[key] !== expectedType) {
                return res.status(400).json({
                    error: `Tipo inválido de dato. ${key}. Se esperaba de tipo ${expectedType}, se obtuvo ${typeof body[key]}`
                });
            }
        }

        // Si todo está bien, continúa al lo que sigue
        next();
    };
}

module.exports = {
    validateRequest
}