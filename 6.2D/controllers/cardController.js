const { cardService } = require('../services');
const Joi = require('joi');

const createCardBodySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    link: Joi.string().required()
});

const cardController = {
    getAllCards: async (req, res) => {
        try {
            const cards = await cardService.getAllCards();
            res.status(200).json({ data: cards });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    createCard: async (req, res) => {
        try {
            const { error } = createCardBodySchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: 'Invalid input', error: error.details[0].message });
            }

            const newCard = await cardService.createCard(req.body);
            res.status(201).json({ message: 'Card created', data: newCard });
        } catch (error) {
            console.log(error.message, 'error')
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

module.exports = cardController;
