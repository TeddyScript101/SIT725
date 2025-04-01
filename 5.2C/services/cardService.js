const Card = require('../models/card');

const cardService = {
    getAllCards: async () => {
        try {
            return await Card.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = cardService;
