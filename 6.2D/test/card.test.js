const request = require('supertest');
const { expect } = require('chai');
const app = require('../server'); // adjust path to your Express app
const mongoose = require('mongoose');
const { Card } = require('../models');
const { MongoMemoryServer } = require('mongodb-memory-server');

const tempCard = {
    title: "Test Card",
    description: "Demo description",
    image: "photo",
    link: "About Cat 3"
};


describe('GET /cards API', function () {
    it('should return status 200', async function () {
        const res = await request(app).get('/cards');
        expect(res.status).to.equal(200);
    });

    it('the return array should not be empty', async function () {
        const res = await request(app).get('/cards');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data.length).to.be.greaterThan(0);
    });

    it('each card should have the correct shape', async function () {
        const res = await request(app).get('/cards');
        const card = res.body.data[0];
        expect(card).to.include.all.keys('title', 'image', 'link', 'description');
    });
});



describe('POST /card API (in-memory DB)', function () {
    let mongoServer;

    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();

        await mongoose.disconnect();
        await mongoose.connect(uri);
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('should create a card in memory and not affect real DB', async () => {
        const res = await request(app)
            .post('/cards')
            .send(tempCard);

        expect(res.status).to.equal(201);
        expect(res.body.data.title).to.equal(tempCard.title);
        expect(res.body.data.description).to.equal(tempCard.description);
        expect(res.body.data.image).to.equal(tempCard.image);
        expect(res.body.data.link).to.equal(tempCard.link);
        expect(res.body.data._id).to.exist;
    });
    it('The Temp card is not persist in the real DB', async () => {
        const card = await Card.findOne({ title: tempCard.title });
        expect(card).to.not.be.null;
    });

    it('should return 400 if any required field is missing', async () => {
        const incompleteCard = {
            description: "Missing title field",
            image: "someimage.png",
            link: "MissingTitleLink"
        };

        const res = await request(app)
            .post('/cards')
            .send(incompleteCard);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
    });

});
