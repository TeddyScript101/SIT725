const { Card } = require('../models');

const cardService = {
    getAllCards: async () => {
        try {
            return await Card.find();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    createCard: async (cardData) => {
        try {
            const newCard = new Card(cardData);
            return await newCard.save();

        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = cardService;
