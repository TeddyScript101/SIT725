const { cardService } = require('../services');

const cardController = {
    getAllCards: async (req, res) => {
        try {
            const cards = await cardService.getAllCards();
            res.status(200).json({ data: cards });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

module.exports = cardController;
