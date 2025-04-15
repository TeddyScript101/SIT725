const mongoose = require('mongoose');
const Cards = require('./models/card');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        insertDummyData()
        console.log('✅ MongoDB Connected...');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};


const insertDummyData = async () => {
    try {
        const cardList = [
            {
                title: "Cat",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdc9lEDq6ESJsmur9k70twoufa4N8YxVclobcQ_wUcyRUEEAq1RmxTn88&s",
                link: "About Cat 2",
                description: "Demo description about Cat 2"
            },
            {
                title: "Cat 2",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdc9lEDq6ESJsmur9k70twoufa4N8YxVclobcQ_wUcyRUEEAq1RmxTn88&s",
                link: "About Cat 2",
                description: "Demo description about Cat 2"
            },
            {
                title: "Cat 3",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdc9lEDq6ESJsmur9k70twoufa4N8YxVclobcQ_wUcyRUEEAq1RmxTn88&s",
                link: "About Cat 3",
                description: "Demo description about Cat 3"
            }
        ];

        for (const card of cardList) {
            await Cards.updateOne(
                { title: card.title },
                { $set: card },
                { upsert: true }
            );
        }

    } catch (error) {
        console.error('❌ MongoDB Upsert Error:', error);
        process.exit(1);
    }
};


module.exports = connectDB;
